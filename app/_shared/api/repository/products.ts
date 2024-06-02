import { ProductDefinition } from "../definition";
import { shop } from "../../axios";
import { Repository } from "./type";

class Products implements Repository {
    private static resource = "products";

    public async get(): Promise<Array<ProductDefinition>> {
        const response = await shop.get(`${Products.resource}`);

        return response.data;
    }

    public async getByID(id: number): Promise<ProductDefinition> {
        const response = await shop.get(`/${Products.resource}/${id}`);

        return await response.data;
    }

    public async create(product: ProductDefinition, token: string): Promise<ProductDefinition> {
        const response = await shop.post(`/${Products.resource}`,
            {
                name: product.name,
                description: product.description,
                price: product.price,
                enabled: product.enabled,
                sortOrder: product.sortOrder,
                categoryId: product.categoryId,
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

    public async delete(id: number, token: string): Promise<Array<ProductDefinition>> {
        const response = await shop.delete(`/${Products.resource}/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await response.data;
    }

    public async update(product: ProductDefinition, token: string): Promise<ProductDefinition> {
        const response = await shop.put(`/${Products.resource}/${product.id}`,
            {
                name: product.name,
                description: product.description,
                price: product.price,
                enabled: product.enabled,
                sortOrder: product.sortOrder,
                categoryId: product.categoryId,
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
}

export default Products;
