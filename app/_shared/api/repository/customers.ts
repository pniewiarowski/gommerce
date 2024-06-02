import { CustomerDefinition, ResourceInfoDefinition } from "../definition";
import { shop } from "../../axios";
import { Repository } from "./type";

class Customers implements Repository {
    private static resource = "customers";

    public async get(): Promise<Array<CustomerDefinition>> {
        const response = await shop.get(`${Customers.resource}`);

        return response.data;
    }

    public async getByID(id: number): Promise<CustomerDefinition> {
        const response = await shop.get(`/${Customers.resource}/${id}`);

        return await response.data;
    }

    public async getByUserID(userID: number, token: string): Promise<CustomerDefinition> {
        const response = await shop.get(`/users/${userID}/customers`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }

    public async getResourceInfo(token: string): Promise<ResourceInfoDefinition> {
        const response = await shop.get(`${Customers.resource}/resource-info`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }

    public async create(customer: CustomerDefinition, token: string): Promise<CustomerDefinition> {
        const response = await shop.post(`${Customers.resource}`,
            {
                firstName: customer.firstName,
                lastName: customer.lastName,
                isActive: customer.isActive,
                userId: customer.userId,
            }
        );

        return response.data;
    }

    public async delete(id: number, token: string): Promise<Array<CustomerDefinition>> {
        const response = await shop.delete(`/${Customers.resource}/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await response.data;
    }

    public async update(customer: CustomerDefinition, token: string): Promise<CustomerDefinition> {
        const response = await shop.put(`/${Customers.resource}/${customer.id}`,
            {
                firstName: customer.firstName,
                lastName: customer.lastName,
                isActive: customer.isActive,
                userId: customer.userId,
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

export default Customers;
