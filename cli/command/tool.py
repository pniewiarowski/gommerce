import os


def get_path_to_gommerce() -> str:
    path = os.path.realpath(__file__)
    for i in range(3):
        path = os.path.dirname(path)

    return path
