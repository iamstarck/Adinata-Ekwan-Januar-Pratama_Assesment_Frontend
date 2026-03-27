import { deleteDataService } from "@/api/deleteData.service";
import { getAllDataService } from "@/api/getAllData.service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import type { GetAllDataResponse } from "@/types/type";
import {
  FileSpreadsheetIcon,
  FileTextIcon,
  LogOutIcon,
  PackageIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<GetAllDataResponse["data"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login", { replace: true });
  };

  const handleDelete = async (id: string) => {
    await deleteDataService(id);
    window.location.reload();
  };

  return (
    <div className="space-y-2">
      <header className="p-4 border-b bg-accent">
        <nav className="flex w-full justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2.5 rounded-lg w-fit">
              <PackageIcon size={20} className="stroke-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Banner Ads Manager</h1>
              <p className="text-muted-foreground">{user?.username}</p>
            </div>
          </div>

          <Button
            variant={"ghost"}
            size={"lg"}
            className="hover:cursor-pointer"
            onClick={() => handleLogout()}
          >
            <LogOutIcon />
            Sign Out
          </Button>
        </nav>
      </header>

      <main className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Banner Ads Packages</h2>
            <p>Kelola paket iklanmu</p>
          </div>

          <div className="space-x-1">
            <Button variant={"secondary"} className="hover:cursor-pointer">
              <FileTextIcon /> Export PDF
            </Button>
            <Button variant={"secondary"} className="hover:cursor-pointer">
              <FileSpreadsheetIcon /> Export Excel
            </Button>
            <Button asChild>
              <Link to={"/dashboard/new"}>
                <PlusIcon /> Add Package
              </Link>
            </Button>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center">
            <Spinner className="size-6" />
          </div>
        )}

        {error && <p className="text-destructive">{error}</p>}

        {data.length === 0 && !loading && !error && (
          <div className="flex flex-col items-center gap-4 text-center p-16">
            <PackageIcon size={72} className="stroke-muted-foreground" />
            <div className="space-y-1">
              <p className="font-semibold text-lg">Belum ada paket</p>
              <p className="text-muted-foreground">
                Mulailah dengan membuat paket iklan banner pertamamu.
              </p>
            </div>
            <Button size={"lg"} asChild>
              <Link to={"/dashboard/new"}>
                <PlusIcon /> Tambahkan Paket Pertamamu
              </Link>
            </Button>
          </div>
        )}

        {data.length > 0 && !loading && (
          <Table>
            <TableHeader>
              <TableRow className="uppercase tracking-tight">
                <TableHead>ID</TableHead>
                <TableHead>Package Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Duration</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">From Admin</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id_banner_ads_package}>
                  <TableCell className="font-medium">
                    {item.id_banner_ads_package}
                  </TableCell>
                  <TableCell>{item.package_name}</TableCell>
                  <TableCell>{item.package_description}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ${item.package_price}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.package_duration}{" "}
                    {item.package_duration > 1 ? "days" : "day"}
                  </TableCell>
                  <TableCell>{item.created_at}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={"secondary"}>
                      {item.package_is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={"secondary"}>
                      {item.from_admin ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center space-x-1">
                    <Button
                      size={"icon-sm"}
                      className="hover:cursor-pointer"
                      asChild
                    >
                      <Link
                        to={`/dashboard/edit/${item.id_banner_ads_package}`}
                        state={{ data: item }}
                      >
                        <PencilIcon />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size={"icon-sm"}
                          variant={"destructive"}
                          className="hover:cursor-pointer"
                        >
                          <Trash2Icon />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Ingin menghapus paket ${item.package_name}?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Ini akan
                            menghapus data secara permanen dari server kami.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleDelete(item.id_banner_ads_package)
                            }
                          >
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
