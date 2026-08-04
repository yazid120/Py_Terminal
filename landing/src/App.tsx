import { useState, useEffect } from "react";

const CLIDemo = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const commands = [
      { prompt: "$ ", text: "teria --version" },
      { prompt: "", text: "Teria v1.0.0" },
      { prompt: "$ ", text: "teria run script.py" },
      { prompt: "", text: "Running Python script..." },
      { prompt: "", text: "✓ Execution complete in 0.23s" },
      { prompt: "$ ", text: "echo 'Welcome to Teria'" },
      { prompt: "", text: "Welcome to Teria" },
    ];

    let currentIndex = 0;
    let timeoutId: number | null = null;

    const interval = setInterval(() => {
      if (currentIndex < commands.length) {
        setLines((prev) => [
          ...prev,
          commands[currentIndex].prompt + commands[currentIndex].text,
        ]);
        currentIndex++;
      } else {
        clearInterval(interval);
        timeoutId = setTimeout(() => {
          setLines([]);
          currentIndex = 0;
        }, 4000);
      }
    }, 600);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="bg-black text-green-400 font-mono p-6 rounded-lg h-80 overflow-auto shadow-2xl border border-green-900">
      <div className="space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="text-sm leading-relaxed">
            {line}
          </div>
        ))}
        {lines.length > 0 && <span className="animate-pulse">▊</span>}
      </div>
    </div>
  );
};

const TeriaLogo = () => (
  <svg
    className="w-10 h-10"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" rx="8" fill="url(#gradient)" />
    <path
      d="M12 22L18 16L26 24M14 28H26"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
  </svg>
);

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="max-w-7xl mx-auto px-6 py-8 sm:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TeriaLogo />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
              Teria
            </span>
          </div>
          <div className="space-x-6">
            <a
              className="text-slate-400 hover:text-indigo-400 transition"
              href="#features"
            >
              Features
            </a>
            <a
              className="text-slate-400 hover:text-indigo-400 transition"
              href="#demo"
            >
              Demo
            </a>
            <a className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 px-4 py-2 rounded-lg font-medium transition">
              Get Started
            </a>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-8">
        <section className="grid md:grid-cols-2 gap-12 items-center py-16">
          <div>
            <h1 className="text-6xl font-extrabold mb-6 leading-tight">
              The terminal reimagined for the web
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Teria brings powerful terminal experiences to your browser. Execute commands, run Python scripts, and build interactive CLI applications—all without leaving the web.
            </p>
            <div className="flex gap-4">
              <a className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105">
                Try Demo
              </a>
              <a className="border-2 border-indigo-500 hover:bg-indigo-500 hover:bg-opacity-10 px-8 py-4 rounded-lg font-semibold transition">
                Documentation
              </a>
            </div>
          </div>

          <div id="demo" className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl opacity-20 blur-2xl"></div>
            <CLIDemo />
          </div>
        </section>

        <section id="features" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-16">
            Powerful features for modern development
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-slate-700 hover:border-indigo-500 transition">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Browser Runtime</h3>
              <p className="text-slate-400">
                Full Python runtime in the browser with Pyodide. No server required for instant demos and prototypes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition">
              <div className="w-12 h-12 bg-blue-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-xl">🔒</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Secure Backend</h3>
              <p className="text-slate-400">
                Connect to your backend servers via WebSockets or REST for scalable, secure command execution.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-slate-700 hover:border-purple-500 transition">
              <div className="w-12 h-12 bg-purple-500 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-xl">🧩</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Extensible</h3>
              <p className="text-slate-400">
                Plugin architecture for custom commands, themes, and integrations. Build exactly what you need.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-indigo-900 to-blue-900 rounded-2xl px-12 my-20">
          <h2 className="text-4xl font-bold text-center mb-4">Ready to build?</h2>
          <p className="text-xl text-slate-200 text-center mb-8">
            Start building interactive terminal experiences today.
          </p>
          <div className="flex justify-center">
            <a className="bg-white text-indigo-600 hover:bg-slate-100 px-8 py-4 rounded-lg font-bold transition transform hover:scale-105">
              Get Started Free
            </a>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-6 sm:px-8 py-12 text-slate-500 border-t border-slate-800">
        <div className="flex justify-between items-center">
          <p>© {new Date().getFullYear()} Teria. All rights reserved.</p>
          <div className="space-x-6">
            <a href="#" className="hover:text-slate-300 transition">
              GitHub
            </a>
            <a href="#" className="hover:text-slate-300 transition">
              Twitter
            </a>
            <a href="#" className="hover:text-slate-300 transition">
              Docs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
