import { AuthResponseDefinition, UserDefinition, AuthRegisterDefinition } from "../definition";
import { auth } from "../../axios";

class Authentication {
    private static resource = "auth";

    public async register(user: UserDefinition): Promise<AuthRegisterDefinition> {
        const response = await auth.post(`${Authentication.resource}/register`, user);

        return await response.data.data;
    }

    public async jwt(user: UserDefinition): Promise<AuthResponseDefinition> {
        const response = await auth.post(`${Authentication.resource}/login`, user);

        return await response.data.data;
    }
}

export default Authentication;
