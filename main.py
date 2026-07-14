"""
Kevin McCallister CLI Toolkit — Entry Point

A modular developer productivity shell.
"""

from colorama import Fore, Style, init
from pyfiglet import Figlet

from context import ShellContext
from engine import CommandEngine
from registry import register_all_commands
from shell import Shell
from services.history import HistoryService
from services.aliases import AliasService
from services.config import ConfigService
from services.logger import LoggerService

# Initialize colorama
init(autoreset=True)


def display_banner() -> None:
    """Display the startup banner."""
    figlet = Figlet(font="slant")
    banner = figlet.renderText("Kevin CLI")
    print(Fore.CYAN + Style.BRIGHT + banner)
    print(Fore.WHITE + Style.DIM + "  Kevin McCallister CLI Toolkit — Developer Productivity Shell")
    print(Fore.WHITE + Style.DIM + "  Type 'help' for available commands, 'exit' to quit.\n")


def main() -> None:
    """Bootstrap and start the shell."""
    # Display banner
    display_banner()

    # Create services
    history_svc = HistoryService()
    alias_svc = AliasService()
    config_svc = ConfigService()
    logger_svc = LoggerService()

    # Create context
    ctx = ShellContext()

    # Sync persisted aliases into context
    alias_svc.sync_to_context(ctx.aliases)

    # Apply config overrides
    prompt_tmpl = config_svc.get("prompt")
    if prompt_tmpl:
        ctx.prompt_template = prompt_tmpl

    # Create engine and register commands
    engine = CommandEngine()
    register_all_commands(engine, history_svc, alias_svc, config_svc)

    # Start the interactive shell
    shell = Shell(engine, ctx, history_svc, alias_svc, logger_svc)
    shell.run()


if __name__ == "__main__":
    main()