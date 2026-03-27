import { updateDataService } from "@/api/updateData.service";
import { Button } from "@/components/ui/button";
import PackageForm from "@/features/insert-data/components/PackageForm";
import type { InsertDataFormValues } from "@/features/insert-data/validation/insert-data-validation";
import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditDataPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const initialData = location.state.data;

  const handleUpdateData = async (payload: InsertDataFormValues) => {
    if (!id) {
      toast.error("Invalid ID");

      return;
    }

    try {
      const response = await updateDataService(id, payload);

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
        <PackageForm
          title="Edit Paket"
          description="Perbarui detail paket iklan banner"
          onSubmit={handleUpdateData}
          initialData={initialData}
        />
      </main>
    </div>
  );
};

export default EditDataPage;
