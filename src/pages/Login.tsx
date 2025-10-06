import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Wallet } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
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
        <div className="mb-8 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">ZYNO LOYALTY WALLET</h1>
              <p className="text-sm text-muted-foreground">Welcome back</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-premium">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="emailOrMobile">Email or Mobile Number</Label>
                <Input
                  id="emailOrMobile"
                  placeholder="Enter email or mobile"
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pin">4-Digit PIN</Label>
                  <button
                    type="button"
                    onClick={() => toast.info("Contact support to reset your PIN")}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot PIN?
                  </button>
                </div>
                <Input
                  id="pin"
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  required
                />
              </div>

              <Button type="submit" variant="premium" className="w-full" size="lg">
                Login
              </Button>

              <div className="rounded-lg bg-muted p-4">
                <p className="mb-2 text-sm font-medium">Demo Credentials:</p>
                <p className="text-xs text-muted-foreground">Email: demo.user@loyalty.app</p>
                <p className="text-xs text-muted-foreground">PIN: 1234</p>
              </div>

              <div className="text-center text-sm">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-primary font-medium hover:underline"
                >
                  Register here
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
