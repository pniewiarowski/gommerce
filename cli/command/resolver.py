from .base import BaseCommand
from .command import commands
from .error import CommandNotExistsError


class Resolver:
    def __init__(self, args: list):
        self.args = args
        self.command = None
        self.__resolve()

    def __resolve(self):
        for command in commands():
            if command.definition == self.args[1]:
                self.command = command.command

        if self.command is None:
            raise CommandNotExistsError()

    def get_command(self) -> BaseCommand:
        return self.command
