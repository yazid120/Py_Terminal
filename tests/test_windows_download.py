import hashlib
import json
import os
import subprocess
import tempfile
import unittest
from pathlib import Path


DOWNLOADS = Path(__file__).resolve().parents[1] / "landing" / "public" / "downloads"
EXECUTABLE = DOWNLOADS / "kevin-cli-windows.exe"


@unittest.skipUnless(os.name == "nt" and EXECUTABLE.exists(), "Requires a Windows build")
class WindowsDownloadTests(unittest.TestCase):
    def test_download_metadata(self):
        metadata = json.loads((DOWNLOADS / "manifest.json").read_text(encoding="utf-8"))
        data = EXECUTABLE.read_bytes()
        self.assertEqual(data[:2], b"MZ")
        self.assertEqual(metadata["bytes"], len(data))
        self.assertEqual(metadata["sha256"], hashlib.sha256(data).hexdigest())

    def test_standalone_cli(self):
        with tempfile.TemporaryDirectory() as home:
            env = dict(os.environ, HOME=home, USERPROFILE=home, PYTHONIOENCODING="utf-8")
            result = subprocess.run(
                [str(EXECUTABLE)],
                input="calc 2 + 3 * (4 - 1)\nhelp\nexit\n",
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                cwd=home,
                env=env,
                timeout=60,
            )
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("= 11", result.stdout)
        self.assertIn("system-info", result.stdout)
        self.assertIn("Goodbye!", result.stdout)


if __name__ == "__main__":
    unittest.main()
