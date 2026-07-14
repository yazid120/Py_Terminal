"""
Developer utility commands — json-pretty, uuid, base64, hash.
JWT commands deferred (requires PyJWT).
"""

from __future__ import annotations

import base64
import hashlib
import json
import uuid as uuid_mod
from typing import Optional

from colorama import Fore, Style

from engine import Command
from context import ShellContext


def _json_pretty(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Pretty-print a JSON string.  Usage: json-pretty '<json>'"""
    if not args:
        print(Fore.YELLOW + 'Usage: json-pretty \'{"key": "value"}\'')
        return None
    raw = " ".join(args)
    try:
        parsed = json.loads(raw)
        pretty = json.dumps(parsed, indent=2, ensure_ascii=False)
        for line in pretty.splitlines():
            print(Fore.CYAN + f"  {line}")
        return pretty
    except json.JSONDecodeError as e:
        print(Fore.RED + f"  Invalid JSON: {e}")
    return None


def _uuid_gen(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Generate a UUID.  Usage: uuid [count]"""
    count = 1
    if args and args[0].isdigit():
        count = int(args[0])
    for _ in range(count):
        u = str(uuid_mod.uuid4())
        print(Fore.CYAN + f"  {u}")
    return None


def _base64_cmd(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Base64 encode/decode.  Usage: base64 encode|decode <text>"""
    if len(args) < 2:
        print(Fore.YELLOW + "Usage: base64 encode|decode <text>")
        return None

    action = args[0].lower()
    text = " ".join(args[1:])

    if action == "encode":
        result = base64.b64encode(text.encode()).decode()
        print(Fore.CYAN + f"  {result}")
        return result
    elif action == "decode":
        try:
            result = base64.b64decode(text.encode()).decode()
            print(Fore.CYAN + f"  {result}")
            return result
        except Exception as e:
            print(Fore.RED + f"  Decode error: {e}")
    else:
        print(Fore.YELLOW + "Usage: base64 encode|decode <text>")
    return None


def _hash_cmd(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Hash a string.  Usage: hash <algorithm> <text>"""
    available = ["md5", "sha1", "sha256", "sha512"]
    if len(args) < 2:
        print(Fore.YELLOW + f"Usage: hash <{'|'.join(available)}> <text>")
        return None

    algo = args[0].lower()
    text = " ".join(args[1:])

    if algo not in available:
        print(Fore.RED + f"  Unknown algorithm: {algo}")
        print(Fore.YELLOW + f"  Available: {', '.join(available)}")
        return None

    h = hashlib.new(algo)
    h.update(text.encode())
    result = h.hexdigest()
    print(Fore.CYAN + f"  {algo}: {result}")
    return result


def _echo(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Echo text to the terminal. Usage: echo <text>"""
    text = " ".join(args)
    print(Fore.WHITE + text)
    return text


def _vars(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Show all shell variables."""
    if not ctx.variables:
        print(Fore.YELLOW + "  No variables set.")
        return None
    print(Fore.BLUE + Style.BRIGHT + "Shell Variables:")
    for k, v in sorted(ctx.variables.items()):
        print(Fore.CYAN + f"  {k}" + Fore.WHITE + f" = {v}")
    return None


def register(engine) -> None:
    """Register developer utility commands."""
    commands = [
        Command("json-pretty", "Pretty-print JSON", "json-pretty '<json>'", "developer", _json_pretty),
        Command("uuid", "Generate UUID(s)", "uuid [count]", "developer", _uuid_gen),
        Command("base64", "Base64 encode/decode", "base64 encode|decode <text>", "developer", _base64_cmd),
        Command("hash", "Hash a string", "hash md5|sha1|sha256|sha512 <text>", "developer", _hash_cmd),
        Command("echo", "Echo text", "echo <text>", "utility", _echo),
        Command("vars", "Show shell variables", "vars", "utility", _vars),
    ]
    for cmd in commands:
        engine.register(cmd)
