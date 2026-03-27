import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVerticalIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  PlusIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardActionsProps {
  onExportPDF: () => void;
  onExportExcel: () => void;
}

const DashboardActions = ({
  onExportPDF,
  onExportExcel,
}: DashboardActionsProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">Banner Ads Packages</h2>
        <p>Kelola paket iklanmu</p>
      </div>

      <div className="space-x-1">
        <div className="min-lg:inline hidden">
          <Button
            variant={"secondary"}
            onClick={onExportPDF}
            className="hover:cursor-pointer"
          >
            <FileTextIcon /> Export PDF
          </Button>
          <Button
            variant={"secondary"}
            onClick={onExportExcel}
            className="hover:cursor-pointer"
          >
            <FileSpreadsheetIcon /> Export Excel
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="max-lg:inline-flex hidden hover:cursor-pointer"
          >
            <Button variant={"secondary"} size={"icon"}>
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="space-y-1">
            <DropdownMenuItem
              onClick={onExportPDF}
              className="hover:cursor-pointer"
            >
              <FileTextIcon /> Export PDF
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onExportExcel}
              className="hover:cursor-pointer"
            >
              <FileSpreadsheetIcon /> Export Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button asChild>
          <Link to={"/dashboard/new"}>
            <PlusIcon />{" "}
            <span className="min-lg:inline hidden"> Add Package</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardActions;
