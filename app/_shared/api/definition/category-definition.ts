interface CategoryDefinition {
    id: number | null,
    name: string,
    description: string,
    imageURL: string,
    enabled: boolean,
    sortOrder: number,
}

export default CategoryDefinition;
