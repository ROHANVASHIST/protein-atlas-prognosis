import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dna, FlaskConical, FileText, Calculator, BookOpen, Trophy } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: Dna },
    { path: "/dashboard", label: "Dashboard", icon: Trophy },
    { path: "/submission", label: "Submission", icon: FileText },
    { path: "/explorer", label: "Protein Explorer", icon: FlaskConical },
    { path: "/calculator", label: "Metrics", icon: Calculator },
    { path: "/resources", label: "Resources", icon: BookOpen },
  ];

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-hero flex items-center justify-center shadow-glow">
              <Dna className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              CAFA Platform
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
