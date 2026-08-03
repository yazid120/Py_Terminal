export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
      <header className="max-w-6xl mx-auto p-8">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold">Py Terminal</div>
          <div className="space-x-4">
            <a className="text-slate-300 hover:text-white" href="#features">Features</a>
            <a className="text-slate-300 hover:text-white" href="#demo">Demo</a>
            <a className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded">Get Started</a>
          </div>
        </nav>
      </header>
      <main className="max-w-6xl mx-auto p-8">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-extrabold mb-4">Modern Python terminal for the web</h1>
            <p className="text-lg text-slate-300 mb-6">Fast, embedded, and extensible terminal that runs Python in the browser or connects to your backend.</p>
            <div className="flex gap-3">
              <a className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-md font-medium">Try demo</a>
              <a className="border border-slate-600 px-6 py-3 rounded-md text-slate-200">Docs</a>
            </div>
          </div>
          <div id="demo" className="bg-slate-900 rounded-lg p-4 shadow-lg">
            <div className="bg-black text-green-400 font-mono p-4 rounded h-64 overflow-auto">
              <div>&gt;&nbsp;# Terminal demo placeholder</div>
              <div>&gt;&nbsp;print('Hello from Py Terminal')</div>
              <div className="mt-2 text-slate-400">Integrate Pyodide or real backend here.</div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Run in browser</h3>
            <p className="text-slate-400">Embed a full Python runtime with Pyodide for client-side demos.</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Secure backends</h3>
            <p className="text-slate-400">Connect to remote execution via websockets or REST for heavy workloads.</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Extensible</h3>
            <p className="text-slate-400">Plugin system to add commands, themes, and integrations.</p>
          </div>
        </section>
      </main>
      <footer className="max-w-6xl mx-auto p-8 text-slate-500">
        © {new Date().getFullYear()} Py Terminal
      </footer>
    </div>
  );
}
