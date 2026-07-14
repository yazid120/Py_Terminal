"""
Alias Service — shell alias management.

Persists aliases to ~/.kevin-cli/aliases.json.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Optional

ALIAS_DIR = Path.home() / ".kevin-cli"
ALIAS_FILE = ALIAS_DIR / "aliases.json"


class AliasService:
    """Manage shell aliases with JSON-backed persistence."""

    def __init__(self) -> None:
        self._aliases: dict[str, str] = {}
        self._load()

    # ---- public API ----

    def set_alias(self, name: str, value: str) -> None:
        """Create or update an alias."""
        self._aliases[name] = value
        self._save()

    def remove_alias(self, name: str) -> bool:
        """Remove an alias.  Returns True if it existed."""
        if name in self._aliases:
            del self._aliases[name]
            self._save()
            return True
        return False

    def get_alias(self, name: str) -> Optional[str]:
        """Look up an alias value."""
        return self._aliases.get(name)

    def get_all(self) -> dict[str, str]:
        """Return a copy of all aliases."""
        return dict(self._aliases)

    def sync_to_context(self, aliases_dict: dict[str, str]) -> None:
        """Sync loaded aliases into a ShellContext.aliases dict (in-place)."""
        aliases_dict.update(self._aliases)

    # ---- persistence (private) ----

    def _load(self) -> None:
        if ALIAS_FILE.exists():
            try:
                self._aliases = json.loads(
                    ALIAS_FILE.read_text(encoding="utf-8")
                )
            except Exception:
                self._aliases = {}

    def _save(self) -> None:
        try:
            ALIAS_DIR.mkdir(parents=True, exist_ok=True)
            ALIAS_FILE.write_text(
                json.dumps(self._aliases, indent=2), encoding="utf-8"
            )
        except Exception:
            pass
