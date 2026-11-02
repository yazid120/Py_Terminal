var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n)),l=(e=>typeof require<`u`?require:typeof Proxy<`u`?new Proxy(e,{get:(e,t)=>(typeof require<`u`?require:e)[t]}):e)(function(e){if(typeof require<`u`)return require.apply(this,arguments);throw Error('Calling `require` for "'+e+"\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.")}),u=Object.defineProperty,d=(e,t)=>u(e,`name`,{value:t,configurable:!0}),f=(e=>typeof l<`u`?l:typeof Proxy<`u`?new Proxy(e,{get:(e,t)=>(typeof l<`u`?l:e)[t]}):e)(function(e){if(typeof l<`u`)return l.apply(this,arguments);throw Error(`Dynamic require of "`+e+`" is not supported`)});function p(e){return!isNaN(parseFloat(e))&&isFinite(e)}d(p,`_isNumber`);function m(e){return e.charAt(0).toUpperCase()+e.substring(1)}d(m,`_capitalize`);function h(e){return function(){return this[e]}}d(h,`_getter`);var g=[`isConstructor`,`isEval`,`isNative`,`isToplevel`],_=[`columnNumber`,`lineNumber`],v=[`fileName`,`functionName`,`source`],y=g.concat(_,v,[`args`],[`evalOrigin`]);function b(e){if(e)for(var t=0;t<y.length;t++)e[y[t]]!==void 0&&this[`set`+m(y[t])](e[y[t]])}for(d(b,`StackFrame`),b.prototype={getArgs:function(){return this.args},setArgs:function(e){if(Object.prototype.toString.call(e)!==`[object Array]`)throw TypeError(`Args must be an Array`);this.args=e},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(e){if(e instanceof b)this.evalOrigin=e;else if(e instanceof Object)this.evalOrigin=new b(e);else throw TypeError(`Eval Origin must be an Object or StackFrame`)},toString:function(){var e=this.getFileName()||``,t=this.getLineNumber()||``,n=this.getColumnNumber()||``,r=this.getFunctionName()||``;return this.getIsEval()?e?`[eval] (`+e+`:`+t+`:`+n+`)`:`[eval]:`+t+`:`+n:r?r+` (`+e+`:`+t+`:`+n+`)`:e+`:`+t+`:`+n}},b.fromString=d(function(e){var t=e.indexOf(`(`),n=e.lastIndexOf(`)`),r=e.substring(0,t),i=e.substring(t+1,n).split(`,`),a=e.substring(n+1);if(a.indexOf(`@`)===0)var o=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(a,``),s=o[1],c=o[2],l=o[3];return new b({functionName:r,args:i||void 0,fileName:s,lineNumber:c||void 0,columnNumber:l||void 0})},`StackFrame$$fromString`),x=0;x<g.length;x++)b.prototype[`get`+m(g[x])]=h(g[x]),b.prototype[`set`+m(g[x])]=function(e){return function(t){this[e]=!!t}}(g[x]);var x;for(S=0;S<_.length;S++)b.prototype[`get`+m(_[S])]=h(_[S]),b.prototype[`set`+m(_[S])]=function(e){return function(t){if(!p(t))throw TypeError(e+` must be a Number`);this[e]=Number(t)}}(_[S]);var S;for(C=0;C<v.length;C++)b.prototype[`get`+m(v[C])]=h(v[C]),b.prototype[`set`+m(v[C])]=function(e){return function(t){this[e]=String(t)}}(v[C]);var C,w=b;function T(){var e=/^\s*at .*(\S+:\d+|\(native\))/m,t=/^(eval@)?(\[native code])?$/;return{parse:d(function(t){if(t.stack&&t.stack.match(e))return this.parseV8OrIE(t);if(t.stack)return this.parseFFOrSafari(t);throw Error(`Cannot parse given Error object`)},`ErrorStackParser$$parse`),extractLocation:d(function(e){if(e.indexOf(`:`)===-1)return[e];var t=/(.+?)(?::(\d+))?(?::(\d+))?$/.exec(e.replace(/[()]/g,``));return[t[1],t[2]||void 0,t[3]||void 0]},`ErrorStackParser$$extractLocation`),parseV8OrIE:d(function(t){return t.stack.split(`
`).filter(function(t){return!!t.match(e)},this).map(function(e){e.indexOf(`(eval `)>-1&&(e=e.replace(/eval code/g,`eval`).replace(/(\(eval at [^()]*)|(,.*$)/g,``));var t=e.replace(/^\s+/,``).replace(/\(eval code/g,`(`).replace(/^.*?\s+/,``),n=t.match(/ (\(.+\)$)/);t=n?t.replace(n[0],``):t;var r=this.extractLocation(n?n[1]:t);return new w({functionName:n&&t||void 0,fileName:[`eval`,`<anonymous>`].indexOf(r[0])>-1?void 0:r[0],lineNumber:r[1],columnNumber:r[2],source:e})},this)},`ErrorStackParser$$parseV8OrIE`),parseFFOrSafari:d(function(e){return e.stack.split(`
`).filter(function(e){return!e.match(t)},this).map(function(e){if(e.indexOf(` > eval`)>-1&&(e=e.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,`:$1`)),e.indexOf(`@`)===-1&&e.indexOf(`:`)===-1)return new w({functionName:e});var t=/((.*".+"[^@]*)?[^@]*)(?:@)/,n=e.match(t),r=n&&n[1]?n[1]:void 0,i=this.extractLocation(e.replace(t,``));return new w({functionName:r,fileName:i[0],lineNumber:i[1],columnNumber:i[2],source:e})},this)},`ErrorStackParser$$parseFFOrSafari`)}}d(T,`ErrorStackParser`);var ee=new T,E=typeof process==`object`&&typeof process.versions==`object`&&typeof process.versions.node==`string`&&!process.browser,D=E&&typeof module<`u`&&typeof module.exports<`u`&&typeof f<`u`&&typeof __dirname<`u`,te=E&&!D;globalThis.Bun;var ne=!E&&!(typeof Deno<`u`),re=ne&&typeof window==`object`&&typeof document==`object`&&typeof document.createElement==`function`&&`sessionStorage`in window&&typeof importScripts!=`function`,ie=ne&&typeof importScripts==`function`&&typeof self==`object`;typeof navigator==`object`&&typeof navigator.userAgent==`string`&&navigator.userAgent.indexOf(`Chrome`)==-1&&navigator.userAgent.indexOf(`Safari`);var O,k,A,j,M;async function N(){if(!E||(O=(await import(`./__vite-browser-external-UUvVqkV7.js`).then(e=>c(e.default,1))).default,j=await import(`./__vite-browser-external-UUvVqkV7.js`).then(e=>c(e.default,1)),M=await import(`./__vite-browser-external-UUvVqkV7.js`).then(e=>c(e.default,1)),A=(await import(`./__vite-browser-external-UUvVqkV7.js`).then(e=>c(e.default,1))).default,k=await import(`./__vite-browser-external-UUvVqkV7.js`).then(e=>c(e.default,1)),I=k.sep,typeof f<`u`))return;let e={fs:j,crypto:await import(`./__vite-browser-external-UUvVqkV7.js`).then(e=>c(e.default,1)),ws:await import(`./__vite-browser-external-UUvVqkV7.js`).then(e=>c(e.default,1)),child_process:await import(`./__vite-browser-external-UUvVqkV7.js`).then(e=>c(e.default,1))};globalThis.require=function(t){return e[t]}}d(N,`initNodeModules`);function P(e,t){return k.resolve(t||`.`,e)}d(P,`node_resolvePath`);function F(e,t){return t===void 0&&(t=location),new URL(e,t).toString()}d(F,`browser_resolvePath`);var ae=E?P:F,I;E||(I=`/`);function L(e,t){return e.startsWith(`file://`)&&(e=e.slice(7)),e.includes(`://`)?{response:fetch(e)}:{binary:M.readFile(e).then(e=>new Uint8Array(e.buffer,e.byteOffset,e.byteLength))}}d(L,`node_getBinaryResponse`);function R(e,t){let n=new URL(e,location);return{response:fetch(n,t?{integrity:t}:{})}}d(R,`browser_getBinaryResponse`);var z=E?L:R;async function B(e,t){let{response:n,binary:r}=z(e,t);if(r)return r;let i=await n;if(!i.ok)throw Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await i.arrayBuffer())}d(B,`loadBinaryFile`);var V;if(re)V=d(async e=>await import(e),`loadScript`);else if(ie)V=d(async e=>{try{globalThis.importScripts(e)}catch(t){if(t instanceof TypeError)await import(e);else throw t}},`loadScript`);else if(E)V=H;else throw Error(`Cannot determine runtime environment`);async function H(e){e.startsWith(`file://`)&&(e=e.slice(7)),e.includes(`://`)?A.runInThisContext(await(await fetch(e)).text()):await import(O.pathToFileURL(e).href)}d(H,`nodeLoadScript`);async function U(e){if(E){await N();let t=await M.readFile(e,{encoding:`utf8`});return JSON.parse(t)}return await(await fetch(e)).json()}d(U,`loadLockFile`);async function W(){if(D)return __dirname;let e;try{throw Error()}catch(t){e=t}let t=ee.parse(e)[0].fileName;if(E&&!t.startsWith(`file://`)&&(t=`file://${t}`),te){let e=await import(`./__vite-browser-external-UUvVqkV7.js`).then(e=>c(e.default,1));return(await import(`./__vite-browser-external-UUvVqkV7.js`).then(e=>c(e.default,1))).fileURLToPath(e.dirname(t))}let n=t.lastIndexOf(I);if(n===-1)throw Error(`Could not extract indexURL path from pyodide module location`);return t.slice(0,n)}d(W,`calculateDirname`);function G(e){let t=e.FS,n=e.FS.filesystems.MEMFS,r=e.PATH,i={DIR_MODE:16895,FILE_MODE:33279,mount:function(e){if(!e.opts.fileSystemHandle)throw Error(`opts.fileSystemHandle is required`);return n.mount.apply(null,arguments)},syncfs:async(e,t,n)=>{try{let r=i.getLocalSet(e),a=await i.getRemoteSet(e),o=t?a:r,s=t?r:a;await i.reconcile(e,o,s),n(null)}catch(e){n(e)}},getLocalSet:e=>{let n=Object.create(null);function i(e){return e!==`.`&&e!==`..`}d(i,`isRealDir`);function a(e){return t=>r.join2(e,t)}d(a,`toAbsolute`);let o=t.readdir(e.mountpoint).filter(i).map(a(e.mountpoint));for(;o.length;){let e=o.pop(),r=t.stat(e);t.isDir(r.mode)&&o.push.apply(o,t.readdir(e).filter(i).map(a(e))),n[e]={timestamp:r.mtime,mode:r.mode}}return{type:`local`,entries:n}},getRemoteSet:async e=>{let t=Object.create(null),n=await oe(e.opts.fileSystemHandle);for(let[a,o]of n)a!==`.`&&(t[r.join2(e.mountpoint,a)]={timestamp:o.kind===`file`?new Date((await o.getFile()).lastModified):new Date,mode:o.kind===`file`?i.FILE_MODE:i.DIR_MODE});return{type:`remote`,entries:t,handles:n}},loadLocalEntry:e=>{let r=t.lookupPath(e).node,i=t.stat(e);if(t.isDir(i.mode))return{timestamp:i.mtime,mode:i.mode};if(t.isFile(i.mode))return r.contents=n.getFileDataAsTypedArray(r),{timestamp:i.mtime,mode:i.mode,contents:r.contents};throw Error(`node type not supported`)},storeLocalEntry:(e,n)=>{if(t.isDir(n.mode))t.mkdirTree(e,n.mode);else if(t.isFile(n.mode))t.writeFile(e,n.contents,{canOwn:!0});else throw Error(`node type not supported`);t.chmod(e,n.mode),t.utime(e,n.timestamp,n.timestamp)},removeLocalEntry:e=>{var n=t.stat(e);t.isDir(n.mode)?t.rmdir(e):t.isFile(n.mode)&&t.unlink(e)},loadRemoteEntry:async e=>{if(e.kind===`file`){let t=await e.getFile();return{contents:new Uint8Array(await t.arrayBuffer()),mode:i.FILE_MODE,timestamp:new Date(t.lastModified)}}if(e.kind===`directory`)return{mode:i.DIR_MODE,timestamp:new Date};throw Error(`unknown kind: `+e.kind)},storeRemoteEntry:async(e,n,i)=>{let a=e.get(r.dirname(n)),o=t.isFile(i.mode)?await a.getFileHandle(r.basename(n),{create:!0}):await a.getDirectoryHandle(r.basename(n),{create:!0});if(o.kind===`file`){let e=await o.createWritable();await e.write(i.contents),await e.close()}e.set(n,o)},removeRemoteEntry:async(e,t)=>{await e.get(r.dirname(t)).removeEntry(r.basename(t)),e.delete(t)},reconcile:async(e,n,a)=>{let o=0,s=[];Object.keys(n.entries).forEach(function(e){let r=n.entries[e],i=a.entries[e];(!i||t.isFile(r.mode)&&r.timestamp.getTime()>i.timestamp.getTime())&&(s.push(e),o++)}),s.sort();let c=[];if(Object.keys(a.entries).forEach(function(e){n.entries[e]||(c.push(e),o++)}),c.sort().reverse(),!o)return;let l=n.type===`remote`?n.handles:a.handles;for(let t of s){let n=r.normalize(t.replace(e.mountpoint,`/`)).substring(1);if(a.type===`local`){let e=l.get(n),r=await i.loadRemoteEntry(e);i.storeLocalEntry(t,r)}else{let e=i.loadLocalEntry(t);await i.storeRemoteEntry(l,n,e)}}for(let t of c)if(a.type===`local`)i.removeLocalEntry(t);else{let n=r.normalize(t.replace(e.mountpoint,`/`)).substring(1);await i.removeRemoteEntry(l,n)}}};e.FS.filesystems.NATIVEFS_ASYNC=i}d(G,`initializeNativeFS`);var oe=d(async e=>{let t=[];async function n(e){for await(let r of e.values())t.push(r),r.kind===`directory`&&await n(r)}d(n,`collect`),await n(e);let r=new Map;r.set(`.`,e);for(let n of t){let t=(await e.resolve(n)).join(`/`);r.set(t,n)}return r},`getFsHandles`);function K(e){let t={noImageDecoding:!0,noAudioDecoding:!0,noWasmDecoding:!1,preRun:Z(e),quit(e,n){throw t.exited={status:e,toThrow:n},n},print:e.stdout,printErr:e.stderr,thisProgram:e._sysExecutable,arguments:e.args,API:{config:e},locateFile:t=>e.indexURL+t,instantiateWasm:se(e.indexURL)};return t}d(K,`createSettings`);function q(e){return function(t){try{t.FS.mkdirTree(e)}catch(t){console.error(`Error occurred while making a home directory '${e}':`),console.error(t),console.error(`Using '/' for a home directory instead`),e=`/`}t.FS.chdir(e)}}d(q,`createHomeDirectory`);function J(e){return function(t){Object.assign(t.ENV,e)}}d(J,`setEnvironment`);function Y(e){return e?[async t=>{t.addRunDependency(`fsInitHook`);try{await e(t.FS,{sitePackages:t.API.sitePackages})}finally{t.removeRunDependency(`fsInitHook`)}}]:[]}d(Y,`callFsInitHook`);function X(e){let t=B(e);return async e=>{let n=e._py_version_major(),r=e._py_version_minor();e.FS.mkdirTree(`/lib`),e.API.sitePackages=`/lib/python${n}.${r}/site-packages`,e.FS.mkdirTree(e.API.sitePackages),e.addRunDependency(`install-stdlib`);try{let i=await t;e.FS.writeFile(`/lib/python${n}${r}.zip`,i)}catch(e){console.error(`Error occurred while installing the standard library:`),console.error(e)}finally{e.removeRunDependency(`install-stdlib`)}}}d(X,`installStdlib`);function Z(e){let t;return t=e.stdLibURL==null?e.indexURL+`python_stdlib.zip`:e.stdLibURL,[...Y(e.fsInit),X(t),q(e.env.HOME),J(e.env),G]}d(Z,`getFileSystemInitializationFuncs`);function se(e){if(typeof WasmOffsetConverter<`u`)return;let{binary:t,response:n}=z(e+`pyodide.asm.wasm`);return function(e,r){return async function(){try{let i;i=n?await WebAssembly.instantiateStreaming(n,e):await WebAssembly.instantiate(await t,e);let{instance:a,module:o}=i;r(a,o)}catch(e){console.warn(`wasm instantiation failed!`),console.warn(e)}}(),{}}}d(se,`getInstantiateWasmFunc`);var ce=`0.27.7`;async function le(e={}){var t,n;await N();let r=e.indexURL||await W();r=ae(r),r.endsWith(`/`)||(r+=`/`),e.indexURL=r;let i={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:r+`pyodide-lock.json`,args:[],env:{},packageCacheDir:r,packages:[],enableRunUntilComplete:!0,checkAPIVersion:!0,BUILD_ID:`e94377f5ce7dcf67e0417b69a0016733c2cfb6b4622ee8c490a6f17eb58e863b`},a=Object.assign(i,e);(t=a.env).HOME??(t.HOME=`/home/pyodide`),(n=a.env).PYTHONINSPECT??(n.PYTHONINSPECT=`1`);let o=K(a),s=o.API;if(s.lockFilePromise=U(a.lockFileURL),typeof _createPyodideModule!=`function`){let e=`${a.indexURL}pyodide.asm.js`;await V(e)}let c;if(e._loadSnapshot){let t=await e._loadSnapshot;c=ArrayBuffer.isView(t)?t:new Uint8Array(t),o.noInitialRun=!0,o.INITIAL_MEMORY=c.length}let l=await _createPyodideModule(o);if(o.exited)throw o.exited.toThrow;if(e.pyproxyToStringRepr&&s.setPyProxyToStringMethod(!0),s.version!==`0.27.7`&&a.checkAPIVersion)throw Error(`Pyodide version does not match: '${ce}' <==> '${s.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);l.locateFile=e=>{throw Error(`Didn't expect to load any more file_packager files!`)};let u;c&&(u=s.restoreSnapshot(c));let d=s.finalizeBootstrap(u,e._snapshotDeserializer);return s.sys.path.insert(0,``),d.version.includes(`dev`)||s.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${d.version}/full/`),s._pyodide.set_excepthook(),await s.packageIndexReady,s.initializeStreams(a.stdin,a.stdout,a.stderr),d}d(le,`loadPyodide`);const ue={"context.py":`"""\r
Shell Context — persistent session state.\r
\r
Holds all mutable state for the REPL session:\r
cwd, env vars, aliases, history, variables, config, git info, etc.\r
"""\r
\r
from __future__ import annotations\r
\r
import os\r
import getpass\r
import platform\r
import socket\r
import subprocess\r
from dataclasses import dataclass, field\r
from typing import Any\r
\r
\r
@dataclass\r
class ShellContext:\r
    """Persistent shell state for the entire REPL session."""\r
\r
    # Filesystem\r
    cwd: str = field(default_factory=os.getcwd)\r
\r
    # Identity\r
    username: str = field(default_factory=getpass.getuser)\r
    hostname: str = field(default_factory=socket.gethostname)\r
\r
    # Shell variables (user-defined, e.g. name=Kevin)\r
    variables: dict[str, str] = field(default_factory=dict)\r
\r
    # Environment variables (copy of os.environ at startup)\r
    env_vars: dict[str, str] = field(default_factory=lambda: dict(os.environ))\r
\r
    # Aliases (e.g. ll -> ls)\r
    aliases: dict[str, str] = field(default_factory=dict)\r
\r
    # Command history (list of raw input strings)\r
    history: list[str] = field(default_factory=list)\r
\r
    # Prompt template\r
    prompt_template: str = "{username}@{hostname} {cwd_short} {git_branch}> "\r
\r
    # Active theme name\r
    active_theme: str = "default"\r
\r
    # Git info (refreshed per prompt)\r
    git_branch: str = ""\r
\r
    # Running flag\r
    running: bool = True\r
\r
    # ---- helpers ----\r
\r
    @property\r
    def cwd_short(self) -> str:\r
        """Return cwd with home dir replaced by ~."""\r
        home = os.path.expanduser("~")\r
        if self.cwd.startswith(home):\r
            return "~" + self.cwd[len(home):].replace("\\\\", "/")\r
        return self.cwd.replace("\\\\", "/")\r
\r
    def refresh_git_branch(self) -> None:\r
        """Detect current git branch (if inside a repo)."""\r
        try:\r
            result = subprocess.run(\r
                ["git", "rev-parse", "--abbrev-ref", "HEAD"],\r
                capture_output=True,\r
                text=True,\r
                cwd=self.cwd,\r
                timeout=2,\r
            )\r
            if result.returncode == 0:\r
                self.git_branch = result.stdout.strip()\r
            else:\r
                self.git_branch = ""\r
        except Exception:\r
            self.git_branch = ""\r
\r
    def expand_variables(self, text: str) -> str:\r
        """Expand $variable references in text."""\r
        for var_name, var_value in self.variables.items():\r
            text = text.replace(f"\${var_name}", var_value)\r
        # Also expand env vars\r
        for var_name, var_value in self.env_vars.items():\r
            text = text.replace(f"\${var_name}", var_value)\r
        return text\r
\r
    def build_prompt(self) -> str:\r
        """Build the prompt string from the template."""\r
        git_part = f"({self.git_branch}) " if self.git_branch else ""\r
        return self.prompt_template.format(\r
            username=self.username,\r
            hostname=self.hostname,\r
            cwd_short=self.cwd_short,\r
            git_branch=git_part,\r
        )\r
`,"engine.py":`"""\r
Command Engine — core execution engine.\r
\r
Parses raw user input, resolves aliases, looks up commands,\r
and dispatches to command handlers.  Zero Click dependency.\r
"""\r
\r
from __future__ import annotations\r
\r
import shlex\r
from difflib import get_close_matches\r
from dataclasses import dataclass, field\r
from typing import Any, Callable, Optional\r
\r
from context import ShellContext\r
\r
\r
@dataclass\r
class CommandArg:\r
    """Describes a single argument a command accepts."""\r
    name: str\r
    description: str = ""\r
    required: bool = False\r
    default: Any = None\r
\r
\r
@dataclass\r
class Command:\r
    """A registered command."""\r
    name: str\r
    description: str = ""\r
    usage: str = ""\r
    category: str = "general"\r
    handler: Callable[..., Optional[str]] = lambda ctx, args: None\r
\r
\r
class CommandEngine:\r
    """Register, resolve, and execute commands."""\r
\r
    def __init__(self) -> None:\r
        self._commands: dict[str, Command] = {}\r
\r
    # ---- registration ----\r
\r
    def register(self, command: Command) -> None:\r
        """Register a command by name."""\r
        self._commands[command.name] = command\r
\r
    def unregister(self, name: str) -> None:\r
        """Remove a command by name."""\r
        self._commands.pop(name, None)\r
\r
    # ---- lookup ----\r
\r
    def get_command(self, name: str) -> Optional[Command]:\r
        """Look up a command by name."""\r
        return self._commands.get(name)\r
\r
    def list_commands(self) -> list[Command]:\r
        """Return all registered commands, sorted by name."""\r
        return sorted(self._commands.values(), key=lambda c: c.name)\r
\r
    def list_command_names(self) -> list[str]:\r
        """Return sorted list of command names (for autocomplete)."""\r
        return sorted(self._commands.keys())\r
\r
    def suggest_commands(\r
        self, name: str, ctx: ShellContext, extra_names: tuple[str, ...] = (),\r
    ) -> list[str]:\r
        """Find likely command typos without executing a correction."""\r
        candidates = sorted(set(self._commands) | set(ctx.aliases) | set(extra_names))\r
        return get_close_matches(name, candidates, n=3, cutoff=0.65)\r
\r
    # ---- execution ----\r
\r
    def execute(self, raw_input: str, ctx: ShellContext) -> Optional[str]:\r
        """\r
        Parse *raw_input*, resolve aliases, expand variables,\r
        look up the command, and call its handler.\r
\r
        Returns the handler's return value (usually None,\r
        or a string for future pipeline support).\r
        """\r
        if not raw_input or not raw_input.strip():\r
            return None\r
\r
        # 1. Expand variables ($name -> value)\r
        expanded = ctx.expand_variables(raw_input.strip())\r
\r
        # 2. Handle variable assignment  (name=value)\r
        if "=" in expanded and not expanded.startswith("="):\r
            parts = expanded.split("=", 1)\r
            potential_name = parts[0].strip()\r
            # Only treat as assignment if lhs looks like a simple identifier\r
            if potential_name.isidentifier() and potential_name not in self._commands:\r
                ctx.variables[potential_name] = parts[1].strip()\r
                return None\r
\r
        # 3. Resolve aliases (recursively, up to 10 levels to prevent loops)\r
        expanded = self._resolve_aliases(expanded, ctx, depth=0)\r
\r
        # 4. Tokenize\r
        try:\r
            tokens = shlex.split(expanded)\r
        except ValueError:\r
            tokens = expanded.split()\r
\r
        if not tokens:\r
            return None\r
\r
        cmd_name = tokens[0]\r
        args = tokens[1:]\r
\r
        # 5. Look up command\r
        command = self.get_command(cmd_name)\r
        if command is None:\r
            raise CommandNotFoundError(cmd_name, self.suggest_commands(cmd_name, ctx), args)\r
\r
        # 6. Execute handler\r
        return command.handler(ctx, args)\r
\r
    # ---- alias resolution (private) ----\r
\r
    def _resolve_aliases(self, text: str, ctx: ShellContext, depth: int) -> str:\r
        """Recursively expand the first word if it's an alias."""\r
        if depth > 10:\r
            return text\r
\r
        try:\r
            tokens = shlex.split(text)\r
        except ValueError:\r
            tokens = text.split()\r
\r
        if not tokens:\r
            return text\r
\r
        first = tokens[0]\r
        if first in ctx.aliases:\r
            replacement = ctx.aliases[first]\r
            rest = " ".join(tokens[1:])\r
            new_text = f"{replacement} {rest}".strip()\r
            return self._resolve_aliases(new_text, ctx, depth + 1)\r
\r
        return text\r
\r
\r
class CommandNotFoundError(Exception):\r
    """Raised when a command name is not registered."""\r
\r
    def __init__(\r
        self, name: str, suggestions: Optional[list[str]] = None,\r
        command_args: Optional[list[str]] = None,\r
    ) -> None:\r
        self.name = name\r
        self.suggestions = suggestions or []\r
        self.command_args = command_args or []\r
        message = f"Command not found: {name}"\r
        if self.suggestions:\r
            message += f". Did you mean '{self.suggestions[0]}'?"\r
        super().__init__(message)\r
\r
    def corrected_command(self, name: str) -> str:\r
        """Keep argument boundaries when offering a corrected command."""\r
        return shlex.join([name, *self.command_args])\r
`,"commands/__init__.py":``,"commands/calculator.py":`"""\r
Calculator command — safe arithmetic expression evaluation.\r
"""\r
\r
from __future__ import annotations\r
\r
import ast\r
import operator\r
from typing import Optional\r
\r
from colorama import Fore, Style\r
\r
from engine import Command\r
from context import ShellContext\r
\r
# Allowed operators for safe evaluation\r
_OPS = {\r
    ast.Add: operator.add,\r
    ast.Sub: operator.sub,\r
    ast.Mult: operator.mul,\r
    ast.Div: operator.truediv,\r
    ast.Mod: operator.mod,\r
    ast.Pow: operator.pow,\r
    ast.FloorDiv: operator.floordiv,\r
    ast.USub: operator.neg,\r
    ast.UAdd: operator.pos,\r
}\r
\r
\r
def _safe_eval(node: ast.AST) -> float:\r
    """Recursively evaluate an AST node using only arithmetic ops."""\r
    if isinstance(node, ast.Expression):\r
        return _safe_eval(node.body)\r
    if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):\r
        return node.value\r
    if isinstance(node, ast.BinOp):\r
        op_type = type(node.op)\r
        if op_type not in _OPS:\r
            raise ValueError(f"Unsupported operator: {op_type.__name__}")\r
        left = _safe_eval(node.left)\r
        right = _safe_eval(node.right)\r
        if op_type in (ast.Div, ast.Mod, ast.FloorDiv) and right == 0:\r
            raise ZeroDivisionError("Division by zero")\r
        return _OPS[op_type](left, right)\r
    if isinstance(node, ast.UnaryOp):\r
        op_type = type(node.op)\r
        if op_type not in _OPS:\r
            raise ValueError(f"Unsupported operator: {op_type.__name__}")\r
        return _OPS[op_type](_safe_eval(node.operand))\r
    raise ValueError(f"Unsupported expression: {ast.dump(node)}")\r
