import ProductDefinition from "./product-definition";

interface OrderDefinition {
    id?: number,
    fullPrice?: number,
    customerID?: number,
    status?: string,
    productsIDs: Array<number>,
    products: Array<ProductDefinition> | null,
}

export default OrderDefinition;
