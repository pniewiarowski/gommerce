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
        definition='microservice:create',
        description='create new service with provided name from structure',
        scope='microservice',
        command=CreateMicroservice(),
    ),
    Command(
        label='microservice:delete {name}',
        definition='microservice:delete',
        description='delete service by name from structure',
        scope='microservice',
        command=DeleteMicroservice(),
    ),
    Command(
        label='microservice:run {name}',
        definition='microservice:run',
        description='run service with given name on local machine',
        scope='microservice',
        command=RunMicroservice(),
    ),
    Command(
        label='resource:create {service} {resource}',
        definition='resource:create',
        description='create resource for provided microservice',
        scope='resource',
        command=CreateResource(),
    ),
    Command(
        label='resource:delete {service} {resource}',
        definition='resource:delete',
        description='delete resource by microservice and resource name',
        scope='resource',
        command=DeleteResource(),
    ),
]


def commands() -> list:
    return COMMANDS


def print_registered_commands() -> None:
    console: Console = Console()
    console.print('\nGommerce CLI [All registered commands]', style='bold purple')

    table = Table(show_header=False)
    table.add_column('command.py', justify='left', style='color(5)')
    table.add_column('description', justify='left', style='color(6)')
    table.add_column('scope', justify='left', style='color(4)')

    for command in commands():
        table.add_row(command.label, command.description, command.scope)

    console.print(table)
    console.print('')
