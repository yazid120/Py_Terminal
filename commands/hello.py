"""
Hello commands — hello world and greeting.
"""

from __future__ import annotations

from typing import Optional

from colorama import Fore, Style
from pyfiglet import Figlet

from engine import Command
from context import ShellContext

figlet = Figlet(font="slant")

RAINBOW = [Fore.RED, Fore.YELLOW, Fore.GREEN, Fore.CYAN, Fore.BLUE, Fore.MAGENTA]


def _hello(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Display rainbow 'Hello World' ASCII art."""
    art = figlet.renderText("Hello World")
    lines = art.split("\n")
    output_lines: list[str] = []
    for i, line in enumerate(lines):
        color = RAINBOW[i % len(RAINBOW)]
        print(color + line)
        output_lines.append(line)
    return "\n".join(output_lines)


def _greet(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Greet a person.  Usage: greet <name> [--count N]"""
    name = "World"
    count = 1

    # Simple arg parsing
    i = 0
    positional_set = False
    while i < len(args):
        if args[i] == "--count" and i + 1 < len(args):
            try:
                count = int(args[i + 1])
            except ValueError:
                pass
            i += 2
        elif args[i] == "--name" and i + 1 < len(args):
            name = args[i + 1]
            positional_set = True
            i += 2
        elif not args[i].startswith("-") and not positional_set:
            name = args[i]
            positional_set = True
            i += 1
        else:
            i += 1

    for _ in range(count):
        art = figlet.renderText(f"Hello, {name} !")
        print(Fore.GREEN + Style.BRIGHT + art)
    return None


def register(engine) -> None:
    """Register hello commands with the engine."""
    engine.register(Command(
        name="hello",
        description="Display rainbow 'Hello World' ASCII art",
        usage="hello",
        category="general",
        handler=_hello,
    ))
    engine.register(Command(
        name="greet",
        description="Greet someone with ASCII art",
        usage="greet <name> [--count N]",
        category="general",
        handler=_greet,
    ))
