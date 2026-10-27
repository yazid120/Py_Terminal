import contextlib
import io
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import Mock, patch

from context import ShellContext
from engine import Command, CommandEngine
from shell import Shell


class ShellInputTests(unittest.TestCase):
    def create_shell(self):
        engine = CommandEngine()
        self.echo = Mock()
        engine.register(Command(name="echo", handler=self.echo))
        history = Mock()
        history.resolve_bangs.side_effect = lambda text: text
        return Shell(engine, ShellContext(env_vars={}), history, Mock(), Mock())

    def test_redirected_streams_do_not_create_console_session(self):
        for stdin_tty, stdout_tty in ((False, False), (False, True), (True, False)):
            with self.subTest(stdin_tty=stdin_tty, stdout_tty=stdout_tty):
                with patch("sys.stdin") as stdin, patch("sys.stdout") as stdout:
                    stdin.isatty.return_value = stdin_tty
                    stdout.isatty.return_value = stdout_tty
                    with patch("shell.PromptSession") as prompt_session:
                        shell = self.create_shell()
                    prompt_session.assert_not_called()
                    self.assertIsNone(shell.session)

    def test_terminal_keeps_rich_prompt(self):
        with tempfile.TemporaryDirectory() as home:
            with patch("sys.stdin") as stdin, patch("sys.stdout") as stdout:
                stdin.isatty.return_value = True
                stdout.isatty.return_value = True
                with patch.object(Path, "home", return_value=Path(home)):
                    with patch("shell.PromptSession") as prompt_session:
                        shell = self.create_shell()
                prompt_session.assert_called_once()
                self.assertIs(shell.session, prompt_session.return_value)

    def test_piped_input_does_not_autoexecute_corrections(self):
        output = io.StringIO()
        with patch("sys.stdin", io.StringIO("ech hello\n\necho confirmed\n")):
            with contextlib.redirect_stdout(output):
                shell = self.create_shell()
                shell.run()
        self.echo.assert_called_once_with(shell.ctx, ["confirmed"])
        self.assertIn("Did you mean 'echo'?", output.getvalue())
        self.assertNotIn("Correction filled in", output.getvalue())
        self.assertIn("Goodbye!", output.getvalue())
        self.assertFalse(shell.ctx.running)
        self.assertEqual(shell.history_svc.add.call_count, 2)
        self.assertEqual(shell.logger_svc.log_command.call_count, 2)

    def test_source_cli_with_redirected_input_and_output(self):
        main = Path(__file__).resolve().parents[1] / "main.py"
        with tempfile.TemporaryDirectory() as home:
            env = dict(os.environ, HOME=home, USERPROFILE=home, PYTHONIOENCODING="utf-8")
            result = subprocess.run(
                [sys.executable, "-B", str(main)],
                input="calc 2 + 3 * (4 - 1)\nhelp\nexit\n",
                capture_output=True,
                text=True,
                encoding="utf-8",
                cwd=home,
                env=env,
                timeout=60,
            )
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("= 11", result.stdout)
        self.assertIn("system-info", result.stdout)
        self.assertIn("Goodbye!", result.stdout)
        self.assertNotIn("NoConsoleScreenBufferError", result.stderr)


if __name__ == "__main__":
    unittest.main()
