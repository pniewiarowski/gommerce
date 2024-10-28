import { cms } from "../../axios";
import { ThemeDefinition } from "../definition";
import { Repository } from "./type";

class Themes implements Repository {
    private static resource = "themes";

    public async get(token?: string): Promise<Array<ThemeDefinition>> {
        const response = await cms.get(`/${Themes.resource}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        return await response.data.data;
    }

    public async getByID(id: number, token?: string): Promise<ThemeDefinition> {
        const response = await cms.get(`/${Themes.resource}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data.data;
    }

    public async create(entity: ThemeDefinition, token: string): Promise<ThemeDefinition> {
        throw new Error("Method not implemented.");
    }

    public async delete(id: number, token: string): Promise<Array<ThemeDefinition>> {
        throw new Error("Method not implemented.");
    }

    public async update(entity: ThemeDefinition, token: string): Promise<ThemeDefinition> {
        throw new Error("Method not implemented.");
    }
}

export default Themes;
