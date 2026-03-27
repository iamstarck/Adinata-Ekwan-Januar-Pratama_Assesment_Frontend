import { Button } from "@/components/ui/button";
import PackageForm from "@/features/insert-data/components/PackageForm";
import type { InsertDataFormValues } from "@/features/insert-data/validation/insert-data-validation";
import { usePackages } from "@/hooks/usePackages";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const InsertDataPage = () => {
  const navigate = useNavigate();
  const { createMutation } = usePackages();

  const handleCreateData = async (payload: InsertDataFormValues) => {
    const promise = createMutation.mutateAsync;

    toast.promise(promise(payload), {
      loading: "Sedang memproses...",
      success: (data) => {
        navigate("/dashboard");

        return data.message;
      },

      error: (err) => {
        return err.response.data.message || "Gagal membuat paket";
      },
    });
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
        <PackageForm
          title="Tambah Paket Baru"
          description="Buat paket iklan banner baru"
          onSubmit={handleCreateData}
          isLoading={createMutation.isPending}
        />
      </main>
    </div>
  );
};

export default InsertDataPage;
