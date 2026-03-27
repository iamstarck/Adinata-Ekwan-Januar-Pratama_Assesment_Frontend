import { Button } from "@/components/ui/button";
import { LogOutIcon, PackageIcon } from "lucide-react";

interface DashboardHeaderProps {
  username: string;
  onLogout: () => void;
}

const DashboardHeader = ({ username, onLogout }: DashboardHeaderProps) => {
  return (
    <header className="p-4 border-b bg-accent">
      <nav className="flex w-full justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2.5 rounded-lg w-fit">
            <PackageIcon size={20} className="stroke-accent" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Banner Ads Manager</h1>
            <p className="text-muted-foreground">{username}</p>
          </div>
        </div>

        <Button
          variant={"ghost"}
          size={"lg"}
          className="hover:cursor-pointer"
          onClick={onLogout}
        >
          <LogOutIcon />
          Sign Out
        </Button>
      </nav>
    </header>
  );
};

export default DashboardHeader;
