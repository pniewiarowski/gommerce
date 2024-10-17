import { ProductDefinition, ResourceInfoDefinition } from "../definition";
import { shop } from "../../axios";
import { Repository } from "./type";

class Products implements Repository {
    private static resource = "products";

    public async get(): Promise<Array<ProductDefinition>> {
        const response = await shop.get(`${Products.resource}`);

        return response.data.data;
    }

    public async getByID(id: number): Promise<ProductDefinition> {
        const response = await shop.get(`/${Products.resource}/${id}`);

        return await response.data.data;
    }

    public async getResourceInfo(token: string): Promise<ResourceInfoDefinition> {
        const response = await shop.get(`${Products.resource}/resource-info`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    }

    public async create(product: ProductDefinition, token: string): Promise<ProductDefinition> {
        const response = await shop.post(`/${Products.resource}`,
            {
                name: product.name,
                description: product.description,
                price: product.price,
                enabled: product.enabled,
                sortOrder: product.sortOrder,
                categoryID: product.categoryID,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await response.data.data;
    }

    public async delete(id: number, token: string): Promise<Array<ProductDefinition>> {
        const response = await shop.delete(`/${Products.resource}/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await response.data.data;
    }

    public async update(product: ProductDefinition, token: string): Promise<ProductDefinition> {
        const response = await shop.put(`/${Products.resource}/${product.id}`,
            {
                name: product.name,
                description: product.description,
                price: product.price,
                enabled: product.enabled,
                sortOrder: product.sortOrder,
                categoryID: product.categoryID,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await response.data.data;
    }
}

export default Products;
