import z from "zod";

export const loginResolver  = z.object({
    email: z.string().email({message: "please provide correct email"}),
    password: z.string().min(8, {message: "password contains at least 8 characters"}),
});

export type loginType = z.infer<typeof loginResolver>;
