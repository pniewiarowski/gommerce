import { CustomerDefinition, OrderDefinition, ResourceInfoDefinition } from "../definition";
import { shop } from "../../axios";
import { Repository } from "./type";

class Customers implements Repository {
    private static resource = "customers";

    public async get(token: string): Promise<Array<CustomerDefinition>> {
        const response = await shop.get(`${Customers.resource}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    }

    public async getByID(id: number, token: string): Promise<CustomerDefinition> {
        const response = await shop.get(`/${Customers.resource}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return await response.data.data;
    }

    public async getViaUserID(userID: number, token: string): Promise<CustomerDefinition> {
        const response = await shop.get(`/customers/user/${userID}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return await response.data.data;
    }

    public async getByUserID(userID: number, token: string): Promise<CustomerDefinition> {
        const response = await shop.get(`/users/${userID}/customers`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    }

    public async getOrders(id: number, token: string): Promise<Array<OrderDefinition>> {
        const response = await shop.get(`/customers/${id}/orders`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    }

    public async getResourceInfo(token: string): Promise<ResourceInfoDefinition> {
        const response = await shop.get(`${Customers.resource}/resource-info`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    }

    public async create(customer: CustomerDefinition, token: string): Promise<CustomerDefinition> {
        const response = await shop.post(`${Customers.resource}`,
            {
                firstName: customer.firstName,
                lastName: customer.lastName,
                isActive: customer.isActive,
                userID: customer.userID,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
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

        return await response.data.data;
    }

    public async update(customer: CustomerDefinition, token: string): Promise<CustomerDefinition> {
        const response = await shop.put(`/${Customers.resource}/${customer.id}`,
            {
                firstName: customer.firstName,
                lastName: customer.lastName,
                isActive: customer.isActive,
                userID: customer.userID,
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
