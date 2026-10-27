export type TerminalRequest =
  | { type: "start" }
  | { type: "execute"; command: string };

export type CommandResult = {
  output: string;
  failed: boolean;
  clear: boolean;
  running: boolean;
  cwd: string;
  suggestions: { command: string; available: boolean }[];
};

export type TerminalResponse =
  | { type: "ready"; cwd: string }
  | { type: "result"; result: CommandResult }
  | { type: "error"; message: string };
