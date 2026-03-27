import { Button } from "@/components/ui/button";
import PackageForm from "@/features/insert-data/components/PackageForm";
import type { InsertDataFormValues } from "@/features/insert-data/validation/insert-data-validation";
import { usePackages } from "@/hooks/usePackages";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditDataPage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { updateMutation } = usePackages();

  const initialData = state.data;

  const handleUpdateData = async (payload: InsertDataFormValues) => {
    if (!id) {
      toast.error("ID tidak valid");

      return;
    }

    const promise = updateMutation.mutateAsync;

    toast.promise(promise({ id, payload }), {
      loading: "Memperbarui paket...",
      success: (data) => {
        navigate("/dashboard");

        return data.message;
      },

      error: (err) => err.response.data.message || "Gagal mempebarui paket",
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
          title="Edit Paket"
          description="Perbarui detail paket iklan banner"
          onSubmit={handleUpdateData}
          initialData={initialData}
          isLoading={updateMutation.isPending}
        />
      </main>
    </div>
  );
};

export default EditDataPage;
