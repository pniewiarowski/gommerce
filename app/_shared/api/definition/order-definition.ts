interface OrderDefinition {
    id?: number,
    fullPrice?: number,
    customerID?: number,
    productsIDs: Array<number>,
}

export default OrderDefinition;
