import CLIDemo from "./CLIDemo";

const downloadUrl = `${import.meta.env.BASE_URL}downloads/kevin-cli-windows.exe`;

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
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(29,28,25,0.08)] bg-[rgba(255,250,242,0.82)] shadow-[0_10px_30px_rgba(45,35,22,0.08)]">
      <div className="grid gap-1.5">
        <span className="block h-1.5 w-6 rounded-full bg-[var(--accent)]" />
        <span className="block h-1.5 w-4 rounded-full bg-[var(--accent-2)]" />
        <span className="block h-1.5 w-5 rounded-full bg-[var(--accent-3)]" />
      </div>
    </div>
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
          <div className="flex items-center gap-4">
            <LogoMark />
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
                Python UX toolkit
              </p>
              <p
                className="text-2xl leading-none text-[var(--ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Py Terminal
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)] sm:justify-end">
            <a className="transition hover:text-[var(--ink)]" href="#features">
              Features
            </a>
            <a className="transition hover:text-[var(--ink)]" href="#workflow">
              Workflow
            </a>
            <a className="transition hover:text-[var(--ink)]" href="#start">
              Download
            </a>
            <a
              className="rounded-full border border-[rgba(29,28,25,0.08)] bg-[var(--ink)] px-5 py-2 text-[13px] font-semibold text-[var(--page)] transition hover:bg-[#2b241d]"
              href="#demo"
            >
              Open demo
            </a>
          </div>
        </nav>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-10">
        <section className="grid gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
          <div>
            <span className="inline-flex rounded-full border border-[rgba(29,28,25,0.08)] bg-[rgba(255,250,242,0.82)] px-4 py-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)] shadow-[0_12px_30px_rgba(45,35,22,0.06)]">
              Browser-native terminals for Python products
            </span>

            <h1
              className="mt-6 max-w-3xl text-5xl leading-[0.95] sm:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A web terminal that looks product-grade and behaves like an actual tool.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
              Try Kevin CLI right here in your browser, or download the standalone Windows app for the full
              developer toolkit. The same Python engine powers both experiences.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#d45d21]"
                href="#demo"
              >
                Try it in your browser
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-[rgba(29,28,25,0.1)] bg-[rgba(255,250,242,0.72)] px-7 py-4 text-sm font-semibold text-[var(--ink)] transition hover:bg-[rgba(255,255,255,0.92)]"
                href="#start"
              >
                Download for Windows
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Real Python via Pyodide",
                "Standalone Windows executable",
                "Temporary browser playground",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[rgba(29,28,25,0.08)] bg-[rgba(255,250,242,0.64)] px-4 py-3 text-sm text-[var(--muted)] shadow-[0_12px_30px_rgba(45,35,22,0.05)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div id="demo" className="space-y-4">
            <div className="glass-panel rounded-[32px] p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                    Interactive prototype
                  </p>
                  <p className="mt-1 text-xl font-semibold text-[var(--ink)]">
                    Your CLI, running in the browser
                  </p>
                </div>
                <div className="rounded-full border border-[rgba(29,28,25,0.08)] bg-white/50 px-3 py-1 text-xs font-medium text-[var(--muted)]">
                  Python / WebAssembly
                </div>
              </div>

              <CLIDemo />

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[rgba(29,28,25,0.08)] bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Execution</p>
                  <p className="mt-2 text-base font-semibold text-[var(--ink)]">Browser and desktop</p>
                </div>
                <div className="rounded-2xl border border-[rgba(29,28,25,0.08)] bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Filesystem</p>
                  <p className="mt-2 text-base font-semibold text-[var(--ink)]">Temporary browser files</p>
                </div>
                <div className="rounded-2xl border border-[rgba(29,28,25,0.08)] bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Command UX</p>
                  <p className="mt-2 text-base font-semibold text-[var(--ink)]">History, aliases, variables</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 py-8 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-panel rounded-[26px] px-6 py-5"
            >
              <p
                className="text-4xl text-[var(--ink)] sm:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        <section id="features" className="py-18 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
              Features
            </p>
            <h2
              className="mt-3 text-4xl leading-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Built for teams that want terminal power without shipping a terminal aesthetic from 2008.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featureCards.map((feature, index) => (
              <article
                key={feature.title}
                className="glass-panel rounded-[30px] p-7 transition hover:-translate-y-1"
              >
                <span className="inline-flex rounded-full bg-[rgba(29,28,25,0.06)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {feature.eyebrow}
                </span>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/75 text-sm font-semibold text-[var(--ink)]">
                    0{index + 1}
                  </div>
                  <h3 className="text-2xl font-semibold text-[var(--ink)]">{feature.title}</h3>
                </div>
                <p className="mt-5 text-base leading-8 text-[var(--muted)]">{feature.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="grid gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="glass-panel rounded-[32px] p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
              Workflow
            </p>
            <h2
              className="mt-4 text-4xl leading-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Design the shell once, then move it from prototype to production.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              The strongest terminal products do not stop at command execution. They frame actions, explain state,
              and make output reusable.
            </p>
          </div>

          <div className="space-y-4">
            {workflowSteps.map((step) => (
              <article key={step.id} className="glass-panel rounded-[28px] p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <span
                    className="text-4xl leading-none text-[var(--accent)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.id}
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold text-[var(--ink)]">{step.title}</h3>
                    <p className="mt-3 text-base leading-8 text-[var(--muted)]">{step.copy}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-18 sm:py-24">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
              Where it fits
            </p>
            <h2
              className="mt-3 text-4xl leading-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Useful in products, not only in developer demos.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {audienceCards.map((card) => (
              <article key={card.title} className="glass-panel rounded-[30px] p-7">
                <h3 className="text-2xl font-semibold text-[var(--ink)]">{card.title}</h3>
                <p className="mt-4 text-base leading-8 text-[var(--muted)]">{card.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="start" className="py-8">
          <div className="overflow-hidden rounded-[36px] border border-[rgba(29,28,25,0.08)] bg-[linear-gradient(135deg,#fff3e0_0%,#f6f0e6_52%,#ecfbf3_100%)] px-6 py-10 shadow-[0_28px_80px_rgba(44,35,22,0.10)] sm:px-10 sm:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
                  Desktop download
                </p>
                <h2
                  className="mt-3 max-w-2xl text-4xl leading-tight sm:text-5xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Keep the full toolkit on your Windows desktop.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                  Download Kevin CLI for Windows x64, then run the executable from PowerShell or Windows Terminal.
                  No Python installation required. This prototype build is unsigned, so Windows may display a SmartScreen warning.
                  Managed devices may block unsigned apps. Only run downloads you trust.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-[220px]">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-7 py-4 text-sm font-semibold text-[var(--page)] transition hover:bg-[#2b241d]"
                  href={__CLI_DOWNLOAD_AVAILABLE__ ? downloadUrl : undefined}
                  download={__CLI_DOWNLOAD_AVAILABLE__ ? "kevin-cli-windows.exe" : undefined}
                  aria-disabled={!__CLI_DOWNLOAD_AVAILABLE__}
                >
                  {__CLI_DOWNLOAD_AVAILABLE__ ? "Download Windows CLI (.exe)" : "Windows build not available"}
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(29,28,25,0.12)] bg-white/70 px-7 py-4 text-sm font-semibold text-[var(--ink)] transition hover:bg-white"
                  href="#demo"
                >
                  Try the browser demo
                </a>
                {__CLI_DOWNLOAD_AVAILABLE__ ? (
                  <a className="text-center text-sm underline" href={`${import.meta.env.BASE_URL}downloads/manifest.json`}>
                    Download size and SHA-256 checksum
                  </a>
                ) : (
                  <p className="text-sm text-[var(--muted)]">Build the Windows executable first; see the project README.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative mx-auto max-w-7xl px-6 py-10 text-sm text-[var(--muted)] sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 border-t border-[rgba(29,28,25,0.08)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Py Terminal. Browser-native command experiences.</p>
          <div className="flex flex-wrap gap-5">
            <a className="transition hover:text-[var(--ink)]" href="#features">
              Product
            </a>
            <a className="transition hover:text-[var(--ink)]" href="#workflow">
              Workflow
            </a>
            <a className="transition hover:text-[var(--ink)]" href="#start">
              Download
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
