import sys
import click 
from pyfiglet import Figlet
from colorama import Fore, Style, init

# Initialize colorama
init(autoreset=True)

# Create Figlet object for ASCII art
figlet = Figlet(font='slant')

ascii_art_a = figlet.renderText(f'Kevin Mccallister CLi Toolkit')
click.echo(Fore.WHITE + Style.BRIGHT + ascii_art_a)

@click.command()
@click.option('--count', default=1, help='Number of greetings.')
@click.option('--name', prompt='Your name', help='The person to greet.')
def greet(count, name):
    """Simple program that greets NAME for a total of COUNT times."""
    for _ in range(count):
        ascii_art_a = figlet.renderText(f'Kevin Mccallister CLi Toolkit')
        ascii_art = figlet.renderText(f'Hello, {name}!')
        click.echo(Fore.GREEN + Style.BRIGHT  + ascii_art)

# print(sys.argv)

if __name__ == '__main__':
    greet()