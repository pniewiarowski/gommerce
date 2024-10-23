import sys
import os
import shutil

from command.base import BaseCommand
from command.error import CommandIncorrectUsage, ServiceDoesNotExists

from command.tool import get_path_to_gommerce


class Delete(BaseCommand):
    path: str

    def execute(self) -> str:
        if len(sys.argv) <= 2:
            raise CommandIncorrectUsage

        microservice_name: str = sys.argv[2]
        self.path = f'{get_path_to_gommerce()}{os.sep}api{os.sep}{microservice_name}'

        if not os.path.exists(self.path):
            raise ServiceDoesNotExists

        shutil.rmtree(self.path)
        return f'Microservice {microservice_name} deleted from system.'
