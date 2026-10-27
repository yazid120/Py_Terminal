import context from "../../context.py?raw";
import engine from "../../engine.py?raw";
import calculator from "../../commands/calculator.py?raw";
import developer from "../../commands/developer.py?raw";
import filesystem from "../../commands/filesystem.py?raw";
import hello from "../../commands/hello.py?raw";
import help from "../../commands/help_cmd.py?raw";
import aliases from "../../services/aliases.py?raw";
import config from "../../services/config.py?raw";
import history from "../../services/history.py?raw";
import runtime from "../../web/browser_runtime.py?raw";

export const sources: Record<string, string> = {
  "context.py": context,
  "engine.py": engine,
  "commands/__init__.py": "",
  "commands/calculator.py": calculator,
  "commands/developer.py": developer,
  "commands/filesystem.py": filesystem,
  "commands/hello.py": hello,
  "commands/help_cmd.py": help,
  "services/__init__.py": "",
  "services/aliases.py": aliases,
  "services/config.py": config,
  "services/history.py": history,
  "browser_runtime.py": runtime,
};
