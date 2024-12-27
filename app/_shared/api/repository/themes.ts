import { ThemeDefinition } from "../definition";
import { Repository } from "./type";
import { cms } from "../../axios";

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
        const response = await cms.get(`/${Themes.resource}/${id}`);

        return response.data.data;
    }

    public async create(theme: ThemeDefinition, token: string): Promise<ThemeDefinition> {
        const response = await cms.post(`/${Themes.resource}`,
            {
                "title": theme.title,
                "mode": theme.mode,
                "applicationTitle": theme.applicationTitle,
                "primaryColor": theme.primaryColor,
                "secondaryColor": theme.secondaryColor,
                "errorColor": theme.errorColor,
                "successColor": theme.successColor,
                "warningColor": theme.warningColor,
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

    public async delete(id: number, token: string): Promise<Array<ThemeDefinition>> {
        const response = await cms.delete(`/${Themes.resource}/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return await response.data.data;
    }

    public async update(theme: ThemeDefinition, token: string): Promise<ThemeDefinition> {
        const response = await cms.put(`/${Themes.resource}/${theme.id}`,
            {
                "id": theme.id,
                "title": theme.title,
                "mode": theme.mode,
                "applicationTitle": theme.applicationTitle,
                "primaryColor": theme.primaryColor,
                "secondaryColor": theme.secondaryColor,
                "errorColor": theme.errorColor,
                "successColor": theme.successColor,
                "warningColor": theme.warningColor,
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

export default Themes;
