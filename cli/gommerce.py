from rich.console import Console
from rich.table import Table

from definition.command import Command

COMMANDS: list = [
    Command('microservice:create {name}', 'create new service with provided name from structure', 'microservice'),
    Command('microservice:delete {name}', 'delete service by name from structure', 'microservice'),
    Command('microservice:run {name}', 'run service with given name on local machine', 'microservice'),
    Command('resource:create {service} {resource}', 'create resource for provided microservice', 'resource'),
    Command('resource:delete {service} {resource}', 'delete resource by microservice and resource name', 'resource'),
]


def main() -> None:
    console: Console = Console()
    console.print('Gommerce CLI', style='bold purple')

    table = Table(show_header=False)

    table.add_column('command', justify='right', style='color(5)')
    table.add_column('description', justify='left', style='color(6)')
    table.add_column('scope', justify='left', style='color(4)')

    for command in COMMANDS:
        table.add_row(command.label, command.description, command.scope)

    console.print(table)


if __name__ == '__main__':
    main()
