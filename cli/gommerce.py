from rich.console import Console
from rich.table import Table

from definition.command import Command
from command.microservice.create import Create as CreateMicroservice
from command.microservice.delete import Delete as DeleteMicroservice
from command.microservice.run import Run as RunMicroservice
from command.resource.create import Create as CreateResource
from command.resource.delete import Delete as DeleteResource

COMMANDS: list = [
    Command(
        label='microservice:create {name}',
        description='create new service with provided name from structure',
        scope='microservice',
        command=CreateMicroservice(),
    ),
    Command(
        label='microservice:delete {name}',
        description='delete service by name from structure',
        scope='microservice',
        command=DeleteMicroservice(),
    ),
    Command(
        label='microservice:run {name}',
        description='run service with given name on local machine',
        scope='microservice',
        command=RunMicroservice(),
    ),
    Command(
        label='resource:create {service} {resource}',
        description='create resource for provided microservice',
        scope='resource',
        command=CreateResource(),
    ),
    Command(
        label='resource:delete {service} {resource}',
        description='delete resource by microservice and resource name',
        scope='resource',
        command=DeleteResource(),
    ),
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
