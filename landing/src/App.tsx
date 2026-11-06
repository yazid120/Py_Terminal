import CLIDemo from "./CLIDemo";

const downloadUrl = `${import.meta.env.BASE_URL}downloads/kevin-cli-windows.exe`;
const __CLI_DOWNLOAD_AVAILABLE__ = false; // Set to true when build is available

const stats = [
  { value: "Python", label: "real browser execution" },
  { value: "2 modes", label: "browser and desktop" },
  { value: "1 engine", label: "shared CLI commands" },
  { value: "Windows", label: "standalone x64 download" },
];

const featureCards = [
  {
    eyebrow: "Browser runtime",
    title: "Prototype directly in the page",
    copy:
      "Try the existing Python CLI commands in a browser playground, with no backend or local installation.",
  },
  {
    eyebrow: "Desktop execution",
    title: "Download the full CLI for Windows",
    copy:
      "Run the standalone executable for system information, network tools, and access to your real filesystem. No Python installation needed.",
  },
  {
    eyebrow: "Command surface",
    title: "Package commands like product features",
    copy:
      "Expose file tools, developer helpers, or guided scripts as a cohesive CLI instead of a loose collection of buttons.",
  },
];

const workflowSteps = [
  {
    id: "01",
    title: "Define the shell contract",
    copy: "The browser reuses the desktop command engine and compatible command modules, rather than simulating their output.",
  },
  {
    id: "02",
    title: "Try commands in the playground",
    copy: "Run calculations, format JSON, generate UUIDs, and explore temporary files. Output appears when each command completes.",
  },
  {
    id: "03",
    title: "Take the CLI to your desktop",
    copy: "Download the Windows executable for the complete toolkit. Browser state is temporary; the desktop CLI saves its own history and settings.",
  },
];

const audienceCards = [
  {
    title: "Docs and learning",
    copy: "Turn static examples into runnable lessons with safe browser execution and guided prompts.",
  },
  {
    title: "Internal platforms",
    copy: "Give teams a friendly shell for scripts, deployment helpers, and support workflows without shipping a desktop app.",
  },
  {
    title: "Productized automation",
    copy: "Wrap complex backend actions in a terminal-shaped interface that feels fast, legible, and operator-ready.",
  },
];

