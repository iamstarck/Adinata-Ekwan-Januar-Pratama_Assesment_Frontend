import { z } from "zod";

export const authSchema = z.object({
  username: z.string().min(2, { error: "Min 2 characters" }),
  password: z.string().min(8, "Min 8 characters"),
});

export type AuthFormValues = z.infer<typeof authSchema>;
