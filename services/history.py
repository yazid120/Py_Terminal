"""
History Service — persistent command history.

Stores history in ~/.kevin-cli/history.txt.
Supports history recall: !!, !N, !prefix
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import Optional


HISTORY_DIR = Path.home() / ".kevin-cli"
HISTORY_FILE = HISTORY_DIR / "history.txt"
MAX_HISTORY = 1000


class HistoryService:
    """Manage persistent command history."""

    def __init__(self, max_size: int = MAX_HISTORY) -> None:
        self.max_size = max_size
        self._entries: list[str] = []
        self._load()

    # ---- public API ----

    def add(self, entry: str) -> None:
        """Add an entry to history."""
        entry = entry.strip()
        if not entry:
            return
        self._entries.append(entry)
        if len(self._entries) > self.max_size:
            self._entries = self._entries[-self.max_size:]
        self._save()

    def get_all(self) -> list[str]:
        """Return all history entries."""
        return list(self._entries)

    def get_last(self) -> Optional[str]:
        """Return the most recent entry (for !!)."""
        return self._entries[-1] if self._entries else None

    def get_by_index(self, index: int) -> Optional[str]:
        """Return entry by 1-based index (for !N)."""
        if 1 <= index <= len(self._entries):
            return self._entries[index - 1]
        return None

    def get_by_prefix(self, prefix: str) -> Optional[str]:
        """Return most recent entry starting with *prefix* (for !prefix)."""
        for entry in reversed(self._entries):
            if entry.startswith(prefix):
                return entry
        return None

    def clear(self) -> None:
        """Clear all history."""
        self._entries.clear()
        self._save()

    def __len__(self) -> int:
        return len(self._entries)

    # ---- resolve bang expressions ----

    def resolve_bangs(self, raw_input: str) -> str:
        """
        Expand history references in raw_input:
          !!       -> last command
          !N       -> command number N
          !prefix  -> most recent command starting with prefix
        """
        stripped = raw_input.strip()

        if stripped == "!!":
            last = self.get_last()
            return last if last else raw_input

        if stripped.startswith("!") and len(stripped) > 1:
            rest = stripped[1:]
            # !N  (numeric)
            if rest.isdigit():
                entry = self.get_by_index(int(rest))
                if entry:
                    return entry
            else:
                # !prefix
                entry = self.get_by_prefix(rest)
                if entry:
                    return entry

        return raw_input

    # ---- persistence (private) ----

    def _load(self) -> None:
        """Load history from file."""
        if HISTORY_FILE.exists():
            try:
                text = HISTORY_FILE.read_text(encoding="utf-8")
                self._entries = [
                    line for line in text.splitlines() if line.strip()
                ]
            except Exception:
                self._entries = []

    def _save(self) -> None:
        """Persist history to file."""
        try:
            HISTORY_DIR.mkdir(parents=True, exist_ok=True)
            HISTORY_FILE.write_text(
                "\n".join(self._entries) + "\n", encoding="utf-8"
            )
        except Exception:
            pass
