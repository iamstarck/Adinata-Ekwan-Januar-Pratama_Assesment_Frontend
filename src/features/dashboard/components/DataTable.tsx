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
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { GetAllDataResponse } from "@/types/type";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";

interface DataTableProps {
  data: GetAllDataResponse["data"];
  onDelete: (id: string) => void;
}

const DataTable = ({ data, onDelete }: DataTableProps) => {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Package Name</TableHead>
              <TableHead className="max-w-100">Description</TableHead>
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
              <TableRow
                key={item.id_banner_ads_package}
                className="odd:bg-primary/15"
              >
                <TableCell className="font-medium">
                  {item.id_banner_ads_package}
                </TableCell>
                <TableCell className="font-semibold">
                  {item.package_name}
                </TableCell>
                <TableCell className="max-w-100 whitespace-normal wrap-break-word">
                  {item.package_description}
                </TableCell>
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
                        <AlertDialogCancel className="hover:cursor-pointer">
                          Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(item.id_banner_ads_package)}
                          className="hover:cursor-pointer"
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
      </CardContent>
    </Card>
  );
};

export default DataTable;
