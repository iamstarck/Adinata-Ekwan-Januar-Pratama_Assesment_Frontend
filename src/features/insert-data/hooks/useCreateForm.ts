import { useForm } from "react-hook-form";
import {
  insertDataSchema,
  type InsertDataFormValues,
} from "../validation/insert-data-validation";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCreateForm = () => {
  const defaultValues: InsertDataFormValues = {
    package_name: "",
    package_description: "",
    package_price: 0,
    package_duration: 0,
  };

  const form = useForm<InsertDataFormValues>({
    resolver: zodResolver(insertDataSchema),
    defaultValues,
  });

  return { form };
};
