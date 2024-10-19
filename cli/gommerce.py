import sys

from rich.console import Console
from rich.table import Table

from command.error import CommandNotExistsError, CommandIncorrectUsage, ServiceAlreadyExists, ServiceDoesNotExists
from command.error import ResourceAlreadyExists
from command.resolver import Resolver as CommandResolver
from command.base import BaseCommand
from command.command import print_registered_commands


def main() -> None:
    console: Console = Console()

    if len(sys.argv) > 1:
        try:
            resolver = CommandResolver(sys.argv)
            command: BaseCommand = resolver.get_command()
            message: str = command.execute()

            console.print(f'\n{message}\n', style="green")
        except CommandNotExistsError:
            console.print('\nUsed command are not registered in CLI\n', style="red")
        except CommandIncorrectUsage:
            console.print('\nIncorrect usage of CLI, read command definition\n', style="red")
        except ServiceAlreadyExists:
            console.print(f'\nService {sys.argv[2]} already exists under project\n', style="red")
        except ResourceAlreadyExists:
            console.print(f'\nResource {sys.argv[3]} already exists under {sys.argv[2]} service\n', style="red")
        except ServiceDoesNotExists:
            console.print(f'\nService {sys.argv[2]} does not exists\n', style="red")
        return

    print_registered_commands()


if __name__ == '__main__':
    main()
