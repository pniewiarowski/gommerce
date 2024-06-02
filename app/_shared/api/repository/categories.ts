import { shop } from "../../axios";
import { CategoryDefinition, ProductDefinition, ResourceInfoDefinition } from "../definition";
import { Repository } from "./type";

class Categories implements Repository {
    private static resource = "categories";

    public async get(): Promise<Array<CategoryDefinition>> {
        const response = await shop.get(`/${Categories.resource}`);

        return await response.data;
    }

    public async getByID(id: number): Promise<CategoryDefinition> {
        const response = await shop.get(`/${Categories.resource}/${id}`);

        return await response.data;
    }

    public async getResourceInfo(token: string): Promise<ResourceInfoDefinition> {
        const response = await shop.get(`${Categories.resource}/resource-info`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }

    public async create(category: CategoryDefinition, token: string): Promise<CategoryDefinition> {
        const response = await shop.post(`/${Categories.resource}`,
            {
                name: category.name,
                description: category.description,
                enabled: category.enabled,
                sortOrder: category.sortOrder,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await response.data;
    }

    public async delete(id: number, token: string): Promise<Array<CategoryDefinition>> {
        const response = await shop.delete(`/${Categories.resource}/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await response.data;
    }

    public async update(category: CategoryDefinition, token: string): Promise<CategoryDefinition> {
        const response = await shop.put(`/${Categories.resource}/${category.id}`,
            {
                name: category.name,
                description: category.description,
                enabled: category.enabled,
                sortOrder: category.sortOrder,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await response.data;
    }

    public async getProducts(id: number): Promise<Array<ProductDefinition>> {
        const respnse = await shop.get(`/${Categories.resource}/${id}/products`);

        return await respnse.data;
    }
}

export default Categories;
