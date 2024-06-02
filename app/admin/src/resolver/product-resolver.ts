import z from "zod";

export const productResolver = z.object({
    name: z.string().min(1, { message: "product name is required" }),
    description: z.string(),
    price: z.number(),
    sortOrder: z.number(),
});

export type productType = z.infer<typeof productResolver>;
