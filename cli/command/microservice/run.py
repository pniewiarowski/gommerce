import sys
import os
import subprocess

from command.base import BaseCommand
from command.error import CommandIncorrectUsage, ServiceDoesNotExists

from command.tool import get_path_to_gommerce

class Run(BaseCommand):
    path: str

    def execute(self) -> str:
        if len(sys.argv) <= 2:
            raise CommandIncorrectUsage

        microservice_name: str = sys.argv[2]
        self.path = f'{get_path_to_gommerce()}{os.sep}api{os.sep}{microservice_name}'
        if not os.path.exists(self.path):
            raise ServiceDoesNotExists

        go_run = f'go run .'
        subprocess.call(go_run, cwd=self.path, shell=True)

        return f'Microservice {microservice_name} is running...'
