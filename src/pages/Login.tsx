import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft, Wallet, Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function Login() {
  const navigate = useNavigate();
  const { language, setLanguage, isJapanese } = useLanguage();
  const t = translations.login;
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [pin, setPin] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailOrMobile || !pin) {
      toast.error("Please fill in all fields");
      return;
    }

    if (pin.length !== 4) {
      toast.error("PIN must be 4 digits");
      return;
    }

    // Demo credentials check
    if (emailOrMobile === "demo.user@loyalty.app" && pin === "1234") {
      toast.success("Welcome back!");
      navigate("/home");
    } else {
      toast.error("Invalid credentials. Try demo.user@loyalty.app with PIN 1234");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto max-w-md p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50">
              <Languages className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">EN</span>
              <Switch 
                checked={isJapanese} 
                onCheckedChange={(checked) => setLanguage(checked ? "jp" : "en")}
                className="scale-75"
              />
              <span className="text-xs font-medium text-muted-foreground">JP</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">ZYNO LOYALTY WALLET</h1>
              <p className="text-sm text-muted-foreground">{t.subtitle[language]}</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-premium">
          <CardHeader>
            <CardTitle className="text-2xl">{t.button[language]}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="emailOrMobile">{t.email[language]}</Label>
                <Input
                  id="emailOrMobile"
                  placeholder={t.email[language]}
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pin">{t.password[language]}</Label>
                  <button
                    type="button"
                    onClick={() => toast.info(isJapanese ? "サポートに連絡してPINをリセットしてください" : "Contact support to reset your PIN")}
                    className="text-sm text-primary hover:underline"
                  >
                    {isJapanese ? "PINを忘れた場合" : "Forgot PIN?"}
                  </button>
                </div>
                <Input
                  id="pin"
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder={t.password[language]}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  required
                />
              </div>

              <Button type="submit" variant="premium" className="w-full" size="lg">
                {t.button[language]}
              </Button>

              <div className="rounded-lg bg-muted p-4">
                <p className="mb-2 text-sm font-medium">{isJapanese ? "デモ認証情報:" : "Demo Credentials:"}</p>
                <p className="text-xs text-muted-foreground">Email: demo.user@loyalty.app</p>
                <p className="text-xs text-muted-foreground">PIN: 1234</p>
              </div>

              <div className="text-center text-sm">
                {t.noAccount[language]}{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-primary font-medium hover:underline"
                >
                  {t.register[language]}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
