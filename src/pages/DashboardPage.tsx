import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { usePagination } from "@/utils/usePagination";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import DashboardActions from "@/features/dashboard/components/DashboardActions";
import EmptyState from "@/features/dashboard/components/EmptyState";
import DataTable from "@/features/dashboard/components/DataTable";
import DashboardPagination from "@/features/dashboard/components/DashboardPagination";
import { usePackages } from "@/hooks/usePackages";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { packagesQuery, deleteMutation } = usePackages();
  const { data = [], isLoading, isError, error, refetch } = packagesQuery;

  const { user } = useAuth()!;

  const { page, setPage, totalPages, paginatedData } = usePagination(data, 10);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login", { replace: true });
  };

  const handleDelete = async (id: string) => {
    try {
      const promise = deleteMutation.mutateAsync(id);

      toast.promise(promise, {
        loading: "Menghapus paket...",
        success: () => {
          refetch();

          return "Paket berhasil dihapus";
        },

        error: (err) => err.response.data.message || "Gagal menghapus paket",
      });

      await promise;
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleExportPDF = () => {
    if (data.length === 0) return toast.error("Tidak ada data untuk diekspor");

    exportToPDF(data);
    toast.success("PDF berhasil dibuat");
  };

  const handleExportExcel = () => {
    if (data.length === 0) return toast.error("Tidak ada data untuk diekspor");

    exportToExcel(data);
    toast.success("Excel berhasil dibuat");
  };

  return (
    <div className="space-y-2">
      <DashboardHeader username={user.username} onLogout={handleLogout} />

      <main className="p-4 space-y-4">
        <DashboardActions
          onExportPDF={handleExportPDF}
          onExportExcel={handleExportExcel}
        />

        {isLoading && (
          <div className="flex flex-col items-center justify-center">
            <Spinner className="size-6" />
          </div>
        )}

        {isError && (
          <div className="text-center p-10">
            <p className="text-destructive">{error.message}</p>
            <button onClick={() => refetch()} className="text-sm underline">
              Coba Lagi
            </button>
          </div>
        )}

        {!isLoading && data.length === 0 && !isError && <EmptyState />}

        {paginatedData.length > 0 && !isLoading && (
          <>
            <DataTable data={paginatedData} onDelete={handleDelete} />
            <DashboardPagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
