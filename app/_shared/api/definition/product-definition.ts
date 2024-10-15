interface ProductDefinition {
    id: number | null,
    name: string,
    description: string,
    price: number,
    enabled: boolean,
    sortOrder: number,
    categoryID: number,
}

export default ProductDefinition;
