import importlib
import json
import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch


class BrowserRuntimeTests(unittest.TestCase):
    def setUp(self):
        self.previous_cwd = Path.cwd()
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.addCleanup(os.chdir, self.previous_cwd)
        self.home = patch.object(Path, "home", return_value=Path(self.directory.name))
        self.home.start()
        self.addCleanup(self.home.stop)
        module = importlib.import_module("web.browser_runtime")
        # Service paths are module constants, so reload them inside the temporary home.
        for name in ("services.aliases", "services.config", "services.history"):
            importlib.reload(importlib.import_module(name))
        module = importlib.reload(module)
        self.session = module.session

    def execute(self, command):
        return json.loads(self.session.execute(command))

    def test_existing_calculator_and_errors(self):
        self.assertIn("= 11", self.execute("calc 2 + 3 * (4 - 1)")["output"])
        self.assertIn("Division by zero", self.execute("calc 1 / 0")["output"])
        unknown = self.execute("cpu")
        self.assertTrue(unknown["failed"])
        self.assertIn("Command not found: cpu", unknown["output"])
        self.assertNotIn("\x1b", self.execute("help")["output"])

    def test_variables_aliases_and_history(self):
        self.execute("name=Kevin")
        self.assertIn("Hello Kevin", self.execute("echo Hello $name")["output"])
        self.execute("alias hi=echo hello")
        self.assertIn("hello", self.execute("hi")["output"])
        self.assertIn("hello", self.execute("!!")["output"])
        self.assertIn("hi", self.execute("history")["output"])

    def test_virtual_files_and_developer_commands(self):
        self.assertIn("welcome.txt", self.execute("ls")["output"])
        self.execute("mkdir demo")
        result = self.execute("cd demo")
        self.assertTrue(result["cwd"].endswith("demo"))
        self.execute("touch sample.txt")
        self.assertIn("sample.txt", self.execute("ls")["output"])
        self.assertIn("aGVsbG8=", self.execute("base64 encode hello")["output"])
        self.assertIn('"ok": true', self.execute("""json-pretty '{"ok":true}'""")["output"])
        self.assertRegex(self.execute("uuid")["output"], r"[a-f0-9]{8}-[a-f0-9-]{27}")

    def test_clear_alias_and_exit(self):
        self.execute("alias wipe=clear")
        self.assertTrue(self.execute("wipe")["clear"])
        self.assertFalse(self.execute("exit")["running"])
        self.assertTrue(self.execute("echo not-running")["failed"])

    def test_output_limit(self):
        result = self.execute("echo " + "x" * 60000)
        self.assertEqual(len(result["output"]), 50000)

    def test_typo_offers_runnable_correction_with_quoted_arguments(self):
        result = self.execute("""json-prety '{"message":"hello world"}'""")
        self.assertTrue(result["failed"])
        self.assertNotIn("Traceback", result["output"])
        self.assertIn("Did you mean 'json-pretty'?", result["output"])
        suggestion = result["suggestions"][0]
        self.assertTrue(suggestion["available"])
        corrected = self.execute(suggestion["command"])
        self.assertIn('"message": "hello world"', corrected["output"])
        self.assertFalse(corrected["failed"])
        self.assertEqual(corrected["suggestions"], [])

    def test_desktop_typo_and_exact_name_are_not_runnable(self):
        result = self.execute("system-infos")
        self.assertIn("Did you mean 'system-info'?", result["output"])
        self.assertNotIn("Traceback", result["output"])
        self.assertIn({"command": "system-info", "available": False}, result["suggestions"])
        self.assertIn("desktop CLI only", result["output"])
        self.assertEqual(
            self.execute("cpu")["suggestions"],
            [{"command": "cpu", "available": False}],
        )

    def test_unknown_command_has_help_hint(self):
        result = self.execute("zzzzzzzzzz")
        self.assertTrue(result["failed"])
        self.assertEqual(result["suggestions"], [])
        self.assertIn("Type 'help'", result["output"])
        self.assertNotIn("Traceback", result["output"])

    def test_alias_correction_requires_explicit_execution(self):
        self.execute("alias greeting=echo hello")
        result = self.execute("greetin")
        self.assertNotIn("hello", result["output"])
        self.assertIn({"command": "greeting", "available": True}, result["suggestions"])


if __name__ == "__main__":
    unittest.main()