\r
\r
def _calculator(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """\r
    Evaluate an arithmetic expression safely.\r
    Usage: calc <expression>\r
    Example: calc 2 + 3 * (4 - 1)\r
    """\r
    if not args:\r
        print(Fore.YELLOW + "Usage: calc <expression>")\r
        print(Fore.CYAN + "  Example: calc 2 + 3 * (4 - 1)")\r
        return None\r
\r
    expr = " ".join(args)\r
    try:\r
        tree = ast.parse(expr, mode="eval")\r
        result = _safe_eval(tree)\r
        # Display nicely (int if whole number)\r
        if isinstance(result, float) and result == int(result):\r
            result = int(result)\r
        print(Fore.BLUE + Style.BRIGHT + f"  {expr} = {result}")\r
        return str(result)\r
    except ZeroDivisionError:\r
        print(Fore.RED + "Error: Division by zero.")\r
    except (ValueError, SyntaxError) as e:\r
        print(Fore.RED + f"Error: Invalid expression — {e}")\r
    return None\r
\r
\r
def register(engine) -> None:\r
    """Register calculator commands."""\r
    engine.register(Command(\r
        name="calc",\r
        description="Safe arithmetic calculator",\r
        usage="calc <expression>  (e.g. calc 2+3*4)",\r
        category="utility",\r
        handler=_calculator,\r
    ))\r
`,"commands/developer.py":`"""\r
Developer utility commands — json-pretty, uuid, base64, hash.\r
JWT commands deferred (requires PyJWT).\r
"""\r
\r
from __future__ import annotations\r
\r
import base64\r
import hashlib\r
import json\r
import uuid as uuid_mod\r
from typing import Optional\r
\r
from colorama import Fore, Style\r
\r
from engine import Command\r
from context import ShellContext\r
\r
\r
def _json_pretty(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Pretty-print a JSON string.  Usage: json-pretty '<json>'"""\r
    if not args:\r
        print(Fore.YELLOW + 'Usage: json-pretty \\'{"key": "value"}\\'')\r
        return None\r
    raw = " ".join(args)\r
    try:\r
        parsed = json.loads(raw)\r
        pretty = json.dumps(parsed, indent=2, ensure_ascii=False)\r
        for line in pretty.splitlines():\r
            print(Fore.CYAN + f"  {line}")\r
        return pretty\r
    except json.JSONDecodeError as e:\r
        print(Fore.RED + f"  Invalid JSON: {e}")\r
    return None\r
\r
\r
def _uuid_gen(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Generate a UUID.  Usage: uuid [count]"""\r
    count = 1\r
    if args and args[0].isdigit():\r
        count = int(args[0])\r
    for _ in range(count):\r
        u = str(uuid_mod.uuid4())\r
        print(Fore.CYAN + f"  {u}")\r
    return None\r
\r
\r
def _base64_cmd(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Base64 encode/decode.  Usage: base64 encode|decode <text>"""\r
    if len(args) < 2:\r
        print(Fore.YELLOW + "Usage: base64 encode|decode <text>")\r
        return None\r
\r
    action = args[0].lower()\r
    text = " ".join(args[1:])\r
\r
    if action == "encode":\r
        result = base64.b64encode(text.encode()).decode()\r
        print(Fore.CYAN + f"  {result}")\r
        return result\r
    elif action == "decode":\r
        try:\r
            result = base64.b64decode(text.encode()).decode()\r
            print(Fore.CYAN + f"  {result}")\r
            return result\r
        except Exception as e:\r
            print(Fore.RED + f"  Decode error: {e}")\r
    else:\r
        print(Fore.YELLOW + "Usage: base64 encode|decode <text>")\r
    return None\r
\r
\r
def _hash_cmd(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Hash a string.  Usage: hash <algorithm> <text>"""\r
    available = ["md5", "sha1", "sha256", "sha512"]\r
    if len(args) < 2:\r
        print(Fore.YELLOW + f"Usage: hash <{'|'.join(available)}> <text>")\r
        return None\r
\r
    algo = args[0].lower()\r
    text = " ".join(args[1:])\r
\r
    if algo not in available:\r
        print(Fore.RED + f"  Unknown algorithm: {algo}")\r
        print(Fore.YELLOW + f"  Available: {', '.join(available)}")\r
        return None\r
\r
    h = hashlib.new(algo)\r
    h.update(text.encode())\r
    result = h.hexdigest()\r
    print(Fore.CYAN + f"  {algo}: {result}")\r
    return result\r
\r
\r
def _echo(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Echo text to the terminal. Usage: echo <text>"""\r
    text = " ".join(args)\r
    print(Fore.WHITE + text)\r
    return text\r
\r
\r
def _vars(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Show all shell variables."""\r
    if not ctx.variables:\r
        print(Fore.YELLOW + "  No variables set.")\r
        return None\r
    print(Fore.BLUE + Style.BRIGHT + "Shell Variables:")\r
    for k, v in sorted(ctx.variables.items()):\r
        print(Fore.CYAN + f"  {k}" + Fore.WHITE + f" = {v}")\r
    return None\r
\r
\r
def register(engine) -> None:\r
    """Register developer utility commands."""\r
    commands = [\r
        Command("json-pretty", "Pretty-print JSON", "json-pretty '<json>'", "developer", _json_pretty),\r
        Command("uuid", "Generate UUID(s)", "uuid [count]", "developer", _uuid_gen),\r
        Command("base64", "Base64 encode/decode", "base64 encode|decode <text>", "developer", _base64_cmd),\r
        Command("hash", "Hash a string", "hash md5|sha1|sha256|sha512 <text>", "developer", _hash_cmd),\r
        Command("echo", "Echo text", "echo <text>", "utility", _echo),\r
        Command("vars", "Show shell variables", "vars", "utility", _vars),\r
    ]\r
    for cmd in commands:\r
        engine.register(cmd)\r
`,"commands/filesystem.py":`"""\r
Filesystem commands — pwd, ls, tree, cd, mkdir, touch, cp, mv, rm, find, cat, head, tail.\r
"""\r
\r
from __future__ import annotations\r
\r
import os\r
import shutil\r
from pathlib import Path\r
from typing import Optional\r
\r
from colorama import Fore, Style\r
\r
from engine import Command\r
from context import ShellContext\r
\r
\r
def _pwd(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Print working directory."""\r
    print(Fore.CYAN + ctx.cwd)\r
    return ctx.cwd\r
\r
\r
def _ls(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """List directory contents."""\r
    target = args[0] if args else ctx.cwd\r
    target_path = Path(target) if os.path.isabs(target) else Path(ctx.cwd) / target\r
\r
    if not target_path.exists():\r
        print(Fore.RED + f"ls: '{target}' does not exist")\r
        return None\r
    if not target_path.is_dir():\r
        print(Fore.CYAN + target_path.name)\r
        return target_path.name\r
\r
    entries = sorted(target_path.iterdir(), key=lambda p: (not p.is_dir(), p.name.lower()))\r
    lines: list[str] = []\r
    for entry in entries:\r
        if entry.is_dir():\r
            line = Fore.BLUE + Style.BRIGHT + f"  📁 {entry.name}/"\r
        elif entry.suffix in (".py", ".js", ".ts", ".go", ".rs", ".java", ".c", ".cpp"):\r
            line = Fore.GREEN + f"  📄 {entry.name}"\r
        elif entry.suffix in (".md", ".txt", ".json", ".yaml", ".yml", ".toml"):\r
            line = Fore.YELLOW + f"  📄 {entry.name}"\r
        else:\r
            line = Fore.WHITE + f"  📄 {entry.name}"\r
        print(line)\r
        lines.append(entry.name)\r
    return "\\n".join(lines)\r
\r
\r
def _tree(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Display directory tree."""\r
    target = args[0] if args else ctx.cwd\r
    target_path = Path(target) if os.path.isabs(target) else Path(ctx.cwd) / target\r
    max_depth = 3\r
\r
    if not target_path.is_dir():\r
        print(Fore.RED + f"tree: '{target}' is not a directory")\r
        return None\r
\r
    print(Fore.BLUE + Style.BRIGHT + str(target_path.name) + "/")\r
    _print_tree(target_path, "", max_depth, 0)\r
    return None\r
\r
\r
def _print_tree(path: Path, prefix: str, max_depth: int, depth: int) -> None:\r
    """Recursively print directory tree."""\r
    if depth >= max_depth:\r
        return\r
    try:\r
        entries = sorted(path.iterdir(), key=lambda p: (not p.is_dir(), p.name.lower()))\r
    except PermissionError:\r
        print(prefix + "└── " + Fore.RED + "[access denied]")\r
        return\r
\r
    for i, entry in enumerate(entries):\r
        is_last = i == len(entries) - 1\r
        connector = "└── " if is_last else "├── "\r
        if entry.is_dir():\r
            print(Fore.WHITE + prefix + connector + Fore.BLUE + entry.name + "/")\r
            extension = "    " if is_last else "│   "\r
            _print_tree(entry, prefix + extension, max_depth, depth + 1)\r
        else:\r
            print(Fore.WHITE + prefix + connector + Fore.CYAN + entry.name)\r
\r
\r
def _cd(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Change directory."""\r
    if not args or args[0] == "~":\r
        target = os.path.expanduser("~")\r
    elif args[0] == "-":\r
        target = ctx.variables.get("OLDPWD", ctx.cwd)\r
    else:\r
        target = args[0]\r
\r
    target_path = Path(target) if os.path.isabs(target) else Path(ctx.cwd) / target\r
    target_path = target_path.resolve()\r
\r
    if not target_path.exists():\r
        print(Fore.RED + f"cd: '{target}' does not exist")\r
        return None\r
    if not target_path.is_dir():\r
        print(Fore.RED + f"cd: '{target}' is not a directory")\r
        return None\r
\r
    ctx.variables["OLDPWD"] = ctx.cwd\r
    ctx.cwd = str(target_path)\r
    os.chdir(ctx.cwd)\r
    return ctx.cwd\r
\r
\r
def _mkdir(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Create directories."""\r
    if not args:\r
        print(Fore.YELLOW + "Usage: mkdir <dir1> [dir2] ...")\r
        return None\r
    for name in args:\r
        p = Path(ctx.cwd) / name\r
        try:\r
            p.mkdir(parents=True, exist_ok=True)\r
            print(Fore.GREEN + f"  Created: {name}")\r
        except Exception as e:\r
            print(Fore.RED + f"  Error creating {name}: {e}")\r
    return None\r
\r
\r
def _touch(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Create empty files."""\r
    if not args:\r
        print(Fore.YELLOW + "Usage: touch <file1> [file2] ...")\r
        return None\r
    for name in args:\r
        p = Path(ctx.cwd) / name\r
        try:\r
            p.parent.mkdir(parents=True, exist_ok=True)\r
            p.touch()\r
            print(Fore.GREEN + f"  Created: {name}")\r
        except Exception as e:\r
            print(Fore.RED + f"  Error creating {name}: {e}")\r
    return None\r
\r
\r
def _cp(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Copy files or directories. Usage: cp <src> <dst>"""\r
    if len(args) < 2:\r
        print(Fore.YELLOW + "Usage: cp <source> <destination>")\r
        return None\r
    src = Path(ctx.cwd) / args[0] if not os.path.isabs(args[0]) else Path(args[0])\r
    dst = Path(ctx.cwd) / args[1] if not os.path.isabs(args[1]) else Path(args[1])\r
    try:\r
        if src.is_dir():\r
            shutil.copytree(str(src), str(dst))\r
        else:\r
            shutil.copy2(str(src), str(dst))\r
        print(Fore.GREEN + f"  Copied: {args[0]} -> {args[1]}")\r
    except Exception as e:\r
        print(Fore.RED + f"  Error: {e}")\r
    return None\r
\r
\r
def _mv(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Move/rename files or directories. Usage: mv <src> <dst>"""\r
    if len(args) < 2:\r
        print(Fore.YELLOW + "Usage: mv <source> <destination>")\r
        return None\r
    src = Path(ctx.cwd) / args[0] if not os.path.isabs(args[0]) else Path(args[0])\r
    dst = Path(ctx.cwd) / args[1] if not os.path.isabs(args[1]) else Path(args[1])\r
    try:\r
        shutil.move(str(src), str(dst))\r
        print(Fore.GREEN + f"  Moved: {args[0]} -> {args[1]}")\r
    except Exception as e:\r
        print(Fore.RED + f"  Error: {e}")\r
    return None\r
\r
\r
def _rm(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Remove files or directories. Usage: rm <path> [-r for recursive]"""\r
    if not args:\r
        print(Fore.YELLOW + "Usage: rm <path> [-r for directories]")\r
        return None\r
\r
    recursive = "-r" in args or "--recursive" in args\r
    targets = [a for a in args if not a.startswith("-")]\r
\r
    for name in targets:\r
        p = Path(ctx.cwd) / name if not os.path.isabs(name) else Path(name)\r
        try:\r
            if p.is_dir():\r
                if recursive:\r
                    shutil.rmtree(str(p))\r
                    print(Fore.GREEN + f"  Removed directory: {name}")\r
                else:\r
                    print(Fore.RED + f"  '{name}' is a directory (use -r)")\r
            else:\r
                p.unlink()\r
                print(Fore.GREEN + f"  Removed: {name}")\r
        except Exception as e:\r
            print(Fore.RED + f"  Error: {e}")\r
    return None\r
\r
\r
def _find(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Find files matching a pattern. Usage: find <pattern>"""\r
    if not args:\r
        print(Fore.YELLOW + "Usage: find <pattern>")\r
        return None\r
    pattern = args[0]\r
    base = Path(ctx.cwd)\r
    matches = list(base.rglob(f"*{pattern}*"))\r
    if not matches:\r
        print(Fore.YELLOW + f"  No matches for '{pattern}'")\r
    else:\r
        for m in matches[:50]:\r
            rel = m.relative_to(base)\r
            if m.is_dir():\r
                print(Fore.BLUE + f"  📁 {rel}/")\r
            else:\r
                print(Fore.CYAN + f"  📄 {rel}")\r
        if len(matches) > 50:\r
            print(Fore.YELLOW + f"  ... and {len(matches) - 50} more")\r
    return None\r
\r
\r
def _cat(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Display file contents. Usage: cat <file>"""\r
    if not args:\r
        print(Fore.YELLOW + "Usage: cat <file>")\r
        return None\r
    p = Path(ctx.cwd) / args[0] if not os.path.isabs(args[0]) else Path(args[0])\r
    if not p.exists():\r
        print(Fore.RED + f"cat: '{args[0]}' not found")\r
        return None\r
    if p.is_dir():\r
        print(Fore.RED + f"cat: '{args[0]}' is a directory")\r
        return None\r
    try:\r
        content = p.read_text(encoding="utf-8", errors="replace")\r
        for i, line in enumerate(content.splitlines(), 1):\r
            print(Fore.WHITE + f"  {Fore.CYAN}{i:>4}{Fore.WHITE} │ {line}")\r
        return content\r
    except Exception as e:\r
        print(Fore.RED + f"  Error: {e}")\r
    return None\r
\r
\r
def _head(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Show first N lines of a file. Usage: head <file> [N]"""\r
    if not args:\r
        print(Fore.YELLOW + "Usage: head <file> [lines]")\r
        return None\r
    n = 10\r
    filename = args[0]\r
    if len(args) > 1 and args[1].isdigit():\r
        n = int(args[1])\r
\r
    p = Path(ctx.cwd) / filename if not os.path.isabs(filename) else Path(filename)\r
    if not p.exists():\r
        print(Fore.RED + f"head: '{filename}' not found")\r
        return None\r
    try:\r
        lines = p.read_text(encoding="utf-8", errors="replace").splitlines()[:n]\r
        for i, line in enumerate(lines, 1):\r
            print(Fore.WHITE + f"  {Fore.CYAN}{i:>4}{Fore.WHITE} │ {line}")\r
        return "\\n".join(lines)\r
    except Exception as e:\r
        print(Fore.RED + f"  Error: {e}")\r
    return None\r
\r
\r
def _tail(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Show last N lines of a file. Usage: tail <file> [N]"""\r
    if not args:\r
        print(Fore.YELLOW + "Usage: tail <file> [lines]")\r
        return None\r
    n = 10\r
    filename = args[0]\r
    if len(args) > 1 and args[1].isdigit():\r
        n = int(args[1])\r
\r
    p = Path(ctx.cwd) / filename if not os.path.isabs(filename) else Path(filename)\r
    if not p.exists():\r
        print(Fore.RED + f"tail: '{filename}' not found")\r
        return None\r
    try:\r
        all_lines = p.read_text(encoding="utf-8", errors="replace").splitlines()\r
        lines = all_lines[-n:]\r
        start = max(len(all_lines) - n, 0) + 1\r
        for i, line in enumerate(lines, start):\r
            print(Fore.WHITE + f"  {Fore.CYAN}{i:>4}{Fore.WHITE} │ {line}")\r
        return "\\n".join(lines)\r
    except Exception as e:\r
        print(Fore.RED + f"  Error: {e}")\r
    return None\r
\r
\r
def register(engine) -> None:\r
    """Register filesystem commands."""\r
    commands = [\r
        Command("pwd", "Print working directory", "pwd", "filesystem", _pwd),\r
        Command("ls", "List directory contents", "ls [path]", "filesystem", _ls),\r
        Command("dir", "List directory contents", "dir [path]", "filesystem", _ls),\r
        Command("tree", "Display directory tree", "tree [path]", "filesystem", _tree),\r
        Command("cd", "Change directory", "cd <path>", "filesystem", _cd),\r
        Command("mkdir", "Create directories", "mkdir <dir> ...", "filesystem", _mkdir),\r
        Command("touch", "Create empty files", "touch <file> ...", "filesystem", _touch),\r
        Command("cp", "Copy files/directories", "cp <src> <dst>", "filesystem", _cp),\r
        Command("mv", "Move/rename files", "mv <src> <dst>", "filesystem", _mv),\r
        Command("rm", "Remove files/directories", "rm <path> [-r]", "filesystem", _rm),\r
        Command("find", "Find files by pattern", "find <pattern>", "filesystem", _find),\r
        Command("cat", "Display file contents", "cat <file>", "filesystem", _cat),\r
        Command("head", "Show first N lines", "head <file> [N]", "filesystem", _head),\r
        Command("tail", "Show last N lines", "tail <file> [N]", "filesystem", _tail),\r
    ]\r
    for cmd in commands:\r
        engine.register(cmd)\r
`,"commands/hello.py":`"""\r
Hello commands — hello world and greeting.\r
"""\r
\r
from __future__ import annotations\r
\r
from typing import Optional\r
\r
from colorama import Fore, Style\r
from pyfiglet import Figlet\r
\r
from engine import Command\r
from context import ShellContext\r
\r
figlet = Figlet(font="slant")\r
\r
RAINBOW = [Fore.RED, Fore.YELLOW, Fore.GREEN, Fore.CYAN, Fore.BLUE, Fore.MAGENTA]\r
\r
\r
def _hello(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Display rainbow 'Hello World' ASCII art."""\r
    art = figlet.renderText("Hello World")\r
    lines = art.split("\\n")\r
    output_lines: list[str] = []\r
    for i, line in enumerate(lines):\r
        color = RAINBOW[i % len(RAINBOW)]\r
        print(color + line)\r
        output_lines.append(line)\r
    return "\\n".join(output_lines)\r
\r
\r
def _greet(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Greet a person.  Usage: greet <name> [--count N]"""\r
    name = "World"\r
    count = 1\r
\r
    # Simple arg parsing\r
    i = 0\r
    positional_set = False\r
    while i < len(args):\r
        if args[i] == "--count" and i + 1 < len(args):\r
            try:\r
                count = int(args[i + 1])\r
            except ValueError:\r
                pass\r
            i += 2\r
        elif args[i] == "--name" and i + 1 < len(args):\r
            name = args[i + 1]\r
            positional_set = True\r
            i += 2\r
        elif not args[i].startswith("-") and not positional_set:\r
            name = args[i]\r
            positional_set = True\r
            i += 1\r
        else:\r
            i += 1\r
\r
    for _ in range(count):\r
        art = figlet.renderText(f"Hello, {name} !")\r
        print(Fore.GREEN + Style.BRIGHT + art)\r
    return None\r
\r
\r
def register(engine) -> None:\r
    """Register hello commands with the engine."""\r
    engine.register(Command(\r
        name="hello",\r
        description="Display rainbow 'Hello World' ASCII art",\r
        usage="hello",\r
        category="general",\r
        handler=_hello,\r
    ))\r
    engine.register(Command(\r
        name="greet",\r
        description="Greet someone with ASCII art",\r
        usage="greet <name> [--count N]",\r
        category="general",\r
        handler=_greet,\r
    ))\r
`,"commands/help_cmd.py":`"""\r
Help command — dynamically lists all registered commands.\r
Also: history, alias, unalias, aliases, config commands.\r
"""\r
\r
from __future__ import annotations\r
\r
from typing import Optional, TYPE_CHECKING\r
\r
from colorama import Fore, Style\r
from pyfiglet import Figlet\r
\r
from engine import Command\r
from context import ShellContext\r
\r
if TYPE_CHECKING:\r
    from engine import CommandEngine\r
    from services.history import HistoryService\r
    from services.aliases import AliasService\r
    from services.config import ConfigService\r
\r
figlet = Figlet(font="slant")\r
\r
# These will be injected at registration time\r
_engine_ref: Optional["CommandEngine"] = None\r
_history_ref: Optional["HistoryService"] = None\r
_alias_ref: Optional["AliasService"] = None\r
_config_ref: Optional["ConfigService"] = None\r
\r
\r
def _help(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Show help for all commands or a specific command."""\r
    if _engine_ref is None:\r
        print(Fore.RED + "  Engine not available.")\r
        return None\r
\r
    # Help for a specific command\r
    if args:\r
        cmd = _engine_ref.get_command(args[0])\r
        if cmd:\r
            print(Fore.BLUE + Style.BRIGHT + f"  {cmd.name}" + Fore.WHITE + f" — {cmd.description}")\r
            if cmd.usage:\r
                print(Fore.CYAN + f"  Usage: {cmd.usage}")\r
            return None\r
        else:\r
            print(Fore.RED + f"  Unknown command: {args[0]}")\r
            return None\r
\r
    # Full help\r
    art = figlet.renderText("Help")\r
    print(Fore.YELLOW + Style.BRIGHT + art)\r
\r
    # Group by category\r
    commands = _engine_ref.list_commands()\r
    categories: dict[str, list[Command]] = {}\r
    for cmd in commands:\r
        categories.setdefault(cmd.category, []).append(cmd)\r
\r
    for cat in sorted(categories.keys()):\r
        print(Fore.BLUE + Style.BRIGHT + f"\\n  [{cat.upper()}]")\r
        for cmd in categories[cat]:\r
            print(Fore.CYAN + f"    {cmd.name:<16}" + Fore.WHITE + f"{cmd.description}")\r
\r
    print()\r
    print(Fore.YELLOW + "  Type 'help <command>' for detailed usage.")\r
    return None\r
\r
\r
def _history_cmd(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Show command history."""\r
    if _history_ref is None:\r
        print(Fore.RED + "  History not available.")\r
        return None\r
\r
    if args and args[0] == "clear":\r
        _history_ref.clear()\r
        print(Fore.GREEN + "  History cleared.")\r
        return None\r
\r
    entries = _history_ref.get_all()\r
    if not entries:\r
        print(Fore.YELLOW + "  No history yet.")\r
        return None\r
\r
    print(Fore.BLUE + Style.BRIGHT + "Command History:")\r
    for i, entry in enumerate(entries, 1):\r
        print(Fore.CYAN + f"  {i:>4}  {entry}")\r
    return None\r
\r
\r
def _alias_cmd(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Set an alias.  Usage: alias <name>=<command>"""\r
    if _alias_ref is None:\r
        print(Fore.RED + "  Alias service not available.")\r
        return None\r
\r
    if not args:\r
        # Show all aliases\r
        return _aliases_cmd(ctx, args)\r
\r
    raw = " ".join(args)\r
    if "=" not in raw:\r
        print(Fore.YELLOW + "Usage: alias <name>=<command>")\r
        return None\r
\r
    name, value = raw.split("=", 1)\r
    name = name.strip()\r
    value = value.strip()\r
\r
    _alias_ref.set_alias(name, value)\r
    ctx.aliases[name] = value\r
    print(Fore.GREEN + f"  Alias set: {name} -> {value}")\r
    return None\r
\r
\r
def _unalias_cmd(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Remove an alias.  Usage: unalias <name>"""\r
    if _alias_ref is None:\r
        print(Fore.RED + "  Alias service not available.")\r
        return None\r
\r
    if not args:\r
        print(Fore.YELLOW + "Usage: unalias <name>")\r
        return None\r
\r
    name = args[0]\r
    if _alias_ref.remove_alias(name):\r
        ctx.aliases.pop(name, None)\r
        print(Fore.GREEN + f"  Alias removed: {name}")\r
    else:\r
        print(Fore.YELLOW + f"  Alias '{name}' not found.")\r
    return None\r
\r
\r
def _aliases_cmd(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """List all aliases."""\r
    if _alias_ref is None:\r
        print(Fore.RED + "  Alias service not available.")\r
        return None\r
\r
    aliases = _alias_ref.get_all()\r
    if not aliases:\r
        print(Fore.YELLOW + "  No aliases defined.")\r
        return None\r
\r
    print(Fore.BLUE + Style.BRIGHT + "Aliases:")\r
    for name, value in sorted(aliases.items()):\r
        print(Fore.CYAN + f"  {name}" + Fore.WHITE + f" -> {value}")\r
    return None\r
\r
\r
def _config_cmd(ctx: ShellContext, args: list[str]) -> Optional[str]:\r
    """Config management.  Usage: config get|set|reset [key] [value]"""\r
    if _config_ref is None:\r
        print(Fore.RED + "  Config service not available.")\r
        return None\r
\r
    if not args:\r
        # Show all config\r
        all_cfg = _config_ref.get_all()\r
        print(Fore.BLUE + Style.BRIGHT + "Configuration:")\r
        for k, v in sorted(all_cfg.items()):\r
            print(Fore.CYAN + f"  {k}" + Fore.WHITE + f" = {v}")\r
        return None\r
\r
    action = args[0].lower()\r
\r
    if action == "get" and len(args) > 1:\r
        key = args[1]\r
        val = _config_ref.get(key)\r
        if val is not None:\r
            print(Fore.CYAN + f"  {key}" + Fore.WHITE + f" = {val}")\r
        else:\r
            print(Fore.YELLOW + f"  Key '{key}' not found.")\r
    elif action == "set" and len(args) > 2:\r
        key = args[1]\r
        val = " ".join(args[2:])\r
        _config_ref.set(key, val)\r
        print(Fore.GREEN + f"  Set {key} = {val}")\r
    elif action == "reset":\r
        _config_ref.reset()\r
        print(Fore.GREEN + "  Config reset to defaults.")\r
    else:\r
        print(Fore.YELLOW + "Usage: config get <key> | config set <key> <value> | config reset")\r
    return None\r
\r
\r
def register(engine, history_svc=None, alias_svc=None, config_svc=None) -> None:\r
    """Register help/meta commands.  Accepts service references for injection."""\r
    global _engine_ref, _history_ref, _alias_ref, _config_ref\r
    _engine_ref = engine\r
    _history_ref = history_svc\r
    _alias_ref = alias_svc\r
    _config_ref = config_svc\r
\r
    commands = [\r
        Command("help", "Show help for all commands", "help [command]", "general", _help),\r
        Command("history", "Show/clear command history", "history [clear]", "general", _history_cmd),\r
        Command("alias", "Set an alias", "alias <name>=<command>", "general", _alias_cmd),\r
        Command("unalias", "Remove an alias", "unalias <name>", "general", _unalias_cmd),\r
        Command("aliases", "List all aliases", "aliases", "general", _aliases_cmd),\r
        Command("config", "Manage configuration", "config get|set|reset [key] [value]", "general", _config_cmd),\r
    ]\r
    for cmd in commands:\r
        engine.register(cmd)\r
`,"services/__init__.py":``,"services/aliases.py":`"""\r
Alias Service — shell alias management.\r
\r
Persists aliases to ~/.kevin-cli/aliases.json.\r
"""\r
\r
from __future__ import annotations\r
\r
import json\r
from pathlib import Path\r
from typing import Optional\r
\r
ALIAS_DIR = Path.home() / ".kevin-cli"\r
ALIAS_FILE = ALIAS_DIR / "aliases.json"\r
\r
\r
class AliasService:\r
    """Manage shell aliases with JSON-backed persistence."""\r
\r
    def __init__(self) -> None:\r
        self._aliases: dict[str, str] = {}\r
        self._load()\r
\r
    # ---- public API ----\r
\r
    def set_alias(self, name: str, value: str) -> None:\r
        """Create or update an alias."""\r
        self._aliases[name] = value\r
        self._save()\r
\r
    def remove_alias(self, name: str) -> bool:\r
        """Remove an alias.  Returns True if it existed."""\r
        if name in self._aliases:\r
            del self._aliases[name]\r
            self._save()\r
            return True\r
        return False\r
\r
    def get_alias(self, name: str) -> Optional[str]:\r
        """Look up an alias value."""\r
        return self._aliases.get(name)\r
\r
    def get_all(self) -> dict[str, str]:\r
        """Return a copy of all aliases."""\r
        return dict(self._aliases)\r
\r
    def sync_to_context(self, aliases_dict: dict[str, str]) -> None:\r
        """Sync loaded aliases into a ShellContext.aliases dict (in-place)."""\r
        aliases_dict.update(self._aliases)\r
\r
    # ---- persistence (private) ----\r
\r
    def _load(self) -> None:\r
        if ALIAS_FILE.exists():\r
            try:\r
                self._aliases = json.loads(\r
                    ALIAS_FILE.read_text(encoding="utf-8")\r
                )\r
            except Exception:\r
                self._aliases = {}\r
\r
    def _save(self) -> None:\r
        try:\r
            ALIAS_DIR.mkdir(parents=True, exist_ok=True)\r
            ALIAS_FILE.write_text(\r
                json.dumps(self._aliases, indent=2), encoding="utf-8"\r
            )\r
        except Exception:\r
            pass\r
`,"services/config.py":`"""\r
Config Service — user configuration management.\r
\r
Reads/writes ~/.kevin-cli/config.json.\r
"""\r
\r
from __future__ import annotations\r
\r
import json\r
from pathlib import Path\r
from typing import Any, Optional\r
\r
CONFIG_DIR = Path.home() / ".kevin-cli"\r
CONFIG_FILE = CONFIG_DIR / "config.json"\r
\r
DEFAULTS: dict[str, Any] = {\r
    "theme": "default",\r
    "username": "",\r
    "prompt": "{username}@{hostname} {cwd_short} {git_branch}> ",\r
    "editor": "notepad" if __import__("platform").system() == "Windows" else "nano",\r
    "history_size": 1000,\r
    "colors": {\r
        "prompt": "cyan",\r
        "error": "red",\r
        "success": "green",\r
        "info": "blue",\r
    },\r
}\r
\r
\r
class ConfigService:\r
    """Manage user configuration with JSON-backed persistence."""\r
\r
    def __init__(self) -> None:\r
        self._config: dict[str, Any] = dict(DEFAULTS)\r
        self._load()\r
\r
    # ---- public API ----\r
\r
    def get(self, key: str) -> Any:\r
        """Get a config value.  Supports dot-notation for nested keys."""\r
        keys = key.split(".")\r
        value: Any = self._config\r
        for k in keys:\r
            if isinstance(value, dict) and k in value:\r
                value = value[k]\r
            else:\r
                return None\r
        return value\r
\r
    def set(self, key: str, value: str) -> None:\r
        """Set a config value (always stored as string for simple keys)."""\r
        # Auto-convert numeric strings\r
        if value.isdigit():\r
            self._config[key] = int(value)\r
        elif value.lower() in ("true", "false"):\r
            self._config[key] = value.lower() == "true"\r
        else:\r
            self._config[key] = value\r
        self._save()\r
\r
    def reset(self) -> None:\r
        """Reset config to defaults."""\r
        self._config = dict(DEFAULTS)\r
        self._save()\r
\r
    def get_all(self) -> dict[str, Any]:\r
        """Return a copy of the full config."""\r
        return dict(self._config)\r
\r
    # ---- persistence (private) ----\r
\r
    def _load(self) -> None:\r
        if CONFIG_FILE.exists():\r
            try:\r
                loaded = json.loads(CONFIG_FILE.read_text(encoding="utf-8"))\r
                self._config.update(loaded)\r
            except Exception:\r
                pass\r
\r
    def _save(self) -> None:\r
        try:\r
            CONFIG_DIR.mkdir(parents=True, exist_ok=True)\r
            CONFIG_FILE.write_text(\r
                json.dumps(self._config, indent=2), encoding="utf-8"\r
            )\r
        except Exception:\r
            pass\r
`,"services/history.py":`"""\r
History Service — persistent command history.\r
\r
Stores history in ~/.kevin-cli/history.txt.\r
Supports history recall: !!, !N, !prefix\r
"""\r
\r
from __future__ import annotations\r
\r
import os\r
from pathlib import Path\r
from typing import Optional\r
\r
\r
HISTORY_DIR = Path.home() / ".kevin-cli"\r
HISTORY_FILE = HISTORY_DIR / "history.txt"\r
MAX_HISTORY = 1000\r
\r
\r
class HistoryService:\r
    """Manage persistent command history."""\r
\r
    def __init__(self, max_size: int = MAX_HISTORY) -> None:\r
        self.max_size = max_size\r
        self._entries: list[str] = []\r
        self._load()\r
\r
    # ---- public API ----\r
\r
    def add(self, entry: str) -> None:\r
        """Add an entry to history."""\r
        entry = entry.strip()\r
        if not entry:\r
            return\r
        self._entries.append(entry)\r
        if len(self._entries) > self.max_size:\r
            self._entries = self._entries[-self.max_size:]\r
        self._save()\r
\r
    def get_all(self) -> list[str]:\r
        """Return all history entries."""\r
        return list(self._entries)\r
\r
    def get_last(self) -> Optional[str]:\r
        """Return the most recent entry (for !!)."""\r
        return self._entries[-1] if self._entries else None\r
\r
    def get_by_index(self, index: int) -> Optional[str]:\r
        """Return entry by 1-based index (for !N)."""\r
        if 1 <= index <= len(self._entries):\r
            return self._entries[index - 1]\r
        return None\r
\r
    def get_by_prefix(self, prefix: str) -> Optional[str]:\r
        """Return most recent entry starting with *prefix* (for !prefix)."""\r
        for entry in reversed(self._entries):\r
            if entry.startswith(prefix):\r
                return entry\r
        return None\r
\r
    def clear(self) -> None:\r
        """Clear all history."""\r
        self._entries.clear()\r
        self._save()\r
\r
    def __len__(self) -> int:\r
        return len(self._entries)\r
\r
    # ---- resolve bang expressions ----\r
\r
    def resolve_bangs(self, raw_input: str) -> str:\r
        """\r
        Expand history references in raw_input:\r
          !!       -> last command\r
          !N       -> command number N\r
          !prefix  -> most recent command starting with prefix\r
        """\r
        stripped = raw_input.strip()\r
\r
        if stripped == "!!":\r
            last = self.get_last()\r
            return last if last else raw_input\r
\r
        if stripped.startswith("!") and len(stripped) > 1:\r
            rest = stripped[1:]\r
            # !N  (numeric)\r
            if rest.isdigit():\r
                entry = self.get_by_index(int(rest))\r
                if entry:\r
                    return entry\r
            else:\r
                # !prefix\r
                entry = self.get_by_prefix(rest)\r
                if entry:\r
                    return entry\r
\r
        return raw_input\r
\r
    # ---- persistence (private) ----\r
\r
    def _load(self) -> None:\r
        """Load history from file."""\r
        if HISTORY_FILE.exists():\r
            try:\r
                text = HISTORY_FILE.read_text(encoding="utf-8")\r
                self._entries = [\r
                    line for line in text.splitlines() if line.strip()\r
                ]\r
            except Exception:\r
                self._entries = []\r
\r
    def _save(self) -> None:\r
        """Persist history to file."""\r
        try:\r
            HISTORY_DIR.mkdir(parents=True, exist_ok=True)\r
            HISTORY_FILE.write_text(\r
                "\\n".join(self._entries) + "\\n", encoding="utf-8"\r
            )\r
        except Exception:\r
            pass\r
`,"browser_runtime.py":`"""Browser adapter for the existing CLI engine and compatible commands."""\r
\r
import contextlib\r
import io\r
import json\r
import os\r
import re\r
import traceback\r
from pathlib import Path\r
\r
from commands import calculator, developer, filesystem, hello, help_cmd\r
from context import ShellContext\r
from engine import Command, CommandEngine, CommandNotFoundError\r
from services.aliases import AliasService\r
from services.config import ConfigService\r
from services.history import HistoryService\r
\r
\r
ANSI_ESCAPE = re.compile(r"\\x1b\\[[0-?]*[ -/]*[@-~]")\r
DESKTOP_COMMANDS = (\r
    "system-info", "cpu", "memory", "disk", "battery", "processes", "env",\r
    "ping", "dns", "ports", "ip",\r
)\r
\r
\r
class BrowserSession:\r
    def __init__(self) -> None:\r
        workspace = Path.home() / "playground"\r
        workspace.mkdir(parents=True, exist_ok=True)\r
        (workspace / "welcome.txt").write_text(\r
            "Welcome to Kevin CLI in your browser!\\n"\r
            "These files live in a temporary virtual filesystem.\\n",\r
            encoding="utf-8",\r
        )\r
        os.chdir(workspace)\r
        self.ctx = ShellContext(username="guest", hostname="browser", env_vars={})\r
        self.engine = CommandEngine()\r
        self.history = HistoryService()\r
        self.aliases = AliasService()\r
        self.aliases.sync_to_context(self.ctx.aliases)\r
        for module in (calculator, developer, filesystem, hello):\r
            module.register(self.engine)\r
        help_cmd.register(self.engine, self.history, self.aliases, ConfigService())\r
        self.cleared = False\r
        self.engine.register(Command("clear", "Clear terminal output", "clear", "browser", self._clear))\r
        self.engine.register(Command("cls", "Clear terminal output", "cls", "browser", self._clear))\r
        self.engine.register(Command("exit", "End this demo session", "exit", "browser", self._exit))\r
        self.engine.register(Command("quit", "End this demo session", "quit", "browser", self._exit))\r
\r
    def _clear(self, ctx: ShellContext, args: list[str]) -> None:\r
        self.cleared = True\r
\r
    def _exit(self, ctx: ShellContext, args: list[str]) -> None:\r
        ctx.running = False\r
        print("Goodbye! Use Restart session to open a fresh playground.")\r
\r
    def execute(self, raw_input: str) -> str:\r
        output = io.StringIO()\r
        self.cleared = False\r
        failed = False\r
        suggestions: list[dict[str, object]] = []\r
        with contextlib.redirect_stdout(output), contextlib.redirect_stderr(output):\r
            try:\r
                if not self.ctx.running:\r
                    raise RuntimeError("Session ended. Use Restart session.")\r
                resolved = self.history.resolve_bangs(raw_input.strip())\r
                if resolved != raw_input.strip():\r
                    print(f"> {resolved}")\r
                self.history.add(resolved)\r
                self.engine.execute(resolved, self.ctx)\r
            except CommandNotFoundError as error:\r
                failed = True\r
                print(f"Command not found: {error.name}")\r
                names = (\r
                    [error.name] if error.name in DESKTOP_COMMANDS\r
                    else self.engine.suggest_commands(error.name, self.ctx, DESKTOP_COMMANDS)\r
                )\r
                for name in names:\r
                    desktop_only = name in DESKTOP_COMMANDS and name not in self.ctx.aliases\r
                    command = error.corrected_command(name)\r
                    suggestions.append({"command": command, "available": not desktop_only})\r
                    if name != error.name:\r
                        print(f"Did you mean '{name}'?")\r
                    if desktop_only:\r
                        print(f"'{name}' is available in the desktop CLI only. Download it to run this command.")\r
                if not names:\r
                    print("Type 'help' to see available browser commands.")\r
            except Exception:\r
                failed = True\r
                traceback.print_exc()\r
        return json.dumps({\r
            "output": ANSI_ESCAPE.sub("", output.getvalue())[:50000],\r
            "failed": failed,\r
            "clear": self.cleared,\r
            "running": self.ctx.running,\r
            "cwd": self.ctx.cwd,\r
            "suggestions": suggestions,\r
        })\r
\r
\r
session = BrowserSession()\r
`};let Q;function $(e){self.postMessage(e)}self.onmessage=async e=>{try{if(e.data.type===`start`){Q=await le({indexURL:`https://cdn.jsdelivr.net/pyodide/v0.27.7/full/`}),await Q.loadPackage(`micropip`),await Q.runPythonAsync(`
import micropip
await micropip.install(["colorama==0.4.6", "pyfiglet==1.0.2"])
`),Q.FS.mkdirTree(`/home/pyodide/cli`);for(let[e,t]of Object.entries(ue)){let n=`/home/pyodide/cli/${e}`;Q.FS.mkdirTree(n.slice(0,n.lastIndexOf(`/`))),Q.FS.writeFile(n,t)}await Q.runPythonAsync(`
import sys
sys.path.insert(0, "/home/pyodide/cli")
from browser_runtime import session
`),$({type:`ready`,cwd:Q.runPython(`session.ctx.cwd`)})}else{if(!Q)throw Error(`Python runtime is not ready.`);Q.globals.set(`_browser_command`,e.data.command);try{$({type:`result`,result:JSON.parse(await Q.runPythonAsync(`session.execute(_browser_command)`))})}finally{Q.globals.delete(`_browser_command`)}}}catch(e){$({type:`error`,message:e instanceof Error?e.message:String(e)})}};export{o as t};