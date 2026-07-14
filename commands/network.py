"""
Network commands — ping, dns, ports, ip.
"""

from __future__ import annotations

import socket
import subprocess
import platform
from typing import Optional

from colorama import Fore, Style

from engine import Command
from context import ShellContext


def _ping(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Ping a host.  Usage: ping <host> [count]"""
    if not args:
        print(Fore.YELLOW + "Usage: ping <host> [count]")
        return None

    host = args[0]
    count = 4
    if len(args) > 1 and args[1].isdigit():
        count = int(args[1])

    flag = "-n" if platform.system() == "Windows" else "-c"
    print(Fore.BLUE + Style.BRIGHT + f"Pinging {host} ({count} packets)...")

    try:
        result = subprocess.run(
            ["ping", flag, str(count), host],
            capture_output=True, text=True, timeout=30,
        )
        for line in result.stdout.splitlines():
            if "time" in line.lower() or "ttl" in line.lower():
                print(Fore.GREEN + f"  {line.strip()}")
            elif "request timed out" in line.lower() or "unreachable" in line.lower():
                print(Fore.RED + f"  {line.strip()}")
            else:
                print(Fore.CYAN + f"  {line.strip()}")
        return result.stdout
    except subprocess.TimeoutExpired:
        print(Fore.RED + "  Ping timed out.")
    except FileNotFoundError:
        print(Fore.RED + "  ping command not found.")
    return None


def _dns(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """DNS lookup.  Usage: dns <hostname>"""
    if not args:
        print(Fore.YELLOW + "Usage: dns <hostname>")
        return None

    host = args[0]
    print(Fore.BLUE + Style.BRIGHT + f"DNS lookup: {host}")
    try:
        results = socket.getaddrinfo(host, None)
        seen: set[str] = set()
        for family, _, _, _, sockaddr in results:
            ip = sockaddr[0]
            if ip in seen:
                continue
            seen.add(ip)
            fam = "IPv4" if family == socket.AF_INET else "IPv6"
            print(Fore.CYAN + f"  {fam}: {ip}")
        return ", ".join(seen)
    except socket.gaierror as e:
        print(Fore.RED + f"  DNS error: {e}")
    return None


def _ports(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Scan common ports on a host.  Usage: ports <host> [start-end]"""
    if not args:
        print(Fore.YELLOW + "Usage: ports <host> [start-end]")
        return None

    host = args[0]
    port_range = (1, 1024)
    if len(args) > 1 and "-" in args[1]:
        parts = args[1].split("-")
        try:
            port_range = (int(parts[0]), int(parts[1]))
        except ValueError:
            pass

    print(Fore.BLUE + Style.BRIGHT + f"Scanning {host} ports {port_range[0]}-{port_range[1]}...")
    open_ports: list[int] = []

    for port in range(port_range[0], min(port_range[1] + 1, port_range[0] + 100)):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.settimeout(0.5)
                if s.connect_ex((host, port)) == 0:
                    open_ports.append(port)
                    service = _get_service_name(port)
                    print(Fore.GREEN + f"  Port {port:<6} OPEN  ({service})")
        except Exception:
            pass

    if not open_ports:
        print(Fore.YELLOW + "  No open ports found in scanned range.")
    return None


def _get_service_name(port: int) -> str:
    """Try to resolve a port number to a service name."""
    try:
        return socket.getservbyport(port)
    except OSError:
        return "unknown"


def _ip(ctx: ShellContext, args: list[str]) -> Optional[str]:
    """Show local IP addresses."""
    print(Fore.BLUE + Style.BRIGHT + "IP Addresses:")
    hostname = socket.gethostname()
    print(Fore.CYAN + f"  Hostname: {hostname}")

    try:
        # Get all addresses
        addrs = socket.getaddrinfo(hostname, None)
        seen: set[str] = set()
        for family, _, _, _, sockaddr in addrs:
            addr = sockaddr[0]
            if addr in seen or addr.startswith("fe80"):
                continue
            seen.add(addr)
            fam = "IPv4" if family == socket.AF_INET else "IPv6"
            print(Fore.CYAN + f"  {fam}: {addr}")
    except Exception:
        pass

    # Try to get the primary outbound IP
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            primary = s.getsockname()[0]
            print(Fore.GREEN + Style.BRIGHT + f"  Primary: {primary}")
    except Exception:
        pass

    return None


def register(engine) -> None:
    """Register network commands."""
    commands = [
        Command("ping", "Ping a host", "ping <host> [count]", "network", _ping),
        Command("dns", "DNS lookup", "dns <hostname>", "network", _dns),
        Command("ports", "Scan ports on a host", "ports <host> [start-end]", "network", _ports),
        Command("ip", "Show local IP addresses", "ip", "network", _ip),
    ]
    for cmd in commands:
        engine.register(cmd)
