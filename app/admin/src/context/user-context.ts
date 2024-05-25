import { createContext } from "react";
import { UserDefinition } from "../api/definition";

const UserContext = createContext<UserDefinition | null>(null);

export default UserContext;
