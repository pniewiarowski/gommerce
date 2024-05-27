import {AuthResponseDefinition, UserDefinition} from "../definition";
import {auth} from "../../axios";

class Authentication {
    private static resource = "authentication";

    public async register(user: UserDefinition): Promise<UserDefinition> {
        const response = await auth.post(`${Authentication.resource}/register`, user);

        return await response.data;
    }

    public async jwt(user: UserDefinition): Promise<AuthResponseDefinition> {
        const response = await auth.post(`${Authentication.resource}/jwt`, user);

        return await response.data;
    }
}

export default Authentication;
