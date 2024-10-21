import z from "zod";

export const addresResolver = z.object({
    streetName: z.string().min(3, { message: "please provide valid street name" }),
    number: z.string().min(1, { message: "number is required" }),
    postalCode: z.string().min(3, { message: "enter valid postal code" }),
    city: z.string().min(3, { message: "enter valid city name" }),
    state: z.string().min(3, { message: "enter valid state name" }),
    country: z.string().min(3, { message: "enter valid country name" }),
    extraComment: z.string(),
});

export type addressType = z.infer<typeof addresResolver>;
