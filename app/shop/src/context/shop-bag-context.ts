import { createContext } from "react";
import { ProductDefinition } from "gommerce-app-shared/api/definition";

const ShopBagContext = createContext<Array<ProductDefinition>>([]);

export default ShopBagContext;
