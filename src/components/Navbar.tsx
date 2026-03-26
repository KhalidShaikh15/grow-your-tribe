import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import banbrossLogo from "@/assets/banbross_logo.png";

interface NavbarProps {
  backTo?: string;
  title?: string;
}

const Navbar = ({ backTo = "/", title = "BANBRO'SS INDIA" }: NavbarProps) => {
  return (
    <nav className="flex items-center gap-4 px-6 md:px-12 py-4 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">

      <Link to={backTo} className="text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <div className="flex items-center gap-2">
        <img src={banbrossLogo} className="w-7 h-7" />
        <span className="font-bold text-lg">{title}</span>
      </div>

    </nav>
  );
};

export default Navbar;