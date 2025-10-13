import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Plus, Check, Gift, Tag, ShoppingBag, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

const programsData = {
  1: {
    id: 1,
    name: { en: "Cafe Moments", jp: "カフェモーメント" },
    logo: "☕",
    points: 12550,
    earnRate: { en: "Earn 10 points per ¥1", jp: "¥1につき10ポイント獲得" },
    outlets: 5,
    distance: "0.5 km",
    description: { en: "Your favorite coffee shop with rewards on every purchase.", jp: "お気に入りのコーヒーショップで購入ごとにリワードを獲得。" },
    validity: { en: "Valid until Dec 31, 2025", jp: "2025年12月31日まで有効" },
    isAdded: true,
  },
  2: {
    id: 2,
    name: { en: "Pizza Hut", jp: "ピザハット" },
    logo: "🍕",
    points: 0,
    earnRate: { en: "Earn 5 points per ¥1", jp: "¥1につき5ポイント獲得" },
    outlets: 8,
    distance: "1.2 km",
    description: { en: "Enjoy delicious pizzas and earn rewards with every order.", jp: "美味しいピザを楽しみながら注文ごとにリワードを獲得。" },
    validity: { en: "Valid until Dec 31, 2025", jp: "2025年12月31日まで有効" },
    isAdded: false,
  },
};

const offersData = {
  1: [
    {
      id: 1,
      title: { en: "Buy 1 Get 1 Free", jp: "1つ買うと1つ無料" },
      description: { en: "Buy any coffee and get another one free", jp: "コーヒーを購入するともう1つ無料" },
      validity: { en: "Valid until Dec 31, 2025", jp: "2025年12月31日まで有効" },
    },
  ],
  2: [
    {
      id: 2,
      title: { en: "Happy Hours - 10% Off", jp: "ハッピーアワー - 10%オフ" },
      description: { en: "Get 10% off on all pizzas between 3-6 PM", jp: "午後3時～6時の間、全ピザが10%オフ" },
      validity: { en: "Valid until Dec 31, 2025", jp: "2025年12月31日まで有効" },
    },
  ],
};

const punchCardData = {
  1: {
    current: 7,
    total: 10,
    reward: { en: "Free coffee of any size", jp: "お好きなサイズのコーヒー無料" },
  },
  2: {
    current: 3,
    total: 10,
    reward: { en: "Free large pizza", jp: "ラージピザ無料" },
  },
};

const transactionHistory = {
  1: [
    { date: "2025-10-01", type: { en: "Earned", jp: "獲得" }, points: 250, description: { en: "Purchase at Main Street", jp: "メインストリートでの購入" } },
    { date: "2025-09-28", type: { en: "Redeemed", jp: "引き換え済み" }, points: -500, description: { en: "Free coffee reward", jp: "無料コーヒーリワード" } },
    { date: "2025-09-25", type: { en: "Earned", jp: "獲得" }, points: 180, description: { en: "Purchase at Downtown", jp: "ダウンタウンでの購入" } },
  ],
};

