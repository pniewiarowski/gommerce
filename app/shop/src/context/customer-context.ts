import { createContext } from "react";
import { CustomerDefinition } from "gommerce-app-shared/api/definition";

const CustomerContext = createContext<CustomerDefinition | null>(null);

export default CustomerContext;
