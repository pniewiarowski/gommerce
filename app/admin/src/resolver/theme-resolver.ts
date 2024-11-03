import z from "zod";

export const themeResolver = z.object({
    title: z.string().min(3, { message: "theme title is required" }),
    applicationTitle: z.string().min(3, { message: "theme application title is required" }),
});

export type themeType = z.infer<typeof themeResolver>;
