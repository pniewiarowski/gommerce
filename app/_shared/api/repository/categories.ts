import {shop} from "../../axios";
import {CategoryDefinition, ProductDefinition} from "../definition";

class Categories {
    private static resource = "categories";

    public async get(): Promise<Array<CategoryDefinition>> {
        const response = await shop.get(`/${Categories.resource}`);

        return await response.data;
    }

    public async getByID(id: number): Promise<CategoryDefinition> {
        const response = await shop.get(`/${Categories.resource}/${id}`);

        return await response.data;
    }

    public async getProducts(id: number): Promise<Array<ProductDefinition>> {
        const respnse = await shop.get(`/${Categories.resource}/${id}/products`);

        return await respnse.data;
    }
}

export default Categories;
