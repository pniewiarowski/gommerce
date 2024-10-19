import sys
import os
import shutil
import subprocess

from command.base import BaseCommand
from command.error import CommandIncorrectUsage, ServiceDoesNotExists, ResourceAlreadyExists
from command.tool import get_path_to_gommerce


class Create(BaseCommand):
    path: str
    resource: str

    def __make_model(self) -> None:
        template = f'{get_path_to_gommerce()}{os.sep}cli{os.sep}template{os.sep}go{os.sep}model{os.sep}base.go'
        new_file = f'{self.path}{os.sep}model{os.sep}{self.resource}.go'

        with open(template) as file:
            data: str = file.read()
            data = data.replace('{{model}}', self.resource.title())

        with open(new_file, mode='w') as file:
            file.write(data)

    def __make_dto(self) -> None:
        template = f'{get_path_to_gommerce()}{os.sep}cli{os.sep}template{os.sep}go{os.sep}dto{os.sep}base.go'
        new_file = f'{self.path}{os.sep}dto{os.sep}{self.resource}-dto.go'

        with open(template) as file:
            data: str = file.read()
            data = data.replace('{{model}}', self.resource.title())

        with open(new_file, mode='w') as file:
            file.write(data)

    def __make_controller(self) -> None:
        template = f'{get_path_to_gommerce()}{os.sep}cli{os.sep}template{os.sep}go{os.sep}controller{os.sep}base.go'
        new_file = f'{self.path}{os.sep}controller{os.sep}{self.resource}-controller.go'

        with open(template) as file:
            data: str = file.read()
            data = data.replace('{{model}}', self.resource.title())
            data = data.replace('{{model_first_letter}}', self.resource[0])
            data = data.replace('{{service_name}}', sys.argv[2])

        with open(new_file, mode='w') as file:
            file.write(data)

    def __make_route(self) -> None:
        template = f'{get_path_to_gommerce()}{os.sep}cli{os.sep}template{os.sep}go{os.sep}route{os.sep}base.go'
        new_file = f'{self.path}{os.sep}route{os.sep}{self.resource}-route.go'

        with open(template) as file:
            data: str = file.read()
            data = data.replace('{{model}}', self.resource.title())
            data = data.replace('{{service_name}}', sys.argv[2])

        with open(new_file, mode='w') as file:
            file.write(data)

    def execute(self) -> str:
        if len(sys.argv) <= 3:
            raise CommandIncorrectUsage

        microservice_name: str = sys.argv[2]

        self.resource = sys.argv[3].replace('-', '')
        self.path = f'{get_path_to_gommerce()}{os.sep}api{os.sep}{microservice_name}'
        if not os.path.exists(self.path):
            raise ServiceDoesNotExists()

        model_path = f'{self.path}{os.sep}model{os.sep}{self.resource}.go'
        if os.path.exists(model_path):
            raise ResourceAlreadyExists()

        self.__make_model()
        self.__make_dto()
        self.__make_controller()
        self.__make_route()

        return f'Declared resource {sys.argv[3]} under {sys.argv[2]} microservice'
