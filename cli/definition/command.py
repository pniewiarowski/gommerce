from command.base import BaseCommand


class Command:
    def __init__(self, label: str, description: str, scope: str, command: BaseCommand = BaseCommand):
        self.label = label
        self.description = description
        self.scope = scope
        self.command = command
