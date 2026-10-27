import { loadPyodide } from "pyodide";
import { sources } from "./python-sources";
import type { CommandResult, TerminalRequest, TerminalResponse } from "./terminal-protocol";

let runtime: Awaited<ReturnType<typeof loadPyodide>> | undefined;

function respond(message: TerminalResponse) {
  self.postMessage(message);
}

self.onmessage = async (event: MessageEvent<TerminalRequest>) => {
  try {
    if (event.data.type === "start") {
      runtime = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/",
      });
      await runtime.loadPackage("micropip");
      await runtime.runPythonAsync(`
import micropip
await micropip.install(["colorama==0.4.6", "pyfiglet==1.0.2"])
`);
      runtime.FS.mkdirTree("/home/pyodide/cli");
      for (const [name, source] of Object.entries(sources)) {
        const path = `/home/pyodide/cli/${name}`;
        runtime.FS.mkdirTree(path.slice(0, path.lastIndexOf("/")));
        runtime.FS.writeFile(path, source);
      }
      await runtime.runPythonAsync(`
import sys
sys.path.insert(0, "/home/pyodide/cli")
from browser_runtime import session
`);
      respond({ type: "ready", cwd: runtime.runPython("session.ctx.cwd") });
    } else {
      if (!runtime) throw new Error("Python runtime is not ready.");
      runtime.globals.set("_browser_command", event.data.command);
      try {
        const result: CommandResult = JSON.parse(
          await runtime.runPythonAsync("session.execute(_browser_command)"),
        );
        respond({ type: "result", result });
      } finally {
        runtime.globals.delete("_browser_command");
      }
    }
  } catch (error) {
    respond({ type: "error", message: error instanceof Error ? error.message : String(error) });
  }
};
