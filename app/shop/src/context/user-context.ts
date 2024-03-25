import {createContext} from "react";
import UserDefinition from "../api/definition/user-definition.ts";

const UserContext = createContext<UserDefinition | null>(null);

export default UserContext;
