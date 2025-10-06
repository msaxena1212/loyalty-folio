import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  User,
  ShoppingBag,
  Award,
  HelpCircle,
  FileText,
  Lock,
  Mail,
  LogOut,
  ChevronRight,
  Wallet,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";

export default function Menu() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    {
      section: "Account",
      items: [
        { icon: User, label: "My Profile", path: "/profile" },
        { icon: ShoppingBag, label: "My Orders", path: "/orders" },
        { icon: Award, label: "My Awards", path: "/rewards" },
      ],
    },
    {
      section: "Support",
      items: [
        { icon: HelpCircle, label: "FAQs", path: "/faqs" },
        { icon: FileText, label: "Terms of Use", path: "/terms" },
        { icon: Mail, label: "Contact Us", path: "/contact" },
      ],
    },
    {
      section: "Security",
      items: [
        { icon: Lock, label: "Change PIN", path: "/change-pin" },
      ],
    },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Menu</h1>
                <p className="text-xs text-muted-foreground">Account & Settings</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* User Card */}
      <div className="container mx-auto p-4">
        <Card className="mb-6 overflow-hidden">
          <div className="gradient-primary p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-sm opacity-90">demo.user@loyalty.app</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Menu Sections */}
        <div className="space-y-6">
          {menuItems.map((section, idx) => (
            <div key={idx}>
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
                {section.section}
              </h3>
              <Card>
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  return (
                    <div key={itemIdx}>
                      <Button
                        variant="ghost"
                        className="w-full justify-between h-auto py-4 px-6"
                        onClick={() => navigate(item.path)}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-primary" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </Button>
                      {itemIdx < section.items.length - 1 && (
                        <Separator className="mx-6" />
                      )}
                    </div>
                  );
                })}
              </Card>
            </div>
          ))}

          {/* Logout Button */}
          <Card>
            <Button
              variant="ghost"
              className="w-full justify-between h-auto py-4 px-6 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-3">
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </div>
            </Button>
          </Card>
        </div>

        {/* App Version */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Loyalty Wallet v1.0.0
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
