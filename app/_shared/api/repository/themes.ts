import { ThemeDefinition } from "../definition";
import { Repository } from "./type";

class Themes implements Repository {
    get(token?: string): Promise<Array<ThemeDefinition>> {
        throw new Error("Method not implemented.");
    }

    getByID(id: number, token?: string): Promise<ThemeDefinition> {
        throw new Error("Method not implemented.");
    }

    create(entity: ThemeDefinition, token: string): Promise<ThemeDefinition> {
        throw new Error("Method not implemented.");
    }

    delete(id: number, token: string): Promise<Array<ThemeDefinition>> {
        throw new Error("Method not implemented.");
    }

    update(entity: ThemeDefinition, token: string): Promise<ThemeDefinition> {
        throw new Error("Method not implemented.");
    }
}

export default Themes;
