"""
Shell — interactive REPL with prompt_toolkit.

Handles:
- Rich prompt display (user@host, cwd, git branch)
- Input reading via prompt_toolkit (history, autocomplete, Ctrl+C/D)
- Dispatching to CommandEngine
- History recording
- Command logging
"""

from __future__ import annotations

from typing import Optional

from colorama import Fore, Style
from prompt_toolkit import PromptSession
from prompt_toolkit.history import FileHistory
from prompt_toolkit.auto_suggest import AutoSuggestFromHistory
from prompt_toolkit.completion import WordCompleter
from prompt_toolkit.formatted_text import HTML
from prompt_toolkit.styles import Style as PTStyle

from context import ShellContext
from engine import CommandEngine, CommandNotFoundError
from services.history import HistoryService
from services.aliases import AliasService
from services.logger import LoggerService


# Prompt toolkit style
PT_STYLE = PTStyle.from_dict({
    "username": "#00cc66 bold",
    "at": "#888888",
    "hostname": "#00cc66",
    "path": "#4488ff",
    "branch": "#ffaa00",
    "arrow": "#00cccc bold",
})




class Shell:
    """Interactive REPL wrapping the CommandEngine."""

    def __init__(
        self,
        engine: CommandEngine,
        ctx: ShellContext,
        history_svc: HistoryService,
        alias_svc: AliasService,
        logger_svc: LoggerService,
    ) -> None:
        self.engine = engine
        self.ctx = ctx
        self.history_svc = history_svc
        self.alias_svc = alias_svc
        self.logger_svc = logger_svc

        # Create prompt_toolkit session
        from pathlib import Path
        pt_history_path = Path.home() / ".kevin-cli" / "pt_history"
        pt_history_path.parent.mkdir(parents=True, exist_ok=True)

        self.session: PromptSession = PromptSession(
            history=FileHistory(str(pt_history_path)),
            auto_suggest=AutoSuggestFromHistory(),
            style=PT_STYLE,
            enable_history_search=True,
        )

    def _build_prompt(self) -> HTML:
        """Build a rich HTML prompt for prompt_toolkit."""
        self.ctx.refresh_git_branch()

        username = self.ctx.username
        hostname = self.ctx.hostname
        cwd = self.ctx.cwd_short
        branch = self.ctx.git_branch

        parts = [
            f"<username>{username}</username>",
            "<at>@</at>",
            f"<hostname>{hostname}</hostname>",
            " ",
            f"<path>{cwd}</path>",
        ]
        if branch:
            parts.append(f" <branch>({branch})</branch>")
        parts.append("\n<arrow>❯</arrow> ")

        return HTML("".join(parts))

    def _get_completer(self) -> WordCompleter:
        """Build a completer from registered command names + aliases."""
        words = self.engine.list_command_names()
        words.extend(self.ctx.aliases.keys())
        return WordCompleter(sorted(set(words)), ignore_case=True)

    def run(self) -> None:
        """Main REPL loop."""
        while self.ctx.running:
            try:
                prompt = self._build_prompt()
                completer = self._get_completer()

                raw_input = self.session.prompt(
                    prompt,
                    completer=completer,
                )

                if not raw_input or not raw_input.strip():
                    continue

                # Resolve history bangs (!!, !N, !prefix)
                resolved = self.history_svc.resolve_bangs(raw_input.strip())
                if resolved != raw_input.strip():
                    print(Fore.WHITE + Style.DIM + f"  → {resolved}")

                # Record in history
                self.history_svc.add(resolved)

                # Log the command
                self.logger_svc.log_command(resolved)

                # Execute
                self.engine.execute(resolved, self.ctx)

            except CommandNotFoundError as e:
                print(Fore.RED + f"  {e}")
            except KeyboardInterrupt:
                # Ctrl+C — cancel current line
                print()
                continue
            except EOFError:
                # Ctrl+D — exit
                self.ctx.running = False
                print(Fore.YELLOW + "\nGoodbye!")
            except Exception as e:
                print(Fore.RED + f"  Error: {e}")
