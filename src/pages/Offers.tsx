import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Tag, Clock, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const offers = [
  {
    id: 1,
    programId: 1,
    programName: "Cafe Moments",
    logo: "☕",
    title: "Buy 1 Get 1 Free",
    description: "Buy any coffee and get another one free",
    validity: "Valid until Dec 31, 2025",
    pointsRequired: 1000,
    claimed: false,
    expired: false,
  },
  {
    id: 2,
    programId: 2,
    programName: "Pizza Hut",
    logo: "🍕",
    title: "Happy Hours - 10% Off",
    description: "Get 10% off on all pizzas between 3-6 PM",
    validity: "Valid until Dec 31, 2025",
    pointsRequired: 500,
    claimed: false,
    expired: false,
  },
  {
    id: 3,
    programId: 4,
    programName: "Serenity Spa",
    logo: "💆",
    title: "High Tea Special",
    description: "Complimentary high tea with any spa package",
    validity: "Valid until Nov 30, 2025",
    pointsRequired: 2000,
    claimed: false,
    expired: false,
  },
];

export default function Offers() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [localOffers, setLocalOffers] = useState(offers);

  const handleClaimOffer = (offerId: number) => {
    setLocalOffers(prev =>
      prev.map(offer =>
        offer.id === offerId ? { ...offer, claimed: true } : offer
      )
    );
    toast({
      title: "Offer Claimed!",
      description: "This offer is now saved to your wallet.",
    });
  };

  const handleRedeemOffer = (offer: typeof offers[0]) => {
    navigate(`/redeem-offer/₹{offer.id}`, { state: { offer } });
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
              <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-secondary">
                <Tag className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">Available Offers</h1>
                <p className="text-xs text-muted-foreground">
                  {localOffers.filter(o => !o.expired).length} active offers
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Offers List */}
      <div className="container mx-auto space-y-4 p-4">
        {localOffers.map((offer) => (
          <Card
            key={offer.id}
            className="overflow-hidden border shadow-md hover:shadow-premium transition-all"
          >
            <div className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-3xl">
                    {offer.logo}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{offer.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {offer.programName}
                    </p>
                  </div>
                </div>
                {offer.claimed && (
                  <Badge variant="secondary" className="gap-1">
                    <Check className="h-3 w-3" /> Claimed
                  </Badge>
                )}
              </div>

              <p className="mb-4 text-sm">{offer.description}</p>

              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{offer.validity}</span>
              </div>

              <div className="mb-4">
                <Badge variant="outline">{offer.pointsRequired} points required</Badge>
              </div>

              <div className="flex gap-2">
                {!offer.claimed ? (
                  <Button
                    variant="premium"
                    className="flex-1"
                    onClick={() => handleClaimOffer(offer.id)}
                  >
                    Claim Offer
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={() => handleRedeemOffer(offer)}
                    >
                      Redeem Now
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/program/₹{offer.programId}`)}
                    >
                      View Program
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}

        {/* Empty State */}
        {localOffers.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Tag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No Offers Available</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Check back later for exciting offers
            </p>
            <Button variant="premium" onClick={() => navigate("/home")}>
              Explore Programs
            </Button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
