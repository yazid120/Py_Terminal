"""
Config Service — user configuration management.

Reads/writes ~/.kevin-cli/config.json.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Optional

CONFIG_DIR = Path.home() / ".kevin-cli"
CONFIG_FILE = CONFIG_DIR / "config.json"

DEFAULTS: dict[str, Any] = {
    "theme": "default",
    "username": "",
    "prompt": "{username}@{hostname} {cwd_short} {git_branch}> ",
    "editor": "notepad" if __import__("platform").system() == "Windows" else "nano",
    "history_size": 1000,
    "colors": {
        "prompt": "cyan",
        "error": "red",
        "success": "green",
        "info": "blue",
    },
}


class ConfigService:
    """Manage user configuration with JSON-backed persistence."""

    def __init__(self) -> None:
        self._config: dict[str, Any] = dict(DEFAULTS)
        self._load()

    # ---- public API ----

    def get(self, key: str) -> Any:
        """Get a config value.  Supports dot-notation for nested keys."""
        keys = key.split(".")
        value: Any = self._config
        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return None
        return value

    def set(self, key: str, value: str) -> None:
        """Set a config value (always stored as string for simple keys)."""
        # Auto-convert numeric strings
        if value.isdigit():
            self._config[key] = int(value)
        elif value.lower() in ("true", "false"):
            self._config[key] = value.lower() == "true"
        else:
            self._config[key] = value
        self._save()

    def reset(self) -> None:
        """Reset config to defaults."""
        self._config = dict(DEFAULTS)
        self._save()

    def get_all(self) -> dict[str, Any]:
        """Return a copy of the full config."""
        return dict(self._config)

    # ---- persistence (private) ----

    def _load(self) -> None:
        if CONFIG_FILE.exists():
            try:
                loaded = json.loads(CONFIG_FILE.read_text(encoding="utf-8"))
                self._config.update(loaded)
            except Exception:
                pass

    def _save(self) -> None:
        try:
            CONFIG_DIR.mkdir(parents=True, exist_ok=True)
            CONFIG_FILE.write_text(
                json.dumps(self._config, indent=2), encoding="utf-8"
            )
        except Exception:
            pass
