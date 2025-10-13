import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Gift, Calendar, CheckCircle2, Clock } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

const rewards = [
  {
    id: 1,
    programName: "Cafe Moments",
    logo: "☕",
    title: "Free Coffee Reward",
    description: "One free coffee of any size",
    earnedDate: "2025-10-01",
    expiryDate: "2025-12-31",
    status: "available",
    pointsUsed: 5000,
  },
  {
    id: 2,
    programName: "Serenity Spa",
    logo: "💆",
    title: "Spa Package Discount",
    description: "¥50 off on premium spa package",
    earnedDate: "2025-09-15",
    expiryDate: "2025-11-30",
    status: "available",
    pointsUsed: 10000,
  },
  {
    id: 3,
    programName: "Pizza Hut",
    logo: "🍕",
    title: "Large Pizza Free",
    description: "Redeemed on October 5, 2025",
    earnedDate: "2025-09-01",
    redeemedDate: "2025-10-05",
    status: "redeemed",
    pointsUsed: 8000,
  },
];

export default function Rewards() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations.rewards;

  const availableRewards = rewards.filter(r => r.status === "available");
  const redeemedRewards = rewards.filter(r => r.status === "redeemed");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-accent">
                  <Gift className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">{t.title[language]}</h1>
                  <p className="text-xs text-muted-foreground">
                    {availableRewards.length} {t.available[language]}
                  </p>
                </div>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Available Rewards */}
      <div className="container mx-auto space-y-6 p-4">
        <div>
          <h2 className="mb-4 text-xl font-bold">Available Rewards</h2>
          {availableRewards.length > 0 ? (
            <div className="space-y-4">
              {availableRewards.map((reward) => (
                <Card
                  key={reward.id}
                  className="overflow-hidden border shadow-md hover:shadow-premium transition-all"
                >
                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-3xl">
                          {reward.logo}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{reward.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {reward.programName}
                          </p>
                        </div>
                      </div>
                      <Badge className="gradient-accent text-accent-foreground">
                        Available
                      </Badge>
                    </div>

                    <p className="mb-4 text-sm">{reward.description}</p>

                    <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Earned: {new Date(reward.earnedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Expires: {new Date(reward.expiryDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Button
                      variant="premium"
                      className="w-full"
                      onClick={() => navigate(`/redeem-reward/${reward.id}`, { state: { reward } })}
                    >
                      Use This Reward
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Gift className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No available rewards yet</p>
            </Card>
          )}
        </div>

        {/* Redeemed Rewards */}
        <div>
          <h2 className="mb-4 text-xl font-bold">Redeemed Rewards</h2>
          {redeemedRewards.length > 0 ? (
            <div className="space-y-4">
              {redeemedRewards.map((reward) => (
                <Card key={reward.id} className="overflow-hidden border opacity-75">
                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-3xl">
                          {reward.logo}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{reward.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {reward.programName}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Redeemed
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-sm text-muted-foreground">No redeemed rewards yet</p>
            </Card>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
