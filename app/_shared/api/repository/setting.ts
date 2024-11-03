import { SettingDefinition } from "../definition";
import { Repository } from "./type";
import { cms } from "../../axios";

class Settings implements Repository {
    private static resource = "settings";

    public async get(token?: string): Promise<Array<SettingDefinition>> {
        const response = await cms.get(`/${Settings.resource}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        return await response.data.data;
    }

    public async getByID(id: number, token?: string): Promise<SettingDefinition> {
        const response = await cms.get(`/${Settings.resource}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        return await response.data.data;
    }

    public async create(entity: SettingDefinition, token: string): Promise<SettingDefinition> {
        throw new Error("Method not implemented.");
    }

    public async delete(id: number, token: string): Promise<Array<SettingDefinition>> {
        throw new Error("Method not implemented.");
    }

    public async update(setting: SettingDefinition, token: string): Promise<SettingDefinition> {
        const response = await cms.put(`/${Settings.resource}/${setting.id}`,
            {
                "id": setting.id,
                "key": setting.key,
                "value": setting.value,
                "type": setting.type,
                "description": setting.description,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        return await response.data.data;
    }
}

export default Settings;
