"""
Help command — dynamically lists all registered commands.
Also: history, alias, unalias, aliases, config commands.
"""

from __future__ import annotations

from typing import Optional, TYPE_CHECKING

from colorama import Fore, Style
from pyfiglet import Figlet

from engine import Command
from context import ShellContext

if TYPE_CHECKING:
    from engine import CommandEngine
    from services.history import HistoryService
    from services.aliases import AliasService
    from services.config import ConfigService

figlet = Figlet(font="slant")

# These will be injected at registration time
_engine_ref: Optional["CommandEngine"] = None
_history_ref: Optional["HistoryService"] = None
_alias_ref: Optional["AliasService"] = None
_config_ref: Optional["ConfigService"] = None


def _help(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Show help for all commands or a specific command."""
    if _engine_ref is None:
        print(Fore.RED + "  Engine not available.")
        return None

    # Help for a specific command
    if args:
        cmd = _engine_ref.get_command(args[0])
        if cmd:
            print(Fore.BLUE + Style.BRIGHT + f"  {cmd.name}" + Fore.WHITE + f" — {cmd.description}")
            if cmd.usage:
                print(Fore.CYAN + f"  Usage: {cmd.usage}")
            return None
        else:
            print(Fore.RED + f"  Unknown command: {args[0]}")
            return None

    # Full help
    art = figlet.renderText("Help")
    print(Fore.YELLOW + Style.BRIGHT + art)

    # Group by category
    commands = _engine_ref.list_commands()
    categories: dict[str, list[Command]] = {}
    for cmd in commands:
        categories.setdefault(cmd.category, []).append(cmd)

    for cat in sorted(categories.keys()):
        print(Fore.BLUE + Style.BRIGHT + f"\n  [{cat.upper()}]")
        for cmd in categories[cat]:
            print(Fore.CYAN + f"    {cmd.name:<16}" + Fore.WHITE + f"{cmd.description}")

    print()
    print(Fore.YELLOW + "  Type 'help <command>' for detailed usage.")
    return None


def _history_cmd(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Show command history."""
    if _history_ref is None:
        print(Fore.RED + "  History not available.")
        return None

    if args and args[0] == "clear":
        _history_ref.clear()
        print(Fore.GREEN + "  History cleared.")
        return None

    entries = _history_ref.get_all()
    if not entries:
        print(Fore.YELLOW + "  No history yet.")
        return None

    print(Fore.BLUE + Style.BRIGHT + "Command History:")
    for i, entry in enumerate(entries, 1):
        print(Fore.CYAN + f"  {i:>4}  {entry}")
    return None


def _alias_cmd(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Set an alias.  Usage: alias <name>=<command>"""
    if _alias_ref is None:
        print(Fore.RED + "  Alias service not available.")
        return None

    if not args:
        # Show all aliases
        return _aliases_cmd(ctx, args)

    raw = " ".join(args)
    if "=" not in raw:
        print(Fore.YELLOW + "Usage: alias <name>=<command>")
        return None

    name, value = raw.split("=", 1)
    name = name.strip()
    value = value.strip()

    _alias_ref.set_alias(name, value)
    ctx.aliases[name] = value
    print(Fore.GREEN + f"  Alias set: {name} -> {value}")
    return None


def _unalias_cmd(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Remove an alias.  Usage: unalias <name>"""
    if _alias_ref is None:
        print(Fore.RED + "  Alias service not available.")
        return None

    if not args:
        print(Fore.YELLOW + "Usage: unalias <name>")
        return None

    name = args[0]
    if _alias_ref.remove_alias(name):
        ctx.aliases.pop(name, None)
        print(Fore.GREEN + f"  Alias removed: {name}")
    else:
        print(Fore.YELLOW + f"  Alias '{name}' not found.")
    return None


def _aliases_cmd(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """List all aliases."""
    if _alias_ref is None:
        print(Fore.RED + "  Alias service not available.")
        return None

    aliases = _alias_ref.get_all()
    if not aliases:
        print(Fore.YELLOW + "  No aliases defined.")
        return None

    print(Fore.BLUE + Style.BRIGHT + "Aliases:")
    for name, value in sorted(aliases.items()):
        print(Fore.CYAN + f"  {name}" + Fore.WHITE + f" -> {value}")
    return None


def _config_cmd(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Config management.  Usage: config get|set|reset [key] [value]"""
    if _config_ref is None:
        print(Fore.RED + "  Config service not available.")
        return None

    if not args:
        # Show all config
        all_cfg = _config_ref.get_all()
        print(Fore.BLUE + Style.BRIGHT + "Configuration:")
        for k, v in sorted(all_cfg.items()):
            print(Fore.CYAN + f"  {k}" + Fore.WHITE + f" = {v}")
        return None

    action = args[0].lower()

    if action == "get" and len(args) > 1:
        key = args[1]
        val = _config_ref.get(key)
        if val is not None:
            print(Fore.CYAN + f"  {key}" + Fore.WHITE + f" = {val}")
        else:
            print(Fore.YELLOW + f"  Key '{key}' not found.")
    elif action == "set" and len(args) > 2:
        key = args[1]
        val = " ".join(args[2:])
        _config_ref.set(key, val)
        print(Fore.GREEN + f"  Set {key} = {val}")
    elif action == "reset":
        _config_ref.reset()
        print(Fore.GREEN + "  Config reset to defaults.")
    else:
        print(Fore.YELLOW + "Usage: config get <key> | config set <key> <value> | config reset")
    return None


def register(engine, history_svc=None, alias_svc=None, config_svc=None) -> None:
    """Register help/meta commands.  Accepts service references for injection."""
    global _engine_ref, _history_ref, _alias_ref, _config_ref
    _engine_ref = engine
    _history_ref = history_svc
    _alias_ref = alias_svc
    _config_ref = config_svc

    commands = [
        Command("help", "Show help for all commands", "help [command]", "general", _help),
        Command("history", "Show/clear command history", "history [clear]", "general", _history_cmd),
        Command("alias", "Set an alias", "alias <name>=<command>", "general", _alias_cmd),
        Command("unalias", "Remove an alias", "unalias <name>", "general", _unalias_cmd),
        Command("aliases", "List all aliases", "aliases", "general", _aliases_cmd),
        Command("config", "Manage configuration", "config get|set|reset [key] [value]", "general", _config_cmd),
    ]
    for cmd in commands:
        engine.register(cmd)
