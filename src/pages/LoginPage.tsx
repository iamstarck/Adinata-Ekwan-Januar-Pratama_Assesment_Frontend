import { loginService } from "@/api/auth/login.service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import type { AuthFormValues } from "@/features/auth/validation/auth-validation";
import axios from "axios";
import { CircleAlertIcon, LockIcon, UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();

  const { form } = useLoginForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleLogin = async (payload: AuthFormValues) => {
    try {
      const response = await loginService(payload);

      if (!response.responseResult) {
        toast.error(response.message);

        return;
      }

      localStorage.setItem("auth", JSON.stringify(response.data));

      toast.success(response.message);
      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  return (
    <main className="bg-foreground h-screen w-screen flex items-center justify-center">
      <Card className="w-full max-w-md py-10 px-2">
        <CardHeader className="text-center">
          <div className="flex w-full justify-center mb-4">
            <div className="bg-primary p-2.5 rounded-lg">
              <LockIcon size={32} className="stroke-accent" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
          <CardDescription className="text-base">
            Sign In to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username" className="text-base">
                  Username
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="username"
                    placeholder="myusername123"
                    {...register("username")}
                  />
                  <InputGroupAddon align={"inline-start"}>
                    <UserIcon className="text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
                {errors.username && (
                  <FieldError className="inline-flex items-center gap-1">
                    <CircleAlertIcon size={14} />
                    {errors.username.message}
                  </FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password" className="text-base">
                  Password
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                  <InputGroupAddon align={"inline-start"}>
                    <LockIcon className="text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
                {errors.password && (
                  <FieldError className="inline-flex items-center gap-1">
                    <CircleAlertIcon size={14} />
                    {errors.password.message}
                  </FieldError>
                )}
              </Field>

              <Field>
                <Button type="submit">Sign In</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
