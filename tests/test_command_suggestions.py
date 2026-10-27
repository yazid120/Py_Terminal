import contextlib
import io
import unittest
from unittest.mock import Mock

from context import ShellContext
from engine import Command, CommandEngine, CommandNotFoundError
from shell import Shell


class CommandSuggestionTests(unittest.TestCase):
    def test_engine_preserves_arguments_and_does_not_run_corrections(self):
        engine = CommandEngine()
        handler = Mock()
        engine.register(Command(name="system-info", handler=handler))
        ctx = ShellContext(env_vars={})
        with self.assertRaises(CommandNotFoundError) as raised:
            engine.execute('system-infos "two words"', ctx)
        error = raised.exception
        self.assertEqual(error.suggestions[0], "system-info")
        self.assertIn("Did you mean 'system-info'?", str(error))
        self.assertEqual(error.corrected_command("system-info"), "system-info 'two words'")
        handler.assert_not_called()
        engine.execute(error.corrected_command("system-info"), ctx)
        handler.assert_called_once_with(ctx, ["two words"])

    def test_desktop_prefills_correction_for_confirmation(self):
        shell = Shell.__new__(Shell)
        shell.ctx = ShellContext(env_vars={})
        shell.engine = CommandEngine()
        shell.engine.register(Command(name="echo", handler=Mock()))
        shell.session = Mock()
        shell.session.prompt.side_effect = ["ech hello", "echo hello", EOFError()]
        shell.history_svc = Mock()
        shell.history_svc.resolve_bangs.side_effect = lambda text: text
        shell.logger_svc = Mock()
        shell._build_prompt = Mock(return_value="> ")
        with contextlib.redirect_stdout(io.StringIO()):
            shell.run()
        prompts = shell.session.prompt.call_args_list
        self.assertEqual(prompts[0].kwargs["default"], "")
        self.assertEqual(prompts[1].kwargs["default"], "echo hello")
        self.assertEqual(prompts[2].kwargs["default"], "")


if __name__ == "__main__":
    unittest.main()
