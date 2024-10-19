import sys
import os
import shutil

from command.base import BaseCommand
from command.error import CommandIncorrectUsage, ServiceAlreadyExists
from command.tool import get_path_to_gommerce


class Create(BaseCommand):
    path: str

    def __make_service_dir(self):
        if os.path.exists(self.path):
            raise ServiceAlreadyExists()

        os.makedirs(self.path)

    def __make_service_dirs(self):
        os.makedirs(f'{self.path}{os.sep}route')
        os.makedirs(f'{self.path}{os.sep}model')
        os.makedirs(f'{self.path}{os.sep}controller')
        os.makedirs(f'{self.path}{os.sep}app')
        os.makedirs(f'{self.path}{os.sep}request')
        os.makedirs(f'{self.path}{os.sep}response')
        os.makedirs(f'{self.path}{os.sep}dto')
        os.makedirs(f'{self.path}{os.sep}helper')
        os.makedirs(f'{self.path}{os.sep}middleware')

    def __make_main(self):
        template = f'{get_path_to_gommerce()}{os.sep}cli{os.sep}template{os.sep}go{os.sep}main.go'
        new_file = f'{self.path}{os.sep}main.go'
        open(new_file, mode='w')
        shutil.copyfile(template, new_file)

    def __make_app_run(self):
        template = f'{get_path_to_gommerce()}{os.sep}cli{os.sep}template{os.sep}go{os.sep}app{os.sep}run.go'
        new_file = f'{self.path}{os.sep}app{os.sep}run.go'
        open(new_file, mode='w')
        shutil.copyfile(template, new_file)

    def execute(self, data: list = []) -> str:
        if len(sys.argv) <= 2:
            raise CommandIncorrectUsage

        microservice_name: str = sys.argv[2]
        self.path = f'{get_path_to_gommerce()}{os.sep}api{os.sep}{microservice_name}'
        self.__make_service_dir()
        self.__make_service_dirs()
        self.__make_main()
        self.__make_app_run()

        return f'Declared microservice {microservice_name}'