export default function ProgramDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { language } = useLanguage();
  const programId = parseInt(id || "1");
  const t = translations;
  const lang = language;

  const program = programsData[programId as keyof typeof programsData] || programsData[1];
  const [isAdded, setIsAdded] = useState(program.isAdded);
  const offers = offersData[programId as keyof typeof offersData] || [];
  const punchCard = punchCardData[programId as keyof typeof punchCardData];
  const transactions = transactionHistory[programId as keyof typeof transactionHistory] || [];

  const handleAddCard = () => {
    setIsAdded(true);
    toast({
      title: t.common.success[lang],
      description: `${program.name} ${lang === "en" ? "has been added to your wallet" : "がウォレットに追加されました"}`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              {!isAdded && (
                <Button variant="premium" size="sm" onClick={handleAddCard}>
                  <Plus className="h-4 w-4 mr-1" /> {t.programDetails.addCard[lang]}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Program Header */}
      <div className="gradient-primary p-6 text-white">
        <div className="container mx-auto">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-5xl">
              {program.logo}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{typeof program.name === 'string' ? program.name : program.name[lang]}</h1>
              <p className="text-sm opacity-90">{program.earnRate[lang]}</p>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{program.outlets} {t.programDetails.outlets[lang]} • {program.distance} {t.programDetails.away[lang]}</span>
              </div>
            </div>
          </div>
          {isAdded && (
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <p className="mb-1 text-sm opacity-90">{t.programDetails.totalPoints[lang]}</p>
              <p className="text-3xl font-bold">{program.points.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Content */}
      <div className="container mx-auto p-4">
        <Tabs defaultValue="program" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="program">{t.programDetails.tabs.program[lang]}</TabsTrigger>
            <TabsTrigger value="offers">{t.programDetails.tabs.offers[lang]}</TabsTrigger>
            <TabsTrigger value="punch">{t.programDetails.tabs.punch[lang]}</TabsTrigger>
            {isAdded && <TabsTrigger value="history">{t.programDetails.tabs.history[lang]}</TabsTrigger>}
            {!isAdded && <TabsTrigger value="shop">{t.programDetails.tabs.shop[lang]}</TabsTrigger>}
          </TabsList>

          <TabsContent value="program" className="space-y-4">
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-bold">{t.programDetails.aboutProgram[lang]}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{program.description[lang]}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.programDetails.earnRate[lang]}:</span>
                  <span className="font-medium">{program.earnRate[lang]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.programDetails.validity[lang]}:</span>
                  <span className="font-medium">{program.validity[lang]}</span>
                </div>
              </div>
            </Card>

            {isAdded && (
              <Button
                variant="premium"
                className="w-full"
                size="lg"
                onClick={() => navigate(`/redeem/${programId}`)}
              >
                {t.programDetails.redeemPoints[lang]}
              </Button>
            )}

            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => {}}>
                <Info className="h-4 w-4 mr-2" /> {t.programDetails.howItWorks[lang]}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => {}}>
                {t.programDetails.termsOfUse[lang]}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => {}}>
                {t.programDetails.faqs[lang]}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            {offers.map((offer) => (
              <Card key={offer.id} className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{offer.title[lang]}</h3>
                    <p className="text-sm text-muted-foreground">{offer.description[lang]}</p>
                  </div>
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <p className="mb-4 text-xs text-muted-foreground">{offer.validity[lang]}</p>
                <Button variant="premium" className="w-full">
                  {t.offers.claimOffer[lang]}
                </Button>
              </Card>
            ))}
            {offers.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-sm text-muted-foreground">{t.programDetails.noOffers[lang]}</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="punch" className="space-y-4">
            {punchCard ? (
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-bold">{t.programDetails.punchProgress[lang]}</h3>
                <div className="mb-6">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{t.programDetails.progress[lang]}</span>
                    <span className="font-bold">{punchCard.current} / {punchCard.total}</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full gradient-primary transition-all"
                      style={{ width: `${(punchCard.current / punchCard.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="mb-6 grid grid-cols-5 gap-2">
                  {Array.from({ length: punchCard.total }).map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg border-2 flex items-center justify-center ${
                        i < punchCard.current
                          ? "border-primary bg-primary/10"
                          : "border-border"
                      }`}
                    >
                      {i < punchCard.current && <Check className="h-5 w-5 text-primary" />}
                    </div>
                  ))}
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="h-5 w-5 text-primary" />
                    <span className="font-bold">{t.programDetails.reward[lang]}:</span>
                  </div>
                  <p className="text-sm">{punchCard.reward[lang]}</p>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-sm text-muted-foreground">{t.programDetails.noPunchCard[lang]}</p>
              </Card>
            )}
          </TabsContent>

          {isAdded && (
            <TabsContent value="history" className="space-y-4">
              {transactions.map((txn, idx) => (
                <Card key={idx} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{txn.description[lang]}</p>
                      <p className="text-xs text-muted-foreground">{txn.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${txn.points > 0 ? "text-primary" : "text-muted-foreground"}`}>
                        {txn.points > 0 ? "+" : ""}{txn.points}
                      </p>
                      <p className="text-xs text-muted-foreground">{txn.type[lang]}</p>
                    </div>
                  </div>
                </Card>
              ))}
              {transactions.length === 0 && (
                <Card className="p-8 text-center">
                  <p className="text-sm text-muted-foreground">{t.programDetails.noHistory[lang]}</p>
                </Card>
              )}
            </TabsContent>
          )}

          {!isAdded && (
            <TabsContent value="shop">
              <Card className="p-8 text-center">
                <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">{t.programDetails.shopComingSoon[lang]}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t.programDetails.shopDesc[lang]}
                </p>
                <Button variant="premium" onClick={handleAddCard}>
                  <Plus className="h-4 w-4 mr-2" /> {t.programDetails.addCardNow[lang]}
                </Button>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
}
