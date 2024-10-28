import z from "zod";

export const themeResolver = z.object({
    title: z.string().min(3, { message: "theme title is required" }),
    mode: z.string().min(3, { message: "theme mode is required" }),
    applicationTitle: z.string().min(3, { message: "theme application title is required" }),
    primaryAccentColor: z.string().min(7, { message: "color should be valid hex color" }).max(7, { message: "color should be valid hex color" }),
    secondaryAccentColor: z.string().min(7, { message: "color should be valid hex color" }).max(7, { message: "color should be valid hex color" }),
});

export type themeType = z.infer<typeof themeResolver>;
