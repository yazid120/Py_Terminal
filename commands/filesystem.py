"""
Filesystem commands — pwd, ls, tree, cd, mkdir, touch, cp, mv, rm, find, cat, head, tail.
"""

from __future__ import annotations

import os
import shutil
from pathlib import Path
from typing import Optional

from colorama import Fore, Style

from engine import Command
from context import ShellContext


def _pwd(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Print working directory."""
    print(Fore.CYAN + ctx.cwd)
    return ctx.cwd


def _ls(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """List directory contents."""
    target = args[0] if args else ctx.cwd
    target_path = Path(target) if os.path.isabs(target) else Path(ctx.cwd) / target

    if not target_path.exists():
        print(Fore.RED + f"ls: '{target}' does not exist")
        return None
    if not target_path.is_dir():
        print(Fore.CYAN + target_path.name)
        return target_path.name

    entries = sorted(target_path.iterdir(), key=lambda p: (not p.is_dir(), p.name.lower()))
    lines: list[str] = []
    for entry in entries:
        if entry.is_dir():
            line = Fore.BLUE + Style.BRIGHT + f"  📁 {entry.name}/"
        elif entry.suffix in (".py", ".js", ".ts", ".go", ".rs", ".java", ".c", ".cpp"):
            line = Fore.GREEN + f"  📄 {entry.name}"
        elif entry.suffix in (".md", ".txt", ".json", ".yaml", ".yml", ".toml"):
            line = Fore.YELLOW + f"  📄 {entry.name}"
        else:
            line = Fore.WHITE + f"  📄 {entry.name}"
        print(line)
        lines.append(entry.name)
    return "\n".join(lines)


def _tree(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Display directory tree."""
    target = args[0] if args else ctx.cwd
    target_path = Path(target) if os.path.isabs(target) else Path(ctx.cwd) / target
    max_depth = 3

    if not target_path.is_dir():
        print(Fore.RED + f"tree: '{target}' is not a directory")
        return None

    print(Fore.BLUE + Style.BRIGHT + str(target_path.name) + "/")
    _print_tree(target_path, "", max_depth, 0)
    return None


def _print_tree(path: Path, prefix: str, max_depth: int, depth: int) -> None:
    """Recursively print directory tree."""
    if depth >= max_depth:
        return
    try:
        entries = sorted(path.iterdir(), key=lambda p: (not p.is_dir(), p.name.lower()))
    except PermissionError:
        print(prefix + "└── " + Fore.RED + "[access denied]")
        return

    for i, entry in enumerate(entries):
        is_last = i == len(entries) - 1
        connector = "└── " if is_last else "├── "
        if entry.is_dir():
            print(Fore.WHITE + prefix + connector + Fore.BLUE + entry.name + "/")
            extension = "    " if is_last else "│   "
            _print_tree(entry, prefix + extension, max_depth, depth + 1)
        else:
            print(Fore.WHITE + prefix + connector + Fore.CYAN + entry.name)


def _cd(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Change directory."""
    if not args or args[0] == "~":
        target = os.path.expanduser("~")
    elif args[0] == "-":
        target = ctx.variables.get("OLDPWD", ctx.cwd)
    else:
        target = args[0]

    target_path = Path(target) if os.path.isabs(target) else Path(ctx.cwd) / target
    target_path = target_path.resolve()

    if not target_path.exists():
        print(Fore.RED + f"cd: '{target}' does not exist")
        return None
    if not target_path.is_dir():
        print(Fore.RED + f"cd: '{target}' is not a directory")
        return None

    ctx.variables["OLDPWD"] = ctx.cwd
    ctx.cwd = str(target_path)
    os.chdir(ctx.cwd)
    return ctx.cwd


def _mkdir(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Create directories."""
    if not args:
        print(Fore.YELLOW + "Usage: mkdir <dir1> [dir2] ...")
        return None
    for name in args:
        p = Path(ctx.cwd) / name
        try:
            p.mkdir(parents=True, exist_ok=True)
            print(Fore.GREEN + f"  Created: {name}")
        except Exception as e:
            print(Fore.RED + f"  Error creating {name}: {e}")
    return None


def _touch(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Create empty files."""
    if not args:
        print(Fore.YELLOW + "Usage: touch <file1> [file2] ...")
        return None
    for name in args:
        p = Path(ctx.cwd) / name
        try:
            p.parent.mkdir(parents=True, exist_ok=True)
            p.touch()
            print(Fore.GREEN + f"  Created: {name}")
        except Exception as e:
            print(Fore.RED + f"  Error creating {name}: {e}")
    return None


def _cp(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Copy files or directories. Usage: cp <src> <dst>"""
    if len(args) < 2:
        print(Fore.YELLOW + "Usage: cp <source> <destination>")
        return None
    src = Path(ctx.cwd) / args[0] if not os.path.isabs(args[0]) else Path(args[0])
    dst = Path(ctx.cwd) / args[1] if not os.path.isabs(args[1]) else Path(args[1])
    try:
        if src.is_dir():
            shutil.copytree(str(src), str(dst))
        else:
            shutil.copy2(str(src), str(dst))
        print(Fore.GREEN + f"  Copied: {args[0]} -> {args[1]}")
    except Exception as e:
        print(Fore.RED + f"  Error: {e}")
    return None


def _mv(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Move/rename files or directories. Usage: mv <src> <dst>"""
    if len(args) < 2:
        print(Fore.YELLOW + "Usage: mv <source> <destination>")
        return None
    src = Path(ctx.cwd) / args[0] if not os.path.isabs(args[0]) else Path(args[0])
    dst = Path(ctx.cwd) / args[1] if not os.path.isabs(args[1]) else Path(args[1])
    try:
        shutil.move(str(src), str(dst))
        print(Fore.GREEN + f"  Moved: {args[0]} -> {args[1]}")
    except Exception as e:
        print(Fore.RED + f"  Error: {e}")
    return None


def _rm(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Remove files or directories. Usage: rm <path> [-r for recursive]"""
    if not args:
        print(Fore.YELLOW + "Usage: rm <path> [-r for directories]")
        return None

    recursive = "-r" in args or "--recursive" in args
    targets = [a for a in args if not a.startswith("-")]

    for name in targets:
        p = Path(ctx.cwd) / name if not os.path.isabs(name) else Path(name)
        try:
            if p.is_dir():
                if recursive:
                    shutil.rmtree(str(p))
                    print(Fore.GREEN + f"  Removed directory: {name}")
                else:
                    print(Fore.RED + f"  '{name}' is a directory (use -r)")
            else:
                p.unlink()
                print(Fore.GREEN + f"  Removed: {name}")
        except Exception as e:
            print(Fore.RED + f"  Error: {e}")
    return None


def _find(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Find files matching a pattern. Usage: find <pattern>"""
    if not args:
        print(Fore.YELLOW + "Usage: find <pattern>")
        return None
    pattern = args[0]
    base = Path(ctx.cwd)
    matches = list(base.rglob(f"*{pattern}*"))
    if not matches:
        print(Fore.YELLOW + f"  No matches for '{pattern}'")
    else:
        for m in matches[:50]:
            rel = m.relative_to(base)
            if m.is_dir():
                print(Fore.BLUE + f"  📁 {rel}/")
            else:
                print(Fore.CYAN + f"  📄 {rel}")
        if len(matches) > 50:
            print(Fore.YELLOW + f"  ... and {len(matches) - 50} more")
    return None


def _cat(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Display file contents. Usage: cat <file>"""
    if not args:
        print(Fore.YELLOW + "Usage: cat <file>")
        return None
    p = Path(ctx.cwd) / args[0] if not os.path.isabs(args[0]) else Path(args[0])
    if not p.exists():
        print(Fore.RED + f"cat: '{args[0]}' not found")
        return None
    if p.is_dir():
        print(Fore.RED + f"cat: '{args[0]}' is a directory")
        return None
    try:
        content = p.read_text(encoding="utf-8", errors="replace")
        for i, line in enumerate(content.splitlines(), 1):
            print(Fore.WHITE + f"  {Fore.CYAN}{i:>4}{Fore.WHITE} │ {line}")
        return content
    except Exception as e:
        print(Fore.RED + f"  Error: {e}")
    return None


def _head(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Show first N lines of a file. Usage: head <file> [N]"""
    if not args:
        print(Fore.YELLOW + "Usage: head <file> [lines]")
        return None
    n = 10
    filename = args[0]
    if len(args) > 1 and args[1].isdigit():
        n = int(args[1])

    p = Path(ctx.cwd) / filename if not os.path.isabs(filename) else Path(filename)
    if not p.exists():
        print(Fore.RED + f"head: '{filename}' not found")
        return None
    try:
        lines = p.read_text(encoding="utf-8", errors="replace").splitlines()[:n]
        for i, line in enumerate(lines, 1):
            print(Fore.WHITE + f"  {Fore.CYAN}{i:>4}{Fore.WHITE} │ {line}")
        return "\n".join(lines)
    except Exception as e:
        print(Fore.RED + f"  Error: {e}")
    return None


def _tail(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Show last N lines of a file. Usage: tail <file> [N]"""
    if not args:
        print(Fore.YELLOW + "Usage: tail <file> [lines]")
        return None
    n = 10
    filename = args[0]
    if len(args) > 1 and args[1].isdigit():
        n = int(args[1])

    p = Path(ctx.cwd) / filename if not os.path.isabs(filename) else Path(filename)
    if not p.exists():
        print(Fore.RED + f"tail: '{filename}' not found")
        return None
    try:
        all_lines = p.read_text(encoding="utf-8", errors="replace").splitlines()
        lines = all_lines[-n:]
        start = max(len(all_lines) - n, 0) + 1
        for i, line in enumerate(lines, start):
            print(Fore.WHITE + f"  {Fore.CYAN}{i:>4}{Fore.WHITE} │ {line}")
        return "\n".join(lines)
    except Exception as e:
        print(Fore.RED + f"  Error: {e}")
    return None


def register(engine) -> None:
    """Register filesystem commands."""
    commands = [
        Command("pwd", "Print working directory", "pwd", "filesystem", _pwd),
        Command("ls", "List directory contents", "ls [path]", "filesystem", _ls),
        Command("dir", "List directory contents", "dir [path]", "filesystem", _ls),
        Command("tree", "Display directory tree", "tree [path]", "filesystem", _tree),
        Command("cd", "Change directory", "cd <path>", "filesystem", _cd),
        Command("mkdir", "Create directories", "mkdir <dir> ...", "filesystem", _mkdir),
        Command("touch", "Create empty files", "touch <file> ...", "filesystem", _touch),
        Command("cp", "Copy files/directories", "cp <src> <dst>", "filesystem", _cp),
        Command("mv", "Move/rename files", "mv <src> <dst>", "filesystem", _mv),
        Command("rm", "Remove files/directories", "rm <path> [-r]", "filesystem", _rm),
        Command("find", "Find files by pattern", "find <pattern>", "filesystem", _find),
        Command("cat", "Display file contents", "cat <file>", "filesystem", _cat),
        Command("head", "Show first N lines", "head <file> [N]", "filesystem", _head),
        Command("tail", "Show last N lines", "tail <file> [N]", "filesystem", _tail),
    ]
    for cmd in commands:
        engine.register(cmd)
