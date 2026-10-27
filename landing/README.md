# Py Terminal website

React, TypeScript, Tailwind and Vite landing page with an interactive Python CLI.

## Development

```powershell
npm ci
npm run dev
```

Click **Start browser demo** to load Pyodide 0.27.7 in a Web Worker. The runtime
and Python packages require an internet connection (jsDelivr and PyPI). No
commands are sent to a server. The first start downloads the Python runtime;
subsequent loads can use the browser's HTTP cache.

The worker bundles the existing engine and compatible Python modules directly
from the repository. It installs pinned `colorama` and `pyfiglet` packages.
Filesystem operations affect only Pyodide's in-memory filesystem. History,
aliases, configuration and variables last only until restart or page reload.
System/process/network commands are desktop-only.

Commands run off the UI thread, with a 10-second execution timeout and a Stop
button. Restart terminates the worker and creates a fresh session. Output is
limited to 50,000 characters per command and 150 terminal entries.

Misspelled commands show friendly suggestions instead of a traceback. Click
**Run &lt;corrected command&gt;** to explicitly run a correction, keeping its
arguments. Suggestions include aliases. Desktop-only names (for example,
`system-infos` -> `system-info`) explain the limitation and link to the download
section instead of offering an unsupported browser execution.

## Windows download and production build

Build the executable on Windows x64 **before** building the website. From the
repository root:

```powershell
python -m pip install -r requirements-build.txt
python scripts\build_windows.py
```

Then from this directory:

```powershell
npm ci
npm run build
npm run lint
npm run preview
```

The generated executable and checksum manifest are copied from
`public/downloads` into `dist/downloads`. Generated binaries are intentionally
not committed. Production builds fail explicitly if the executable is missing;
development mode displays an unavailable-download message instead of a broken
link. Restart Vite after building a previously missing executable.

Production URLs use the `/Py_Terminal/` GitHub Pages base, including downloads
and the worker. `npm run deploy` builds and publishes the complete `dist` folder
using the existing `gh-pages` script. The GitHub Actions build workflow also
produces an artifact containing the complete website and executable; it does
not deploy automatically.

The executable is an unsigned prototype. Windows may show a SmartScreen warning.
The download section links to `manifest.json` with the file size and SHA-256.
Managed Windows devices may block execution under application-control policy
(for example, WinError 4551). Such environments require an appropriately signed
and approved build. The smoke test reports this restriction rather than
bypassing it.
