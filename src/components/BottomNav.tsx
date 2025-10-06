import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Tag, Wallet, Gift, Menu } from "lucide-react";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/home", icon: Home, label: "Home" },
    { path: "/offers", icon: Tag, label: "Offers" },
    { path: "/wallet", icon: Wallet, label: "Wallet" },
    { path: "/rewards", icon: Gift, label: "Rewards" },
    { path: "/menu", icon: Menu, label: "Menu" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 z-50">
      <div className="container mx-auto flex justify-around py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className="flex-col gap-1 h-auto"
              onClick={() => navigate(item.path)}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
              <span className={`text-xs ${isActive ? "text-primary font-medium" : ""}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
