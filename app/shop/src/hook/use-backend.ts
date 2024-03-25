import {Authentication, Categories, Customers, Users} from "../api/repository"

interface Repositories {
    categoriesRepository: Categories,
    customersRepository: Customers,
    usersRepository: Users,
    authRepository: Authentication,
}

let repositories: Repositories | null = null;

const useBackend = (): Repositories => {
    if (!repositories) {
        repositories = {
            categoriesRepository: new Categories(),
            customersRepository: new Customers(),
            usersRepository: new Users(),
            authRepository: new Authentication()
        };
    }

    return repositories;
};

export default useBackend;
