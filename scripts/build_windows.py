"""Build the standalone Windows CLI served by the landing page."""

import hashlib
import json
import platform
import subprocess
import sys
from pathlib import Path


def main() -> None:
    if sys.platform != "win32" or platform.machine().lower() not in ("amd64", "x86_64"):
        raise SystemExit("Build this download with 64-bit Python on Windows.")

    root = Path(__file__).resolve().parents[1]
    destination = root / "landing" / "public" / "downloads"
    subprocess.run(
        [
            sys.executable, "-m", "PyInstaller",
            "--noconfirm", "--clean", "--onefile", "--console",
            "--name", "kevin-cli-windows",
            "--collect-all", "pyfiglet",
            "--distpath", str(destination),
            "--workpath", str(root / "build" / "pyinstaller"),
            "--specpath", str(root / "build"),
            str(root / "main.py"),
        ],
        cwd=root,
        check=True,
    )
    executable = destination / "kevin-cli-windows.exe"
    metadata = {
        "filename": executable.name,
        "platform": "Windows x64",
        "bytes": executable.stat().st_size,
        "sha256": hashlib.sha256(executable.read_bytes()).hexdigest(),
    }
    (destination / "manifest.json").write_text(
        json.dumps(metadata, indent=2) + "\n", encoding="utf-8"
    )
    print(f"Built {executable} ({metadata['bytes']} bytes)")


if __name__ == "__main__":
    main()
