import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, DollarSign, Coins, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RedeemPoints() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [purchaseValue, setPurchaseValue] = useState("");
  const [customerPin, setCustomerPin] = useState("");
  const [merchantPin, setMerchantPin] = useState("");
  const [step, setStep] = useState<"amount" | "customer-pin" | "merchant-pin" | "success">("amount");

  const program = {
    id: 1,
    name: "Cafe Moments",
    logo: "☕",
    currentPoints: 12550,
    conversionRate: 100, // 100 points = $1
  };

  const calculatePoints = (value: string) => {
    const amount = parseFloat(value);
    if (isNaN(amount)) return 0;
    return Math.floor(amount * program.conversionRate);
  };

  const pointsToRedeem = calculatePoints(purchaseValue);
  const hasEnoughPoints = pointsToRedeem <= program.currentPoints;

  const handleAmountSubmit = () => {
    if (!purchaseValue || !hasEnoughPoints) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount and ensure you have enough points.",
        variant: "destructive",
      });
      return;
    }
    setStep("customer-pin");
  };

  const handleCustomerPin = () => {
    if (customerPin.length !== 4) {
      toast({
        title: "Invalid PIN",
        description: "Please enter your 4-digit PIN.",
        variant: "destructive",
      });
      return;
    }
    // Verify customer PIN (demo: accept 1234)
    if (customerPin !== "1234") {
      toast({
        title: "Incorrect PIN",
        description: "The PIN you entered is incorrect.",
        variant: "destructive",
      });
      return;
    }
    setStep("merchant-pin");
  };

  const handleMerchantPin = () => {
    if (merchantPin.length !== 4) {
      toast({
        title: "Invalid PIN",
        description: "Please enter the 4-digit Merchant PIN.",
        variant: "destructive",
      });
      return;
    }
    // Verify merchant PIN (demo: accept 2468)
    if (merchantPin !== "2468") {
      toast({
        title: "Incorrect Merchant PIN",
        description: "The Merchant PIN is incorrect.",
        variant: "destructive",
      });
      return;
    }
    setStep("success");
  };

  const handleFinish = () => {
    toast({
      title: "Redemption Successful!",
      description: `${pointsToRedeem} points redeemed successfully.`,
    });
    navigate("/wallet");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary">
                <Coins className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Redeem Points</h1>
                <p className="text-xs text-muted-foreground">{program.name}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-md p-4 space-y-6">
        {/* Program Info */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted text-4xl">
              {program.logo}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{program.name}</h2>
              <p className="text-sm text-muted-foreground">
                Available: {program.currentPoints.toLocaleString()} points
              </p>
            </div>
          </div>
        </Card>

        {/* Step 1: Enter Amount */}
        {step === "amount" && (
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Enter Purchase Amount</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Purchase Value ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-10"
                    value={purchaseValue}
                    onChange={(e) => setPurchaseValue(e.target.value)}
                  />
                </div>
              </div>

              {purchaseValue && (
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground mb-1">Points to Redeem</p>
                  <p className="text-2xl font-bold text-primary">
                    {pointsToRedeem.toLocaleString()}
                  </p>
                  {!hasEnoughPoints && (
                    <p className="text-sm text-destructive mt-2">
                      Insufficient points available
                    </p>
                  )}
                </div>
              )}

              <Button
                variant="premium"
                className="w-full"
                onClick={handleAmountSubmit}
                disabled={!hasEnoughPoints}
              >
                Continue
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Customer PIN */}
        {step === "customer-pin" && (
          <Card className="p-6">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Enter Your PIN</h3>
              <p className="text-sm text-muted-foreground">
                Please enter your 4-digit PIN to authorize this redemption
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="customer-pin">Customer PIN</Label>
                <Input
                  id="customer-pin"
                  type="password"
                  placeholder="••••"
                  maxLength={4}
                  className="text-center text-2xl tracking-widest"
                  value={customerPin}
                  onChange={(e) => setCustomerPin(e.target.value.replace(/\D/g, ""))}
                />
              </div>

              <Button
                variant="premium"
                className="w-full"
                onClick={handleCustomerPin}
              >
                Verify PIN
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Merchant PIN */}
        {step === "merchant-pin" && (
          <Card className="p-6">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                <ShieldCheck className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Merchant Verification</h3>
              <p className="text-sm text-muted-foreground">
                Ask the merchant to enter their PIN to complete the redemption
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="merchant-pin">Merchant PIN</Label>
                <Input
                  id="merchant-pin"
                  type="password"
                  placeholder="••••"
                  maxLength={4}
                  className="text-center text-2xl tracking-widest"
                  value={merchantPin}
                  onChange={(e) => setMerchantPin(e.target.value.replace(/\D/g, ""))}
                />
              </div>

              <Button
                variant="premium"
                className="w-full"
                onClick={handleMerchantPin}
              >
                Complete Redemption
              </Button>
            </div>
          </Card>
        )}

        {/* Step 4: Success */}
        {step === "success" && (
          <Card className="p-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full gradient-primary">
                <Coins className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Redemption Successful!</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Your points have been redeemed successfully
              </p>

              <div className="space-y-3 mb-6 text-left">
                <div className="flex justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="font-bold">${purchaseValue}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Points Redeemed</span>
                  <span className="font-bold text-primary">{pointsToRedeem.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm text-muted-foreground">Remaining Balance</span>
                  <span className="font-bold">
                    {(program.currentPoints - pointsToRedeem).toLocaleString()}
                  </span>
                </div>
              </div>

              <Button variant="premium" className="w-full" onClick={handleFinish}>
                Done
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
