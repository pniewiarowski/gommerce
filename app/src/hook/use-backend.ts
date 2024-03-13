import {
    Categories,
} from "../api/repository"

interface Repositories {
    categoriesRepository: Categories,
}

let repositories: Repositories | null = null;

const useBackend = (): Repositories => {
    if (!repositories) {
        repositories = {
            categoriesRepository: new Categories(),
        };
    }

    return repositories;
};

export default useBackend;
