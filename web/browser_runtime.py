"""Browser adapter for the existing CLI engine and compatible commands."""

import contextlib
import io
import json
import os
import re
import traceback
from pathlib import Path

from commands import calculator, developer, filesystem, hello, help_cmd
from context import ShellContext
from engine import Command, CommandEngine, CommandNotFoundError
from services.aliases import AliasService
from services.config import ConfigService
from services.history import HistoryService


ANSI_ESCAPE = re.compile(r"\x1b\[[0-?]*[ -/]*[@-~]")
DESKTOP_COMMANDS = (
    "system-info", "cpu", "memory", "disk", "battery", "processes", "env",
    "ping", "dns", "ports", "ip",
)


class BrowserSession:
    def __init__(self) -> None:
        workspace = Path.home() / "playground"
        workspace.mkdir(parents=True, exist_ok=True)
        (workspace / "welcome.txt").write_text(
            "Welcome to Kevin CLI in your browser!\n"
            "These files live in a temporary virtual filesystem.\n",
            encoding="utf-8",
        )
        os.chdir(workspace)
        self.ctx = ShellContext(username="guest", hostname="browser", env_vars={})
        self.engine = CommandEngine()
        self.history = HistoryService()
        self.aliases = AliasService()
        self.aliases.sync_to_context(self.ctx.aliases)
        for module in (calculator, developer, filesystem, hello):
            module.register(self.engine)
        help_cmd.register(self.engine, self.history, self.aliases, ConfigService())
        self.cleared = False
        self.engine.register(Command("clear", "Clear terminal output", "clear", "browser", self._clear))
        self.engine.register(Command("cls", "Clear terminal output", "cls", "browser", self._clear))
        self.engine.register(Command("exit", "End this demo session", "exit", "browser", self._exit))
        self.engine.register(Command("quit", "End this demo session", "quit", "browser", self._exit))

    def _clear(self, ctx: ShellContext, args: list[str]) -> None:
        self.cleared = True

    def _exit(self, ctx: ShellContext, args: list[str]) -> None:
        ctx.running = False
        print("Goodbye! Use Restart session to open a fresh playground.")

    def execute(self, raw_input: str) -> str:
        output = io.StringIO()
        self.cleared = False
        failed = False
        suggestions: list[dict[str, object]] = []
        with contextlib.redirect_stdout(output), contextlib.redirect_stderr(output):
            try:
                if not self.ctx.running:
                    raise RuntimeError("Session ended. Use Restart session.")
                resolved = self.history.resolve_bangs(raw_input.strip())
                if resolved != raw_input.strip():
                    print(f"> {resolved}")
                self.history.add(resolved)
                self.engine.execute(resolved, self.ctx)
            except CommandNotFoundError as error:
                failed = True
                print(f"Command not found: {error.name}")
                names = (
                    [error.name] if error.name in DESKTOP_COMMANDS
                    else self.engine.suggest_commands(error.name, self.ctx, DESKTOP_COMMANDS)
                )
                for name in names:
                    desktop_only = name in DESKTOP_COMMANDS and name not in self.ctx.aliases
                    command = error.corrected_command(name)
                    suggestions.append({"command": command, "available": not desktop_only})
                    if name != error.name:
                        print(f"Did you mean '{name}'?")
                    if desktop_only:
                        print(f"'{name}' is available in the desktop CLI only. Download it to run this command.")
                if not names:
                    print("Type 'help' to see available browser commands.")
            except Exception:
                failed = True
                traceback.print_exc()
        return json.dumps({
            "output": ANSI_ESCAPE.sub("", output.getvalue())[:50000],
            "failed": failed,
            "clear": self.cleared,
            "running": self.ctx.running,
            "cwd": self.ctx.cwd,
            "suggestions": suggestions,
        })


session = BrowserSession()
