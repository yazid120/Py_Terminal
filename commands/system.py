"""
System commands — system info, CPU, memory, disk, battery, processes, env, clear, exit.
"""

from __future__ import annotations

import os
import time
import platform
from typing import Optional

import psutil
from colorama import Fore, Style

from engine import Command
from context import ShellContext


def _system_info(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Display system information."""
    print(Fore.BLUE + Style.BRIGHT + "System Information:")
    info = [
        f"  Current Time : {time.ctime()}",
        f"  OS           : {platform.system()} {platform.release()}",
        f"  OS Version   : {platform.version()}",
        f"  Architecture : {platform.machine()}",
        f"  Processor    : {platform.processor()}",
        f"  Python       : {platform.python_version()}",
        f"  Hostname     : {ctx.hostname}",
        f"  Username     : {ctx.username}",
    ]
    for line in info:
        print(Fore.CYAN + line)
    return "\n".join(info)


def _cpu(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Show CPU usage per core."""
    print(Fore.BLUE + Style.BRIGHT + "CPU Usage:")
    percents = psutil.cpu_percent(interval=1, percpu=True)
    for i, pct in enumerate(percents):
        bar_len = int(pct / 5)
        bar = "█" * bar_len + "░" * (20 - bar_len)
        color = Fore.GREEN if pct < 60 else (Fore.YELLOW if pct < 85 else Fore.RED)
        print(f"  Core {i:<3} {color}[{bar}] {pct:5.1f}%{Style.RESET_ALL}")
    avg = psutil.cpu_percent()
    print(Fore.CYAN + f"  Average: {avg:.1f}%")
    return None


def _memory(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Show RAM usage."""
    mem = psutil.virtual_memory()
    used_gb = mem.used / (1024 ** 3)
    total_gb = mem.total / (1024 ** 3)
    pct = mem.percent
    bar_len = int(pct / 5)
    bar = "█" * bar_len + "░" * (20 - bar_len)
    color = Fore.GREEN if pct < 60 else (Fore.YELLOW if pct < 85 else Fore.RED)
    print(Fore.BLUE + Style.BRIGHT + "Memory Usage:")
    print(f"  {color}[{bar}] {pct:.1f}%{Style.RESET_ALL}")
    print(Fore.CYAN + f"  Used : {used_gb:.2f} GB / {total_gb:.2f} GB")
    return None


def _disk(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Show disk partitions and usage."""
    print(Fore.BLUE + Style.BRIGHT + "Disk Usage:")
    for part in psutil.disk_partitions():
        try:
            usage = psutil.disk_usage(part.mountpoint)
            pct = usage.percent
            bar_len = int(pct / 5)
            bar = "█" * bar_len + "░" * (20 - bar_len)
            color = Fore.GREEN if pct < 60 else (Fore.YELLOW if pct < 85 else Fore.RED)
            total_gb = usage.total / (1024 ** 3)
            used_gb = usage.used / (1024 ** 3)
            print(f"  {Fore.WHITE}{part.mountpoint:<12} {color}[{bar}] {pct:5.1f}%  {used_gb:.1f}/{total_gb:.1f} GB{Style.RESET_ALL}")
        except PermissionError:
            print(f"  {Fore.WHITE}{part.mountpoint:<12} {Fore.RED}[access denied]{Style.RESET_ALL}")
    return None


def _battery(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Show battery status."""
    bat = psutil.sensors_battery()
    if bat is None:
        print(Fore.YELLOW + "  No battery detected (desktop system).")
        return None
    pct = bat.percent
    plugged = "Plugged in" if bat.power_plugged else "On battery"
    bar_len = int(pct / 5)
    bar = "█" * bar_len + "░" * (20 - bar_len)
    color = Fore.GREEN if pct > 50 else (Fore.YELLOW if pct > 20 else Fore.RED)
    print(Fore.BLUE + Style.BRIGHT + "Battery:")
    print(f"  {color}[{bar}] {pct:.0f}%  ({plugged}){Style.RESET_ALL}")
    return None


def _processes(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Show top processes by CPU usage."""
    count = 10
    if args and args[0].isdigit():
        count = int(args[0])

    print(Fore.BLUE + Style.BRIGHT + f"Top {count} Processes (by CPU):")
    print(Fore.WHITE + f"  {'PID':<8} {'CPU%':<8} {'MEM%':<8} {'Name'}")
    print(Fore.WHITE + "  " + "-" * 50)

    procs = []
    for p in psutil.process_iter(["pid", "name", "cpu_percent", "memory_percent"]):
        try:
            info = p.info
            procs.append(info)
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass

    procs.sort(key=lambda x: x.get("cpu_percent", 0) or 0, reverse=True)
    for proc in procs[:count]:
        pid = proc.get("pid", "?")
        name = proc.get("name", "?")
        cpu = proc.get("cpu_percent", 0) or 0
        mem = proc.get("memory_percent", 0) or 0
        print(Fore.CYAN + f"  {pid:<8} {cpu:<8.1f} {mem:<8.1f} {name}")
    return None


def _env(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Show environment variables. Optional: env <filter>"""
    filter_str = args[0].lower() if args else ""
    print(Fore.BLUE + Style.BRIGHT + "Environment Variables:")
    for key, val in sorted(ctx.env_vars.items()):
        if filter_str and filter_str not in key.lower():
            continue
        print(Fore.CYAN + f"  {key}" + Fore.WHITE + f" = {val}")
    return None


def _clear(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Clear the terminal screen."""
    os.system("cls" if os.name == "nt" else "clear")
    return None


def _exit_shell(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Exit the shell."""
    ctx.running = False
    print(Fore.YELLOW + "Goodbye!")
    return None


def register(engine) -> None:
    """Register system commands with the engine."""
    commands = [
        Command("system-info", "Display system information", "system-info", "system", _system_info),
        Command("cpu", "Show CPU usage per core", "cpu", "system", _cpu),
        Command("memory", "Show RAM usage", "memory", "system", _memory),
        Command("disk", "Show disk partitions and usage", "disk", "system", _disk),
        Command("battery", "Show battery status", "battery", "system", _battery),
        Command("processes", "Show top processes by CPU", "processes [count]", "system", _processes),
        Command("env", "Show environment variables", "env [filter]", "system", _env),
        Command("clear", "Clear the terminal screen", "clear", "system", _clear),
        Command("cls", "Clear the terminal screen", "cls", "system", _clear),
        Command("exit", "Exit the shell", "exit", "system", _exit_shell),
        Command("quit", "Exit the shell", "quit", "system", _exit_shell),
    ]
    for cmd in commands:
        engine.register(cmd)
