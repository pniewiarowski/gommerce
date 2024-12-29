import {
    Authentication,
    Categories,
    Customers,
    Products,
    Orders,
    Users,
    Themes,
    Settings,
    Addresses,
} from "../api/repository"

interface Repositories {
    categoriesRepository: Categories,
    productRepository: Products,
    ordersRepository: Orders,
    customersRepository: Customers,
    usersRepository: Users,
    authRepository: Authentication,
    themeRepository: Themes,
    settingRepository: Settings,
    addressesRepository: Addresses,
}

let repositories: Repositories | null = null;

const useBackend = (): Repositories => {
    if (!repositories) {
        repositories = {
            categoriesRepository: new Categories(),
            productRepository: new Products(),
            customersRepository: new Customers(),
            ordersRepository: new Orders(),
            usersRepository: new Users(),
            authRepository: new Authentication(),
            themeRepository: new Themes(),
            settingRepository: new Settings(),
            addressesRepository: new Addresses(),
        };
    }

    return repositories;
};

export default useBackend;
