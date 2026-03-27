import { deleteDataService } from "@/api/deleteData.service";
import { getAllDataService } from "@/api/getAllData.service";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";
import type { GetAllDataResponse } from "@/types/type";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { usePagination } from "@/utils/usePagination";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import DashboardActions from "@/features/dashboard/components/DashboardActions";
import EmptyState from "@/features/dashboard/components/EmptyState";
import DataTable from "@/features/dashboard/components/DataTable";
import DashboardPagination from "@/features/dashboard/components/DashboardPagination";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<GetAllDataResponse["data"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth()!;

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getAllDataService();
      setData(result);
    } catch (error) {
      console.error(error);
      setError("Gagal mendapatkan data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { page, setPage, totalPages, paginatedData } = usePagination(data, 10);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login", { replace: true });
  };

  const handleDelete = async (id: string) => {
    try {
      const promise = deleteDataService(id);
      toast.promise(promise, {
        loading: "Menghapus paket...",
        success: () => {
          fetchData();

          return "Paket berhasil dihapus";
        },
        error: "Gagal menghapus paket",
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

        {loading && (
          <div className="flex flex-col items-center justify-center">
            <Spinner className="size-6" />
          </div>
        )}

        {error && <p className="text-destructive">{error}</p>}

        {!loading && data.length === 0 && !error && <EmptyState />}

        {paginatedData.length > 0 && !loading && (
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
