import os
import sys
import time
import platform
import click 
from pyfiglet import Figlet
from colorama import Fore, Style, init
from click.exceptions import UsageError

# Initialize colorama
init(autoreset=True)

# Create Figlet object for ASCII art
figlet = Figlet(font='slant')

ascii_art_a = figlet.renderText(f' --- Kevin Mccallister CLi Toolkit ---')
click.echo(Fore.WHITE + Style.BRIGHT + ascii_art_a)

rainbow_colors = [Fore.RED, Fore.YELLOW, Fore.GREEN, Fore.CYAN, Fore.BLUE, Fore.MAGENTA]

@click.group()
def cli():
    """Kevin Mccallister CLI Toolkit"""
    pass


@click.command()
def hello():
    ascii_art_hello = figlet.renderText(f'Hello World')
    for i, line in enumerate(ascii_art_hello.split('\n')):
        color = rainbow_colors[i % len(rainbow_colors)]
        click.echo(color + line)

@click.command()
def system_infos(): 
    """ Display the system information"""
    click.echo(Fore.BLUE + 'System Information:')
    click.echo(Fore.CYAN + f'Current Time: {time.ctime()}')
    click.echo(Fore.CYAN + f'OS: {platform.system()}')
    click.echo(Fore.CYAN + f'OS Version: {platform.version()}')
    click.echo(Fore.CYAN + f'Processor: {platform.processor()}')

@click.command()
@click.option('--count', default=1, help='Number of greetings.')
@click.option('--name', prompt='Please enter Your name', help='The person to greet.')
def greet(count, name):
    """Simple program that greets NAME for a total of COUNT times."""
    for _ in range(count):
        ascii_art = figlet.renderText(f'Hello, {name} !')
        click.echo(Fore.GREEN + Style.BRIGHT  + ascii_art)

@click.command()
@click.option('--operation', type=click.Choice(['+','-','*','/','%'], case_sensitive=False), 
prompt='Operation (+, -, *, /, %)', help='Arithmetic operation')
@click.option('--x', type=float, prompt='First operand', help='The first operand')
@click.option('--y', type=float, prompt='Second operand', help='The second operand')
def calculator(operation, x , y):
    """Simple calculator that performs basic arithmetic operations."""
    if operation == '+':
        result = x + y
    elif operation == '-':
        result = x - y
    elif operation == '*':
        result = x * y
    elif operation == '/':
        if y != 0:
            result = x / y
        else:
            click.echo(Fore.RED + 'Error: Division by zero.')
            return
    elif operation == '%':
        if y != 0:
            result = x % y
        else:
            click.echo(Fore.RED + 'Error: Division by zero.')
            return
    click.echo(Fore.BLUE + Style.BRIGHT + f'Result: {result}')

# print(sys.argv)
@click.command()
def help():
    """Show help for all commands"""
    help_text = """
    Kevin Mccallister CLI Toolkit

    Available Commands:
    - hello_world: Display 'Hello World'.
    - system_infos: Displays current time, operating system, OS version, and processor information.
    - greet: Simple program that greets NAME for a total of COUNT times.
    - calculator: Simple calculator that performs basic arithmetic operations.
    """
    ascii_art_help = figlet.renderText('Help')
    click.echo(Fore.YELLOW + Style.BRIGHT + ascii_art_help)
    click.echo(Fore.CYAN + help_text)

# All the commands to the cli group
cli.add_command(hello)
cli.add_command(system_infos)
cli.add_command(greet)
cli.add_command(calculator)
cli.add_command(help)

# Interactive REPL loop
def repl():
    is_running = True
    while is_running:
        command = input(Fore.CYAN + 'Enter command (type "exit" to quit): ')
        if command.lower() == 'exit':
            is_running = False
            continue
        try:
            cli.main(args=command.split(), standalone_mode=False)
        except UsageError as e:
            click.echo(Fore.RED + f'Error: {e}')
        except SystemExit as e:
            pass

if __name__ == '__main__':
    repl()