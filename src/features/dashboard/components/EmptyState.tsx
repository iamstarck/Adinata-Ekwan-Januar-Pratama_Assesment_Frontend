import { Button } from "@/components/ui/button";
import { PackageIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
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
  );
};

export default EmptyState;
