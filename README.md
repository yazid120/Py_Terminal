# Py_Terminal

Kevin CLI is a modular Python developer shell, with a browser playground and a
standalone Windows x64 download available from the landing page.

## Run from source

```powershell
python -m pip install -r requirements.txt
python main.py
```

Type `help` to list commands. Desktop history, aliases, configuration and logs
are stored under `~/.kevin-cli`.

Unknown commands suggest close matches. On desktop, the best correction is
filled into the next prompt: press Enter to run it, or edit/clear it. Corrections
are never executed automatically.

## Build the Windows executable

Use 64-bit Python on Windows:

```powershell
python -m pip install -r requirements-build.txt
python scripts\build_windows.py
```

This creates `landing/public/downloads/kevin-cli-windows.exe` plus a SHA-256
manifest. Users can run the downloaded executable without installing Python.
The prototype executable is unsigned; Windows may display a SmartScreen warning.
Managed devices may require an approved, signed build before allowing execution.

## Website and browser demo

See [the website instructions](landing/README.md) for development and deployment.
The browser runs the actual CLI engine in a Pyodide Web Worker, with calculator,
developer, greeting, help/history/alias/config and virtual filesystem commands.
System and network commands require the desktop app. The demo needs internet
access to load Python and dependencies; all demo state is temporary.

Build the Windows executable first, then:

```powershell
cd landing
npm ci
npm run build
npm run preview
```

## Tests

```powershell
python -m unittest discover -s tests -v
```

The Windows download smoke test runs the packaged executable if it exists.
The build workflow packages and tests the executable and uploads the complete
website as a GitHub Actions artifact.