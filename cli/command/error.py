class CommandNotExistsError(Exception):
    pass


class CommandIncorrectUsage(Exception):
    pass


class ServiceAlreadyExists(Exception):
    pass


class ServiceDoesNotExists(Exception):
    pass


class ResourceAlreadyExists(Exception):
    pass
