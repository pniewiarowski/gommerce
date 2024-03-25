import {createContext} from "react";
import {CustomerDefinition} from "../api/definition";

const CustomerContext = createContext<CustomerDefinition | null>(null);

export default CustomerContext;
