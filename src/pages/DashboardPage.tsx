import { getAllDataService } from "@/api/auth/getAllData.service";
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
import { useNavigate } from "react-router-dom";

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
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login", { replace: true });
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
              <p className="text-muted-foreground">{user.username}</p>
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
            <p>Manage your advertising packages</p>
          </div>

          <div className="space-x-1">
            <Button variant={"secondary"} className="hover:cursor-pointer">
              <FileTextIcon /> Export PDF
            </Button>
            <Button variant={"secondary"} className="hover:cursor-pointer">
              <FileSpreadsheetIcon /> Export Excel
            </Button>
            <Button>
              <PlusIcon /> Add Package
            </Button>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center">
            <Spinner className="size-6" />
          </div>
        )}

        {error && <p className="text-destructive">{error}</p>}

        {data.length === 0 && !loading && (
          <div className="flex flex-col items-center gap-4 text-center p-16">
            <PackageIcon size={72} className="stroke-muted-foreground" />
            <div className="space-y-1">
              <p className="font-semibold text-lg">No package yet</p>
              <p className="text-muted-foreground">
                Get started by creating your first banner ads package.
              </p>
            </div>
            <Button size={"lg"}>
              <PlusIcon /> Add Your First Package
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
                <TableHead>Duration</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>From Admin</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                    {item.package_price}
                  </TableCell>
                  <TableCell>
                    {item.package_duration}{" "}
                    {item.package_duration > 1 ? "days" : "day"}
                  </TableCell>
                  <TableCell>{item.created_at}</TableCell>
                  <TableCell>
                    <Badge variant={"secondary"}>
                      {item.package_is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={"secondary"}>
                      {item.from_admin ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size={"icon-xs"} className="hover:cursor-pointer">
                      <PencilIcon />
                    </Button>
                    <Button
                      size={"icon-xs"}
                      variant={"destructive"}
                      className="hover:cursor-pointer"
                    >
                      <Trash2Icon />
                    </Button>
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
