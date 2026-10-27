import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import type { CommandResult, TerminalRequest, TerminalResponse } from "./terminal-protocol";

type Status = "idle" | "loading" | "ready" | "busy" | "ended" | "error";
type Line = { text: string; tone: "command" | "output" | "error" };

const examples = ["help", "calc 2 + 3 * (4 - 1)", "ls", "base64 encode Hello browser"];

export default function CLIDemo() {
  const [status, setStatus] = useState<Status>("idle");
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~/playground");
  const [suggestions, setSuggestions] = useState<CommandResult["suggestions"]>([]);
  const worker = useRef<Worker | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const history = useRef<string[]>([]);
  const cursor = useRef(0);
  const draft = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  function stop() {
    clearTimeout(timer.current);
    worker.current?.terminate();
    worker.current = null;
  }

  function fail(message: string) {
    stop();
    setSuggestions([]);
    setLines((previous) => [...previous, { text: message, tone: "error" }]);
    setStatus("error");
  }

  useEffect(() => () => {
    clearTimeout(timer.current);
    worker.current?.terminate();
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
    if (status === "ready") inputRef.current?.focus({ preventScroll: true });
  }, [lines, status]);

  function start() {
    stop();
    setLines([]);
    setInput("");
    setSuggestions([]);
    history.current = [];
    cursor.current = 0;
    draft.current = "";
    setStatus("loading");
    try {
      const instance = new Worker(new URL("./terminal.worker.ts", import.meta.url), { type: "module" });
      worker.current = instance;
      instance.onmessage = (event: MessageEvent<TerminalResponse>) => {
        clearTimeout(timer.current);
        const message = event.data;
        if (message.type === "error") {
          fail(`Python error: ${message.message}\nCheck your connection and restart the session.`);
        } else if (message.type === "ready") {
          setCwd(message.cwd);
          setLines([{ text: "Kevin CLI is ready. Type help to see browser commands.", tone: "output" }]);
          setStatus("ready");
        } else {
          const result = message.result;
          setSuggestions(result.suggestions);
          setLines((previous): Line[] => {
            const next: Line[] = result.clear ? [] : [...previous];
            if (result.output) {
              next.push({ text: result.output, tone: result.failed ? "error" : "output" });
            }
            return next.slice(-150);
          });
          setCwd(result.cwd);
          setStatus(result.running ? "ready" : "ended");
        }
      };
      instance.onerror = (event) => {
        event.preventDefault();
        fail(`Worker error: ${event.message || "Unable to start Python."}`);
      };
      timer.current = setTimeout(() => fail("Python startup timed out. Check your connection and restart."), 120000);
      instance.postMessage({ type: "start" } satisfies TerminalRequest);
    } catch (error) {
      fail(`Unable to start: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  function execute(command: string) {
    const text = command.trim();
    if (!text || status !== "ready" || !worker.current) return;
    const line: Line = { text: `guest@browser ${cwd}> ${text}`, tone: "command" };
    setLines((previous) => [...previous, line].slice(-150));
    history.current.push(text);
    cursor.current = history.current.length;
    draft.current = "";
    setInput("");
    setSuggestions([]);
    setStatus("busy");
    timer.current = setTimeout(() => fail("Command exceeded 10 seconds and was stopped. Restart to continue."), 10000);
    worker.current.postMessage({ type: "execute", command: text } satisfies TerminalRequest);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    execute(input);
  }

  function recall(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    if (cursor.current === history.current.length) draft.current = input;
    cursor.current = Math.max(0, Math.min(
      history.current.length,
      cursor.current + (event.key === "ArrowUp" ? -1 : 1),
    ));
    setInput(history.current[cursor.current] ?? draft.current);
  }

  return (
    <div className="min-w-0 rounded-[28px] border border-white/10 bg-[#14110f] p-5 text-[#f4efe7] shadow-[0_32px_80px_rgba(20,17,15,0.24)]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <span className="font-mono text-sm text-[#7ce5c2]">Kevin CLI / browser</span>
        <span role="status" className="text-xs uppercase tracking-widest text-[#d8cfbf]">
          {status === "loading" ? "Loading Python..." : status === "busy" ? "Running..." : status}
        </span>
      </div>
      <p className="mb-4 text-sm leading-6 text-[#c8c0b2]">
        Real Python, same CLI engine. Files, aliases and history are temporary.
        No access to your computer&apos;s files or processes. First start downloads Python from a CDN.
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        <button type="button" onClick={start} className="rounded-full bg-[#7ce5c2] px-4 py-2 text-sm font-semibold text-[#14110f]">
          {status === "idle" ? "Start browser demo" : "Restart session"}
        </button>
        {status === "busy" && (
          <button type="button" onClick={() => fail("Command stopped. Restart to continue.")} className="rounded-full border border-white/20 px-4 py-2 text-sm">
            Stop command
          </button>
        )}
      </div>
      <div ref={outputRef} role="log" aria-label="Terminal output" aria-live="polite" tabIndex={0} className="h-72 overflow-auto rounded-xl bg-black/20 p-3 font-mono text-sm leading-6">
        {status === "idle" && <p className="text-[#c8c0b2]">Start the demo, then try a command below.</p>}
        {status === "loading" && <p className="text-[#c8c0b2]">Preparing Python and CLI modules. This can take a moment...</p>}
        {lines.map((line, index) => (
          <pre key={index} className={`whitespace-pre-wrap break-words ${line.tone === "command" ? "text-[#ffb084]" : line.tone === "error" ? "text-[#ff918a]" : "text-[#e6dfd3]"}`}>{line.text}</pre>
        ))}
      </div>
      {suggestions.length > 0 && (
        <div aria-label="Command corrections" className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => suggestion.available ? (
            <button type="button" key={suggestion.command} onClick={() => execute(suggestion.command)} disabled={status !== "ready"} className="rounded-lg border border-[#7ce5c2]/50 px-3 py-2 font-mono text-xs text-[#7ce5c2] disabled:opacity-40">
              Run {suggestion.command}
            </button>
          ) : (
            <a key={suggestion.command} href="#start" className="rounded-lg border border-white/20 px-3 py-2 text-xs text-[#ffb084]">
              Download desktop CLI for {suggestion.command}
            </a>
          ))}
        </div>
      )}
      <form onSubmit={submit} className="mt-4 flex gap-2">
        <label htmlFor="cli-command" className="sr-only">CLI command</label>
        <span aria-hidden="true" className="py-2 font-mono text-[#7ce5c2]">&gt;</span>
        <input ref={inputRef} id="cli-command" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={recall} disabled={status !== "ready"} autoComplete="off" autoCapitalize="off" spellCheck={false} maxLength={4000} placeholder="Type help, then press Enter" className="min-w-0 flex-1 rounded-lg border border-white/20 bg-black/20 px-3 py-2 font-mono text-sm text-white outline-none focus:border-[#7ce5c2] disabled:opacity-50" />
        <button type="submit" disabled={status !== "ready" || !input.trim()} className="rounded-lg border border-white/20 px-3 text-sm disabled:opacity-40">Run</button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {examples.map((command) => (
          <button type="button" key={command} onClick={() => execute(command)} disabled={status !== "ready"} className="rounded-lg border border-white/10 px-2 py-1 font-mono text-xs text-[#d8cfbf] hover:border-[#7ce5c2] disabled:opacity-40">{command}</button>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-[#c8c0b2]">Up / Down recalls commands. Restart resets everything. System, network and process commands require the desktop CLI.</p>
    </div>
  );
}
