import { CustomerDefinition } from "../definition";
import { shop } from "../../axios";

class Customers {
    private static resource = "customers";

    public async post(customer: CustomerDefinition): Promise<CustomerDefinition> {
        const response = await shop.post(`${Customers.resource}`, customer);

        return response.data;
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
}

export default Customers;
