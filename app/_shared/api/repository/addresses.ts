import { shop } from "../../axios";
import { AddressDefinition } from "../definition";
import { Repository } from "./type";

class Addresses implements Repository {
    private static resource = "addresses";

    public async get(token?: string): Promise<Array<AddressDefinition>> {
        const response = await shop.get(`${Addresses.resource}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    }

    public async getByID(id: number, token?: string): Promise<AddressDefinition> {
        const response = await shop.get(`/${Addresses.resource}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return await response.data.data;
    }

    public async create(address: AddressDefinition, token: string): Promise<AddressDefinition> {
        console.log(address);
        const response = await shop.post(`${Addresses.resource}`,
            {
                city: address.city,
                country: address.country,
                street: address.street,
                streetNumber: address.streetNumber,
                apartmentNumber: address.apartmentNumber,
                state: address.state,
                customerID: address.customerID,
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

    public async delete(id: number, token: string): Promise<Array<AddressDefinition>> {
        const response = await shop.delete(`/${Addresses.resource}/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await response.data.data;
    }

    public async update(address: AddressDefinition, token: string): Promise<AddressDefinition> {
        const response = await shop.put(`/${Addresses.resource}/${address.id}`,
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

export default Addresses;
