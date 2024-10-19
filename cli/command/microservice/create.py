import sys
import os
import shutil
import subprocess

from command.base import BaseCommand
from command.error import CommandIncorrectUsage, ServiceAlreadyExists
from command.tool import get_path_to_gommerce


class Create(BaseCommand):
    path: str

    def __make_service_dir(self) -> None:
        if os.path.exists(self.path):
            raise ServiceAlreadyExists()

        os.makedirs(self.path)

    def __make_service_dirs(self) -> None:
        os.makedirs(f'{self.path}{os.sep}route')
        os.makedirs(f'{self.path}{os.sep}model')
        os.makedirs(f'{self.path}{os.sep}controller')
        os.makedirs(f'{self.path}{os.sep}app')
        os.makedirs(f'{self.path}{os.sep}request')
        os.makedirs(f'{self.path}{os.sep}response')
        os.makedirs(f'{self.path}{os.sep}dto')
        os.makedirs(f'{self.path}{os.sep}helper')
        os.makedirs(f'{self.path}{os.sep}middleware')

    def __make_main(self) -> None:
        template = f'{get_path_to_gommerce()}{os.sep}cli{os.sep}template{os.sep}go{os.sep}main.go'
        new_file = f'{self.path}{os.sep}main.go'

        with open(template) as file:
            data: str = file.read()
            data = data.replace('{{service_name}}', sys.argv[2])

        with open(new_file, mode='w') as file:
            file.write(data)

    def __make_app_run(self) -> None:
        template = f'{get_path_to_gommerce()}{os.sep}cli{os.sep}template{os.sep}go{os.sep}app{os.sep}run.go'
        new_file = f'{self.path}{os.sep}app{os.sep}run.go'
        open(new_file, mode='w')
        shutil.copyfile(template, new_file)

    def __make_env(self) -> None:
        template = f'{get_path_to_gommerce()}{os.sep}cli{os.sep}template{os.sep}go{os.sep}.env'
        new_file = f'{self.path}{os.sep}.env'
        open(new_file, mode='w')
        shutil.copyfile(template, new_file)

    def execute(self) -> str:
        if len(sys.argv) <= 2:
            raise CommandIncorrectUsage

        microservice_name: str = sys.argv[2]
        self.path = f'{get_path_to_gommerce()}{os.sep}api{os.sep}{microservice_name}'
        self.__make_service_dir()
        self.__make_service_dirs()
        self.__make_main()
        self.__make_app_run()
        self.__make_env()

        go_mod_init: str = f'go mod init github.com/pniewiarowski/gommerce/api/{microservice_name}';
        go_mod_tidy: str = f'go mod tidy'
        subprocess.call(go_mod_init, cwd=self.path, shell=True)
        subprocess.call(go_mod_tidy, cwd=self.path, shell=True)

        return f'Declared microservice {microservice_name}'
