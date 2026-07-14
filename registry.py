"""
Registry — single place to wire up all built-in commands.
"""

from __future__ import annotations

from engine import CommandEngine
from services.history import HistoryService
from services.aliases import AliasService
from services.config import ConfigService


def register_all_commands(
    engine: CommandEngine,
    history_svc: HistoryService,
    alias_svc: AliasService,
    config_svc: ConfigService,
) -> None:
    """Import every command module and register its commands."""
    from commands import hello, system, calculator, filesystem, network, developer, help_cmd

    hello.register(engine)
    system.register(engine)
    calculator.register(engine)
    filesystem.register(engine)
    network.register(engine)
    developer.register(engine)

    # help_cmd needs service refs for help, history, alias, config commands
    help_cmd.register(
        engine,
        history_svc=history_svc,
        alias_svc=alias_svc,
        config_svc=config_svc,
    )
