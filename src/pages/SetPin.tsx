import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Wallet, Shield } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function SetPin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations.setPin;
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (pin.length !== 4) {
      toast.error(t.errors.length[language]);
      return;
    }

    if (pin !== confirmPin) {
      toast.error(t.errors.mismatch[language]);
      return;
    }

    toast.success(language === "jp" ? "PIN設定が完了しました！" : "PIN set successfully!");
    navigate("/home");
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
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <LanguageToggle />
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

        {/* Set PIN Form */}
        <Card className="shadow-premium">
          <CardHeader>
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">{t.title[language]}</CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              {t.subtitle[language]}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pin">{t.enterPin[language]}</Label>
                <Input
                  id="pin"
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  className="text-center text-2xl tracking-widest"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPin">{t.confirmPin[language]}</Label>
                <Input
                  id="confirmPin"
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="••••"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
                  className="text-center text-2xl tracking-widest"
                  required
                />
              </div>

              <div className="rounded-lg bg-primary/5 p-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">{t.securityTip[language]}:</strong>
                  <br />
                  {t.tipText[language]}
                </p>
              </div>

              <Button type="submit" variant="premium" className="w-full" size="lg">
                {t.button[language]}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
