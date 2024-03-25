import {auth} from "../../axios";
import {UserDefinition} from "../definition";

class Users {
    private static resource = "users";

    public async getByID(id: number, token: string): Promise<UserDefinition> {
        const response = await auth.get(`/${Users.resource}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }
}

export default Users;
