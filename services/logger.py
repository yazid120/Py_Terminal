"""
Logger Service — command execution logging.

Logs every executed command with timestamp to ~/.kevin-cli/commands.log.
"""

from __future__ import annotations

import logging
from pathlib import Path

LOG_DIR = Path.home() / ".kevin-cli"
LOG_FILE = LOG_DIR / "commands.log"


class LoggerService:
    """Log every command execution to a persistent file."""

    def __init__(self) -> None:
        LOG_DIR.mkdir(parents=True, exist_ok=True)
        self._logger = logging.getLogger("kevin-cli")
        self._logger.setLevel(logging.INFO)
        # Avoid duplicate handlers on reload
        if not self._logger.handlers:
            handler = logging.FileHandler(str(LOG_FILE), encoding="utf-8")
            formatter = logging.Formatter("%(asctime)s  %(message)s", datefmt="%Y-%m-%d %H:%M:%S")
            handler.setFormatter(formatter)
            self._logger.addHandler(handler)

    def log_command(self, raw_input: str) -> None:
        """Log a command string."""
        self._logger.info(raw_input)
