import { createDataService } from "@/api/createData.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateForm } from "@/features/insert-data/hooks/useCreateForm";
import type { InsertDataFormValues } from "@/features/insert-data/validation/insert-data-validation";
import axios from "axios";
import {
  ArrowLeftIcon,
  CircleAlertIcon,
  PackageIcon,
  SaveIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const InsertDataPage = () => {
  const navigate = useNavigate();

  const { form } = useCreateForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleCreateData = async (payload: InsertDataFormValues) => {
    try {
      const response = await createDataService(payload);

      if (!response.responseResult) {
        toast.error(response.message);

        return;
      }

      toast.success(response.message);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  return (
    <div className="space-y-2">
      <header className="p-4 border-b bg-accent">
        <nav className="flex w-full justify-between items-center">
          <Button
            variant={"ghost"}
            size={"lg"}
            className="hover:cursor-pointer"
            asChild
          >
            <Link to={"/dashboard"}>
              <ArrowLeftIcon />
              Back to Dashboard
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex flex-col items-center p-4 space-y-4">
        <form
          onSubmit={handleSubmit(handleCreateData)}
          className="w-full max-w-2xl"
        >
          <Card>
            <CardContent>
              <FieldSet>
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-2.5 rounded-lg w-fit">
                    <PackageIcon size={20} className="stroke-accent" />
                  </div>
                  <FieldContent>
                    <FieldTitle className="text-2xl font-bold">
                      Add New Package
                    </FieldTitle>
                    <FieldDescription className="text-base">
                      Create a new banner ads package
                    </FieldDescription>
                  </FieldContent>
                </div>

                <FieldGroup>
                  <Field>
                    <Label htmlFor="package-name" className="text-base">
                      Package Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="package-name"
                      placeholder="Enter package name"
                      {...register("package_name")}
                    />
                    {errors.package_name && (
                      <FieldError className="inline-flex items-center gap-1">
                        <CircleAlertIcon size={14} />
                        {errors.package_name.message}
                      </FieldError>
                    )}
                  </Field>

                  <Field>
                    <Label htmlFor="package-description" className="text-base">
                      Package Description
                      <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="package-description"
                      placeholder="Enter package description"
                      className="h-20 resize-none"
                      {...register("package_description")}
                    />
                    {errors.package_description && (
                      <FieldError className="inline-flex items-center gap-1">
                        <CircleAlertIcon size={14} />
                        {errors.package_description.message}
                      </FieldError>
                    )}
                  </Field>

                  <div className="flex items-center gap-4">
                    <Field>
                      <Label htmlFor="package-price" className="text-base">
                        Package Price
                        <span className="text-destructive">*</span>
                      </Label>
                      <InputGroup>
                        <InputGroupInput
                          type="number"
                          id="package-price"
                          placeholder="0"
                          {...register("package_price", {
                            valueAsNumber: true,
                          })}
                        />
                        <InputGroupAddon align={"inline-start"}>
                          <p className="text-muted-foreground">$</p>
                        </InputGroupAddon>
                      </InputGroup>
                      {errors.package_price && (
                        <FieldError className="inline-flex items-center gap-1">
                          <CircleAlertIcon size={14} />
                          {errors.package_price.message}
                        </FieldError>
                      )}
                    </Field>

                    <Field>
                      <Label htmlFor="duration" className="text-base">
                        Duration (days)
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="number"
                        id="duration"
                        placeholder="0"
                        {...register("package_duration", {
                          valueAsNumber: true,
                        })}
                      />
                      {errors.package_duration && (
                        <FieldError className="inline-flex items-center gap-1">
                          <CircleAlertIcon size={14} />
                          {errors.package_duration.message}
                        </FieldError>
                      )}
                    </Field>
                  </div>
                </FieldGroup>
              </FieldSet>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-4">
              <Button variant={"outline"} asChild>
                <Link to={"/dashboard"}>Cancel</Link>
              </Button>

              <Button type="submit" className="hover:cursor-pointer">
                <SaveIcon /> Save Package
              </Button>
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  );
};

export default InsertDataPage;
