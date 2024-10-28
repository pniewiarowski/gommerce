import { SettingDefinition } from "../definition";
import { Repository } from "./type";

class Settings implements Repository {
    get(token?: string): Promise<Array<SettingDefinition>> {
        throw new Error("Method not implemented.");
    }

    getByID(id: number, token?: string): Promise<SettingDefinition> {
        throw new Error("Method not implemented.");
    }

    create(entity: SettingDefinition, token: string): Promise<SettingDefinition> {
        throw new Error("Method not implemented.");
    }

    delete(id: number, token: string): Promise<Array<SettingDefinition>> {
        throw new Error("Method not implemented.");
    }

    update(entity: SettingDefinition, token: string): Promise<SettingDefinition> {
        throw new Error("Method not implemented.");
    }
}

export default Settings;
