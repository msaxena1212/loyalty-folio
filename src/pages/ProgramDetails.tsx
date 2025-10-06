import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Plus, Check, Gift, Tag, ShoppingBag, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const programsData = [
  {
    id: 1,
    name: "Cafe Moments",
    logo: "☕",
    points: 12550,
    earnRate: "Earn 10 points per ₹1",
    outlets: 5,
    distance: "0.5 km",
    description: "Your favorite coffee shop with rewards on every purchase.",
    validity: "Valid until Dec 31, 2025",
    isAdded: true,
  },
  {
    id: 2,
    name: "Pizza Hut",
    logo: "🍕",
    points: 0,
    earnRate: "Earn 5 points per ₹1",
    outlets: 8,
    distance: "1.2 km",
    description: "Enjoy delicious pizzas and earn rewards with every order.",
    validity: "Valid until Dec 31, 2025",
    isAdded: false,
  },
];

const offersData = {
  1: [
    {
      id: 1,
      title: "Buy 1 Get 1 Free",
      description: "Buy any coffee and get another one free",
      validity: "Valid until Dec 31, 2025",
    },
  ],
  2: [
    {
      id: 2,
      title: "Happy Hours - 10% Off",
      description: "Get 10% off on all pizzas between 3-6 PM",
      validity: "Valid until Dec 31, 2025",
    },
  ],
};

const punchCardData = {
  1: {
    current: 7,
    total: 10,
    reward: "Free coffee of any size",
  },
  2: {
    current: 3,
    total: 10,
    reward: "Free large pizza",
  },
};

const transactionHistory = {
  1: [
    { date: "2025-10-01", type: "Earned", points: 250, description: "Purchase at Main Street" },
    { date: "2025-09-28", type: "Redeemed", points: -500, description: "Free coffee reward" },
    { date: "2025-09-25", type: "Earned", points: 180, description: "Purchase at Downtown" },
  ],
};

export default function ProgramDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const programId = parseInt(id || "1");

  const program = programsData.find(p => p.id === programId) || programsData[0];
  const [isAdded, setIsAdded] = useState(program.isAdded);
  const offers = offersData[programId as keyof typeof offersData] || [];
  const punchCard = punchCardData[programId as keyof typeof punchCardData];
  const transactions = transactionHistory[programId as keyof typeof transactionHistory] || [];

  const handleAddCard = () => {
    setIsAdded(true);
    toast({
      title: "Card Added!",
      description: `₹{program.name} has been added to your wallet.`,
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
            {!isAdded && (
              <Button variant="premium" size="sm" onClick={handleAddCard}>
                <Plus className="h-4 w-4 mr-1" /> Add Card
              </Button>
            )}
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
              <h1 className="text-2xl font-bold">{program.name}</h1>
              <p className="text-sm opacity-90">{program.earnRate}</p>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{program.outlets} outlets • {program.distance} away</span>
              </div>
            </div>
          </div>
          {isAdded && (
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <p className="mb-1 text-sm opacity-90">Total Points</p>
              <p className="text-3xl font-bold">{program.points.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Content */}
      <div className="container mx-auto p-4">
        <Tabs defaultValue="program" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="program">Program</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="punch">Punch Card</TabsTrigger>
            {isAdded && <TabsTrigger value="history">History</TabsTrigger>}
            {!isAdded && <TabsTrigger value="shop">Shop</TabsTrigger>}
          </TabsList>

          <TabsContent value="program" className="space-y-4">
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-bold">About the Program</h3>
              <p className="mb-4 text-sm text-muted-foreground">{program.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Earn Rate:</span>
                  <span className="font-medium">{program.earnRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Validity:</span>
                  <span className="font-medium">{program.validity}</span>
                </div>
              </div>
            </Card>

            {isAdded && (
              <Button
                variant="premium"
                className="w-full"
                size="lg"
                onClick={() => navigate(`/redeem/₹{programId}`)}
              >
                Redeem Points
              </Button>
            )}

            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => {}}>
                <Info className="h-4 w-4 mr-2" /> How It Works
              </Button>
              <Button variant="outline" className="w-full" onClick={() => {}}>
                Terms of Use
              </Button>
              <Button variant="outline" className="w-full" onClick={() => {}}>
                FAQs
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            {offers.map((offer) => (
              <Card key={offer.id} className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{offer.title}</h3>
                    <p className="text-sm text-muted-foreground">{offer.description}</p>
                  </div>
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <p className="mb-4 text-xs text-muted-foreground">{offer.validity}</p>
                <Button variant="premium" className="w-full">
                  Claim Offer
                </Button>
              </Card>
            ))}
            {offers.length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-sm text-muted-foreground">No offers available right now</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="punch" className="space-y-4">
            {punchCard ? (
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-bold">Punch Card Progress</h3>
                <div className="mb-6">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-bold">{punchCard.current} / {punchCard.total}</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full gradient-primary transition-all"
                      style={{ width: `₹{(punchCard.current / punchCard.total) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="mb-6 grid grid-cols-5 gap-2">
                  {Array.from({ length: punchCard.total }).map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg border-2 flex items-center justify-center ₹{
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
                    <span className="font-bold">Reward:</span>
                  </div>
                  <p className="text-sm">{punchCard.reward}</p>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-sm text-muted-foreground">No punch card available</p>
              </Card>
            )}
          </TabsContent>

          {isAdded && (
            <TabsContent value="history" className="space-y-4">
              {transactions.map((txn, idx) => (
                <Card key={idx} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{txn.description}</p>
                      <p className="text-xs text-muted-foreground">{txn.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ₹{txn.points > 0 ? "text-primary" : "text-muted-foreground"}`}>
                        {txn.points > 0 ? "+" : ""}{txn.points}
                      </p>
                      <p className="text-xs text-muted-foreground">{txn.type}</p>
                    </div>
                  </div>
                </Card>
              ))}
              {transactions.length === 0 && (
                <Card className="p-8 text-center">
                  <p className="text-sm text-muted-foreground">No transaction history yet</p>
                </Card>
              )}
            </TabsContent>
          )}

          {!isAdded && (
            <TabsContent value="shop">
              <Card className="p-8 text-center">
                <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">Shop Coming Soon</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Add this card to unlock shopping features
                </p>
                <Button variant="premium" onClick={handleAddCard}>
                  <Plus className="h-4 w-4 mr-2" /> Add Card Now
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
