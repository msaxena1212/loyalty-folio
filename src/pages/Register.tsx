import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Wallet } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import zynoLogo from "@/assets/zyno-logo.png";

export default function Register() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations.register;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    mobile: "",
    gender: "",
    dob: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      toast.error("Please accept the Terms & Conditions");
      return;
    }

    // Validate all fields
    const requiredFields = Object.entries(formData);
    const emptyField = requiredFields.find(([_, value]) => !value);
    
    if (emptyField) {
      toast.error(`Please fill in ${emptyField[0].replace(/([A-Z])/g, ' $1').toLowerCase()}`);
      return;
    }

    toast.success("Registration successful! Please set your PIN.");
    navigate("/set-pin", { state: { fromRegistration: true } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto max-w-2xl p-6">
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
            <LanguageToggle />
          </div>
          <div className="flex items-center gap-3">
            <img src={zynoLogo} alt="Zyno Logo" className="h-12 w-12 rounded-xl shadow-lg" />
            <div>
              <h1 className="text-2xl font-bold text-primary">Zyno <span className="text-secondary">Loyalty</span></h1>
              <p className="text-sm text-muted-foreground">{t.subtitle[language]}</p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <Card className="shadow-premium">
          <CardHeader>
            <CardTitle className="text-2xl">{t.title[language]}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t.name[language].split(' ')[0]} *</Label>
                  <Input
                    id="firstName"
                    placeholder={t.name[language].split(' ')[0]}
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t.name[language].split(' ')[1]} *</Label>
                  <Input
                    id="lastName"
                    placeholder={t.name[language].split(' ')[1]}
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.email[language]} *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.email[language]}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      setFormData({ ...formData, country: value })
                    }
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="ae">UAE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">{t.phone[language]} *</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder={t.phone[language]}
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) =>
                    setTermsAccepted(checked as boolean)
                  }
                />
                <Label
                  htmlFor="terms"
                  className="cursor-pointer text-sm leading-relaxed"
                >
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.info("Terms & Conditions");
                    }}
                    className="text-primary hover:underline"
                  >
                    Terms & Conditions
                  </button>
                </Label>
              </div>

              <Button type="submit" variant="premium" className="w-full" size="lg">
                {t.button[language]}
              </Button>

              <div className="text-center text-sm">
                {t.haveAccount[language]}{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-primary font-medium hover:underline"
                >
                  {t.login[language]}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
