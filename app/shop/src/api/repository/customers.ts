import {CustomerDefinition} from "../definition";
import {shop} from "../../axios";

class Customers {
    private static resource = "customers";

    public async post(customer: CustomerDefinition) {
        const response = await shop.post(`${Customers.resource}`, customer);

        return response.data;
    }
}

export default Customers;
