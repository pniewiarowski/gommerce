import z from "zod";

export const categoryResolver = z.object({
    name: z.string().min(3, { message: "category name should contain at least 3 characters" }),
    description: z.string(),
    sortOrder: z.string(),
});

export type categoryType = z.infer<typeof categoryResolver>;
