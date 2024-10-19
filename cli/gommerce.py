from rich.console import Console


def main() -> None:
    console: Console = Console()
    console.print('Gommerce CLI', style='bold purple')


if __name__ == '__main__':
    main()