function LogoMark() {
  return (
    <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none">
      {/* Terminal icon with neon aesthetic */}
      <rect x="8" y="8" width="32" height="32" rx="4" stroke="var(--accent)" strokeWidth="2" />
      {/* Cursor line */}
      <rect x="10" y="14" width="16" height="2" rx="1" fill="var(--accent)" />
      {/* Code brackets */}
      <path d="M 14 20 L 12 24 L 14 28" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" />
      <path d="M 34 20 L 36 24 L 34 28" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" />
      {/* Dot indicators */}
      <circle cx="18" cy="32" r="1.5" fill="var(--accent)" opacity="0.7" />
      <circle cx="24" cy="32" r="1.5" fill="var(--accent-secondary)" opacity="0.7" />
      <circle cx="30" cy="32" r="1.5" fill="var(--accent-tertiary)" opacity="0.7" />
      {/* Glow effect */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x="8" y="8" width="32" height="32" rx="4" stroke="var(--accent)" strokeWidth="1" opacity="0.3" filter="url(#glow)" />
    </svg>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden text-[var(--ink)]">
      <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(63,50,32,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(63,50,32,0.06)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none absolute left-[-6rem] top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(222,105,48,0.18)_0%,rgba(222,105,48,0)_72%)]" />
      <div className="pointer-events-none absolute right-[-4rem] top-36 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(21,117,109,0.14)_0%,rgba(21,117,109,0)_74%)]" />

      <header className="relative mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-10">
        <nav className="glass-panel flex flex-col gap-5 rounded-[28px] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <LogoMark />
            <div>
              <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-mono">
                {"> Cloud Python"}
              </p>
              <p
                className="text-2xl leading-none font-bold text-[var(--accent)] font-mono"
              >
                PyShell
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--ink-secondary)] sm:justify-end">
            <a className="transition hover:text-[var(--accent)]" href="#features">
              Features
            </a>
            <a className="transition hover:text-[var(--accent)]" href="#workflow">
              Workflow
            </a>
            <a className="transition hover:text-[var(--accent)]" href="#start">
              Download
            </a>
            <a
              className="rounded-lg border border-[var(--accent)] bg-[rgba(0,255,136,0.1)] px-5 py-2 text-xs font-semibold text-[var(--accent)] transition hover:bg-[rgba(0,255,136,0.2)] hover:shadow-[var(--shadow-glow)]"
              href="#demo"
            >
              Open Terminal
            </a>
          </div>
        </nav>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-10">
        <section className="grid gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
          <div>
            <span className="inline-flex rounded-lg border border-[var(--accent)] bg-[rgba(0,255,136,0.1)] px-4 py-2 text-xs uppercase tracking-widest text-[var(--accent)] font-mono shadow-[var(--shadow-glow)]">
              ▶ Run Python directly in your browser
            </span>

            <h1
              className="mt-6 max-w-3xl text-5xl leading-[0.95] sm:text-6xl lg:text-7xl font-bold text-[var(--ink)]"
            >
              Execute Real Python Code.<br/>
              <span className="text-[var(--accent)]">Instantly</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--ink-secondary)] sm:text-xl">
              PyShell brings a production-grade Python CLI to your browser. No installation required. Test commands, run scripts, and download the Windows desktop app for full system access.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-7 py-4 text-sm font-semibold text-[var(--page)] transition hover:bg-[#00e67e] hover:shadow-[var(--shadow-glow)]"
                href="#demo"
              >
                ▶ Try Terminal Now
              </a>
              <a
                className="inline-flex items-center justify-center rounded-lg border border-[var(--accent)] bg-[rgba(0,255,136,0.05)] px-7 py-4 text-sm font-semibold text-[var(--accent)] transition hover:bg-[rgba(0,255,136,0.15)] hover:shadow-[var(--shadow-glow)]"
                href="#start"
              >
                ↓ Download for Windows
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "✓ Real Python via Pyodide",
                "✓ Standalone Windows CLI",
                "✓ No installation needed",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-[var(--border-dark)] bg-[rgba(0,255,136,0.08)] px-4 py-3 text-sm text-[var(--ink-secondary)] hover:border-[var(--accent)] transition"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div id="demo" className="space-y-4">
            <div className="glass-panel rounded-lg p-6 sm:p-8 border border-[var(--accent)]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-mono">
                    {"> Interactive Terminal"}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-[var(--ink)]">
                    Python CLI in Your Browser
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--accent)] bg-[rgba(0,255,136,0.1)] px-3 py-1 text-xs font-semibold text-[var(--accent)] font-mono">
                  Python / WASM
                </div>
              </div>

              <CLIDemo />

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-[var(--border-dark)] bg-[rgba(0,255,136,0.08)] p-4 hover:border-[var(--accent)] transition">
                  <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-mono">Execution</p>
                  <p className="mt-2 text-base font-semibold text-[var(--ink)]">Browser & Desktop</p>
                </div>
                <div className="rounded-lg border border-[var(--border-dark)] bg-[rgba(0,255,136,0.08)] p-4 hover:border-[var(--accent)] transition">
                  <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-mono">Filesystem</p>
                  <p className="mt-2 text-base font-semibold text-[var(--ink)]">Temp Browser Files</p>
                </div>
                <div className="rounded-lg border border-[var(--border-dark)] bg-[rgba(0,255,136,0.08)] p-4 hover:border-[var(--accent)] transition">
                  <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-mono">Command UX</p>
                  <p className="mt-2 text-base font-semibold text-[var(--ink)]">History, Aliases, Vars</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 py-8 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-panel rounded-lg px-6 py-5 hover:border-[var(--accent)] transition hover:shadow-[var(--shadow-glow)]"
            >
              <p
                className="text-4xl text-[var(--accent)] sm:text-5xl font-bold font-mono"
              >
                {stat.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-[var(--ink-secondary)]">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        <section id="features" className="py-18 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-mono">
              ◆ Features
            </p>
            <h2
              className="mt-3 text-4xl leading-tight sm:text-5xl font-bold text-[var(--ink)]"
            >
              Everything you need for a production CLI.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featureCards.map((feature, index) => (
              <article
                key={feature.title}
                className="glass-panel rounded-lg p-7 transition hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[var(--shadow-glow)]"
              >
                <span className="inline-flex rounded-lg bg-[rgba(0,255,136,0.1)] px-3 py-1 text-xs uppercase tracking-widest text-[var(--accent)] font-mono">
                  {feature.eyebrow}
                </span>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(0,255,136,0.1)] border border-[var(--accent)] text-sm font-semibold text-[var(--accent)] font-mono">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-semibold text-[var(--ink)]">{feature.title}</h3>
                </div>
                <p className="mt-5 text-base leading-8 text-[var(--ink-secondary)]">{feature.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="grid gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="glass-panel rounded-lg p-8 sm:p-10 border border-[var(--accent)]">
            <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-mono">
              ▶ Workflow
            </p>
            <h2
              className="mt-4 text-4xl leading-tight sm:text-5xl font-bold text-[var(--ink)]"
            >
              From Browser Prototype to Desktop Power.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--ink-secondary)]">
              PyShell lets you design the shell once. Try it in the browser. Then deploy the same CLI to Windows desktop for full system access.
            </p>
          </div>

          <div className="space-y-4">
            {workflowSteps.map((step) => (
              <article key={step.id} className="glass-panel rounded-lg p-6 sm:p-7 border border-[var(--border-dark)] hover:border-[var(--accent)] transition">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <span
                    className="text-4xl leading-none text-[var(--accent)] font-mono font-bold"
                  >
                    {step.id}
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold text-[var(--ink)]">{step.title}</h3>
                    <p className="mt-3 text-base leading-8 text-[var(--ink-secondary)]">{step.copy}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-18 sm:py-24">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-mono">
              ◆ Use Cases
            </p>
            <h2
              className="mt-3 text-4xl leading-tight sm:text-5xl font-bold text-[var(--ink)]"
            >
              Built for real-world applications.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {audienceCards.map((card) => (
              <article key={card.title} className="glass-panel rounded-lg p-7 border border-[var(--border-dark)] hover:border-[var(--accent)] transition hover:shadow-[var(--shadow-glow)]">
                <h3 className="text-2xl font-semibold text-[var(--ink)]">{card.title}</h3>
                <p className="mt-4 text-base leading-8 text-[var(--ink-secondary)]">{card.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="start" className="py-8">
          <div className="overflow-hidden rounded-lg border border-[var(--accent)] bg-[linear-gradient(135deg,rgba(0,255,136,0.05)_0%,rgba(0,217,255,0.03)_100%)] px-6 py-10 shadow-[var(--shadow-glow)] sm:px-10 sm:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-mono">
                  ↓ Download
                </p>
                <h2
                  className="mt-3 max-w-2xl text-4xl leading-tight sm:text-5xl font-bold text-[var(--ink)]"
                >
                  Get PyShell for Windows.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--ink-secondary)]">
                  Download PyShell for Windows x64 and run it from PowerShell or Terminal.
                  No Python installation required. Execute commands directly on your system with full filesystem access.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-[220px]">
                <a
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-7 py-4 text-sm font-semibold text-[var(--page)] transition hover:bg-[#00e67e] hover:shadow-[var(--shadow-glow)]"
                  href={__CLI_DOWNLOAD_AVAILABLE__ ? downloadUrl : undefined}
                  download={__CLI_DOWNLOAD_AVAILABLE__ ? "pyshell-windows.exe" : undefined}
                  aria-disabled={!__CLI_DOWNLOAD_AVAILABLE__}
                >
                  {__CLI_DOWNLOAD_AVAILABLE__ ? "↓ Download (.exe)" : "Build in progress..."}
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-lg border border-[var(--accent)] bg-[rgba(0,255,136,0.08)] px-7 py-4 text-sm font-semibold text-[var(--accent)] transition hover:bg-[rgba(0,255,136,0.15)] hover:shadow-[var(--shadow-glow)]"
                  href="#demo"
                >
                  ▶ Try Browser Demo
                </a>
                {__CLI_DOWNLOAD_AVAILABLE__ ? (
                  <a className="text-center text-sm text-[var(--accent)] hover:underline" href={`${import.meta.env.BASE_URL}downloads/manifest.json`}>
                    SHA-256 & Details
                  </a>
                ) : (
                  <p className="text-sm text-[var(--ink-secondary)]">See project README to build locally.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative mx-auto max-w-7xl px-6 py-10 text-sm text-[var(--ink-secondary)] sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 border-t border-[var(--border-dark)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PyShell. <span className="text-[var(--accent)]">▶</span> Cloud Python in your browser.</p>
          <div className="flex flex-wrap gap-5">
            <a className="transition hover:text-[var(--accent)]" href="#features">
              Features
            </a>
            <a className="transition hover:text-[var(--accent)]" href="#workflow">
              Workflow
            </a>
            <a className="transition hover:text-[var(--accent)]" href="#start">
              Download
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
