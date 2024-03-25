import {
    Authentication,
    Categories, Customers,
} from "../api/repository"

interface Repositories {
    categoriesRepository: Categories,
    customersRepository: Customers,
    authRepository: Authentication,
}

let repositories: Repositories | null = null;

const useBackend = (): Repositories => {
    if (!repositories) {
        repositories = {
            categoriesRepository: new Categories(),
            customersRepository: new Customers(),
            authRepository: new Authentication()
        };
    }

    return repositories;
};

export default useBackend;
