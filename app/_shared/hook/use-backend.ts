import {
    Authentication,
    Categories,
    Customers,
    Products,
    Users
} from "../api/repository"

interface Repositories {
    categoriesRepository: Categories,
    productRepository: Products,
    customersRepository: Customers,
    usersRepository: Users,
    authRepository: Authentication,
}

let repositories: Repositories | null = null;

const useBackend = (): Repositories => {
    if (!repositories) {
        repositories = {
            categoriesRepository: new Categories(),
            productRepository: new Products(),
            customersRepository: new Customers(),
            usersRepository: new Users(),
            authRepository: new Authentication()
        };
    }

    return repositories;
};

export default useBackend;
