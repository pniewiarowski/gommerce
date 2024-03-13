import {shop} from "../../axios";
import {CategoryDefinition} from "../definition";

class Categories {
    private static resource = "categories";

    public static async get(): Promise<Array<CategoryDefinition>> {
        const response = await shop.get(`/${Categories.resource}`);

        return await response.data;
    }

    public static async getByID(id: number): Promise<CategoryDefinition> {
        const response = await shop.get(`/${Categories.resource}/${id}`);

        return await response.data;
    }
}

export default Categories;
