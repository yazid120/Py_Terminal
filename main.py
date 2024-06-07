import sys
import click 
from pyfiglet import Figlet
from colorama import Fore, Style, init

# Initialize colorama
init(autoreset=True)

# Create Figlet object for ASCII art
figlet = Figlet(font='slant')

ascii_art_a = figlet.renderText(f' --- Kevin Mccallister CLi Toolkit ---')
click.echo(Fore.WHITE + Style.BRIGHT + ascii_art_a)

@click.group()
def cli():
    """Kevin Mccallister CLI Toolkit"""
    pass

@click.command()
@click.option('--count', default=1, help='Number of greetings.')
@click.option('--name', prompt='Please enter Your name:', help='The person to greet.')

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
    - greet: Simple program that greets NAME for a total of COUNT times.
    """
    ascii_art_help = figlet.renderText('Help')
    click.echo(Fore.YELLOW + Style.BRIGHT + ascii_art_help)
    click.echo(Fore.CYAN + help_text)

# All the commands to the cli group
cli.add_command(greet)
cli.add_command(calculator)
cli.add_command(help)

if __name__ == '__main__':
    cli()