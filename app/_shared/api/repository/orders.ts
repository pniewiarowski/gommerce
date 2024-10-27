import { shop } from "../../axios";
import { OrderDefinition, ResourceInfoDefinition } from "../definition";
import { Repository } from "./type";

class Orders implements Repository {
    private static resource = "orders";

    public async get(token: string): Promise<Array<OrderDefinition>> {
        const response = await shop.get(`/${Orders.resource}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        return await response.data.data;
    }

    public async getByID(id: number, token: string): Promise<OrderDefinition> {
        const response = await shop.get(`/${Orders.resource}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data.data;
    }

    public async getResourceInfo(token: string): Promise<ResourceInfoDefinition> {
        const response = await shop.get(`${Orders.resource}/resource-info`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    }

    public async create(order: OrderDefinition, token: string): Promise<OrderDefinition> {
        const response = await shop.post(`/${Orders.resource}`,
            {
                productIDs: order.productsIDs,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

        return response.data.data;
    }

    public async delete(id: number, token: string): Promise<Array<OrderDefinition>> {
        const response = await shop.delete(`/${Orders.resource}/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await response.data.data;
    }

    public async update(order: OrderDefinition, token: string): Promise<OrderDefinition> {
        const response = await shop.put(`/${Orders.resource}/${order.id}`,
            {
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

export default Orders;
