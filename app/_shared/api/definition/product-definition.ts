interface ProductDefinition {
    id: number | null,
    name: string,
    description: string,
    price: number,
    enabled: boolean,
    sortOrder: number,
    categoryId: number,
}

export default ProductDefinition;
