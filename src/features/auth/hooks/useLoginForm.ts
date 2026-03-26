import { authSchema, type AuthFormValues } from "../validation/auth-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useLoginForm = () => {
  const defaultValues: AuthFormValues = {
    username: "",
    password: "",
  };

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues,
  });

  return { form };
};
