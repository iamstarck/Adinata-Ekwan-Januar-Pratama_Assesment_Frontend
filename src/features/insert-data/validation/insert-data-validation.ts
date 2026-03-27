import { z } from "zod";

export const insertDataSchema = z.object({
  package_name: z
    .string()
    .min(1, { error: "Package name should not be empty" }),
  package_description: z
    .string()
    .min(1, { error: "Description should not be empty" }),
  package_price: z.number().min(0),
  package_duration: z.number().min(0),
});

export type InsertDataFormValues = z.infer<typeof insertDataSchema>;
