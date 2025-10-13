import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Wallet as WalletIcon, Trash2, ArrowRight, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

const cards = [
  {
    id: 1,
    name: "Cafe Moments",
    logo: "☕",
    points: 12550,
    value: "¥125.50",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 2,
    name: "Pizza Hut",
    logo: "🍕",
    points: 8200,
    value: "¥164.00",
    color: "from-red-500 to-pink-600",
  },
  {
    id: 3,
    name: "Serenity Spa",
    logo: "💆",
    points: 5400,
    value: "¥360.00",
    color: "from-purple-500 to-indigo-600",
  },
];

export default function Wallet() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations.wallet;
  const [walletCards, setWalletCards] = useState(cards);
  const [deleteCardId, setDeleteCardId] = useState<number | null>(null);

  const totalValue = walletCards.reduce((acc, card) => {
    const value = parseFloat(card.value.replace("¥", ""));
    return acc + value;
  }, 0);

  const handleDeleteCard = (cardId: number) => {
    setWalletCards(prev => prev.filter(card => card.id !== cardId));
    setDeleteCardId(null);
    toast({
      title: language === "jp" ? "カードを削除しました" : "Card Removed",
      description: language === "jp" ? "ロイヤルティカードがウォレットから削除されました" : "The loyalty card has been removed from your wallet.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                  <WalletIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">{t.title[language]}</h1>
                  <p className="text-xs text-muted-foreground">
                    {cards.length} {t.cards[language]}
                  </p>
                </div>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Total Value Banner */}
      <div className="gradient-primary p-6 text-white">
        <div className="container mx-auto">
          <p className="mb-2 text-sm opacity-90">{t.totalValue[language]}</p>
          <div className="flex items-end gap-2">
            <h2 className="text-4xl font-bold">¥{totalValue.toFixed(2)}</h2>
            <div className="mb-2 flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>+12.5% {t.monthlyGrowth[language]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="container mx-auto space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{t.yourCards[language]}</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/home")}
          >
            {t.addNewCard[language]}
          </Button>
        </div>

        {walletCards.map((card) => (
          <div
            key={card.id}
            className="group relative overflow-hidden rounded-2xl border bg-card shadow-lg transition-all hover:shadow-premium"
          >
            {/* Card Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5 transition-opacity group-hover:opacity-10`}
            />

            <div className="relative p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-4xl">
                    {card.logo}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{card.name}</h4>
                    <Badge variant="secondary" className="mt-1">
                      {t.active[language]}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteCardId(card.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t.pointsBalance[language]}</p>
                  <p className="text-2xl font-bold">{card.points.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.rewardValue[language]}</p>
                  <p className="text-2xl font-bold text-primary">{card.value}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={() => navigate(`/program/${card.id}`)}
                >
                  {t.viewDetails[language]}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="premium"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/redeem/${card.id}`);
                  }}
                >
                  {t.redeem[language]}
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {walletCards.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <WalletIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{t.noCards[language]}</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {t.noCardsDesc[language]}
            </p>
            <Button variant="premium" onClick={() => navigate("/home")}>
              {t.explorePrograms[language]}
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteCardId !== null} onOpenChange={(open) => !open && setDeleteCardId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.removeCard[language]}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.removeConfirm[language]}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{translations.common.cancel[language]}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteCardId && handleDeleteCard(deleteCardId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t.remove[language]}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <BottomNav />
    </div>
  );
}
