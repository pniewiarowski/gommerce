interface Repository {
    get(token?: string): Promise<Array<object>>;
    getByID(id: number, token?: string): Promise<object>;
    create(entity: object, token: string): Promise<object>;
    delete(id: number, token: string): Promise<Array<object>>
    update(entity: object, token: string): Promise<object>;
}

export default Repository;
