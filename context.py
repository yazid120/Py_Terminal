"""
Shell Context — persistent session state.

Holds all mutable state for the REPL session:
cwd, env vars, aliases, history, variables, config, git info, etc.
"""

from __future__ import annotations

import os
import getpass
import platform
import socket
import subprocess
from dataclasses import dataclass, field
from typing import Any


@dataclass
class ShellContext:
    """Persistent shell state for the entire REPL session."""

    # Filesystem
    cwd: str = field(default_factory=os.getcwd)

    # Identity
    username: str = field(default_factory=getpass.getuser)
    hostname: str = field(default_factory=socket.gethostname)

    # Shell variables (user-defined, e.g. name=Kevin)
    variables: dict[str, str] = field(default_factory=dict)

    # Environment variables (copy of os.environ at startup)
    env_vars: dict[str, str] = field(default_factory=lambda: dict(os.environ))

    # Aliases (e.g. ll -> ls)
    aliases: dict[str, str] = field(default_factory=dict)

    # Command history (list of raw input strings)
    history: list[str] = field(default_factory=list)

    # Prompt template
    prompt_template: str = "{username}@{hostname} {cwd_short} {git_branch}> "

    # Active theme name
    active_theme: str = "default"

    # Git info (refreshed per prompt)
    git_branch: str = ""

    # Running flag
    running: bool = True

    # ---- helpers ----

    @property
    def cwd_short(self) -> str:
        """Return cwd with home dir replaced by ~."""
        home = os.path.expanduser("~")
        if self.cwd.startswith(home):
            return "~" + self.cwd[len(home):].replace("\\", "/")
        return self.cwd.replace("\\", "/")

    def refresh_git_branch(self) -> None:
        """Detect current git branch (if inside a repo)."""
        try:
            result = subprocess.run(
                ["git", "rev-parse", "--abbrev-ref", "HEAD"],
                capture_output=True,
                text=True,
                cwd=self.cwd,
                timeout=2,
            )
            if result.returncode == 0:
                self.git_branch = result.stdout.strip()
            else:
                self.git_branch = ""
        except Exception:
            self.git_branch = ""

    def expand_variables(self, text: str) -> str:
        """Expand $variable references in text."""
        for var_name, var_value in self.variables.items():
            text = text.replace(f"${var_name}", var_value)
        # Also expand env vars
        for var_name, var_value in self.env_vars.items():
            text = text.replace(f"${var_name}", var_value)
        return text

    def build_prompt(self) -> str:
        """Build the prompt string from the template."""
        git_part = f"({self.git_branch}) " if self.git_branch else ""
        return self.prompt_template.format(
            username=self.username,
            hostname=self.hostname,
            cwd_short=self.cwd_short,
            git_branch=git_part,
        )
