"""
Command Engine — core execution engine.

Parses raw user input, resolves aliases, looks up commands,
and dispatches to command handlers.  Zero Click dependency.
"""

from __future__ import annotations

import shlex
from dataclasses import dataclass, field
from typing import Any, Callable, Optional

from context import ShellContext


@dataclass
class CommandArg:
    """Describes a single argument a command accepts."""
    name: str
    description: str = ""
    required: bool = False
    default: Any = None


@dataclass
class Command:
    """A registered command."""
    name: str
    description: str = ""
    usage: str = ""
    category: str = "general"
    handler: Callable[..., Optional[str]] = lambda ctx, args: None


class CommandEngine:
    """Register, resolve, and execute commands."""

    def __init__(self) -> None:
        self._commands: dict[str, Command] = {}

    # ---- registration ----

    def register(self, command: Command) -> None:
        """Register a command by name."""
        self._commands[command.name] = command

    def unregister(self, name: str) -> None:
        """Remove a command by name."""
        self._commands.pop(name, None)

    # ---- lookup ----

    def get_command(self, name: str) -> Optional[Command]:
        """Look up a command by name."""
        return self._commands.get(name)

    def list_commands(self) -> list[Command]:
        """Return all registered commands, sorted by name."""
        return sorted(self._commands.values(), key=lambda c: c.name)

    def list_command_names(self) -> list[str]:
        """Return sorted list of command names (for autocomplete)."""
        return sorted(self._commands.keys())

    # ---- execution ----

    def execute(self, raw_input: str, ctx: ShellContext) -> Optional[str]:
        """
        Parse *raw_input*, resolve aliases, expand variables,
        look up the command, and call its handler.

        Returns the handler's return value (usually None,
        or a string for future pipeline support).
        """
        if not raw_input or not raw_input.strip():
            return None

        # 1. Expand variables ($name -> value)
        expanded = ctx.expand_variables(raw_input.strip())

        # 2. Handle variable assignment  (name=value)
        if "=" in expanded and not expanded.startswith("="):
            parts = expanded.split("=", 1)
            potential_name = parts[0].strip()
            # Only treat as assignment if lhs looks like a simple identifier
            if potential_name.isidentifier() and potential_name not in self._commands:
                ctx.variables[potential_name] = parts[1].strip()
                return None

        # 3. Resolve aliases (recursively, up to 10 levels to prevent loops)
        expanded = self._resolve_aliases(expanded, ctx, depth=0)

        # 4. Tokenize
        try:
            tokens = shlex.split(expanded)
        except ValueError:
            tokens = expanded.split()

        if not tokens:
            return None

        cmd_name = tokens[0]
        args = tokens[1:]

        # 5. Look up command
        command = self.get_command(cmd_name)
        if command is None:
            raise CommandNotFoundError(cmd_name)

        # 6. Execute handler
        return command.handler(ctx, args)

    # ---- alias resolution (private) ----

    def _resolve_aliases(self, text: str, ctx: ShellContext, depth: int) -> str:
        """Recursively expand the first word if it's an alias."""
        if depth > 10:
            return text

        try:
            tokens = shlex.split(text)
        except ValueError:
            tokens = text.split()

        if not tokens:
            return text

        first = tokens[0]
        if first in ctx.aliases:
            replacement = ctx.aliases[first]
            rest = " ".join(tokens[1:])
            new_text = f"{replacement} {rest}".strip()
            return self._resolve_aliases(new_text, ctx, depth + 1)

        return text


class CommandNotFoundError(Exception):
    """Raised when a command name is not registered."""

    def __init__(self, name: str) -> None:
        self.name = name
        super().__init__(f"Command not found: {name}")
