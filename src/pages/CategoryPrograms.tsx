import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  ArrowLeft,
  Utensils,
  Sparkles,
  ShoppingBag,
  Coffee,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";

const categoryData = {
  food: { name: "Food & Dining", icon: Utensils },
  spa: { name: "Spa & Wellness", icon: Sparkles },
  lifestyle: { name: "Lifestyle", icon: ShoppingBag },
  essentials: { name: "Essentials", icon: Coffee },
};

const programs = [
  // Food & Dining
  {
    id: 1,
    name: "Cafe Moments",
    category: "food",
    logo: "☕",
    points: "Earn 10 points per ₹1",
    distance: "0.5 km",
    outlets: 5,
    trending: true,
  },
  {
    id: 2,
    name: "Pizza Hut",
    category: "food",
    logo: "🍕",
    points: "Earn 5 points per ₹1",
    distance: "1.2 km",
    outlets: 8,
    trending: false,
  },
  {
    id: 3,
    name: "Burger King",
    category: "food",
    logo: "🍔",
    points: "Earn 8 points per ₹1",
    distance: "2.0 km",
    outlets: 12,
    trending: true,
  },
  {
    id: 7,
    name: "Starbucks",
    category: "food",
    logo: "🥤",
    points: "Earn 12 points per ₹1",
    distance: "1.5 km",
    outlets: 10,
    trending: true,
  },
  {
    id: 8,
    name: "Domino's Pizza",
    category: "food",
    logo: "🍕",
    points: "Earn 6 points per ₹1",
    distance: "1.8 km",
    outlets: 15,
    trending: false,
  },
  {
    id: 9,
    name: "Subway",
    category: "food",
    logo: "🥪",
    points: "Earn 7 points per ₹1",
    distance: "2.3 km",
    outlets: 9,
    trending: false,
  },
  {
    id: 10,
    name: "KFC",
    category: "food",
    logo: "🍗",
    points: "Earn 9 points per ₹1",
    distance: "3.0 km",
    outlets: 11,
    trending: true,
  },
  {
    id: 11,
    name: "Taco Bell",
    category: "food",
    logo: "🌮",
    points: "Earn 8 points per ₹1",
    distance: "2.8 km",
    outlets: 6,
    trending: false,
  },
  
  // Spa & Wellness
  {
    id: 4,
    name: "Serenity Spa",
    category: "spa",
    logo: "💆",
    points: "Earn 15 points per ₹1",
    distance: "3.5 km",
    outlets: 3,
    trending: true,
  },
  {
    id: 12,
    name: "Bliss Wellness",
    category: "spa",
    logo: "🧘",
    points: "Earn 18 points per ₹1",
    distance: "2.5 km",
    outlets: 4,
    trending: true,
  },
  {
    id: 13,
    name: "Glow Beauty Salon",
    category: "spa",
    logo: "💇",
    points: "Earn 14 points per ₹1",
    distance: "1.2 km",
    outlets: 7,
    trending: false,
  },
  {
    id: 14,
    name: "Zen Massage",
    category: "spa",
    logo: "💆‍♂️",
    points: "Earn 16 points per ₹1",
    distance: "4.0 km",
    outlets: 2,
    trending: false,
  },
  {
    id: 15,
    name: "Fitness First",
    category: "spa",
    logo: "🏋️",
    points: "Earn 10 points per ₹1",
    distance: "1.8 km",
    outlets: 8,
    trending: true,
  },
  
  // Lifestyle
  {
    id: 5,
    name: "Style Studio",
    category: "lifestyle",
    logo: "👗",
    points: "Earn 12 points per ₹1",
    distance: "1.8 km",
    outlets: 6,
    trending: false,
  },
  {
    id: 16,
    name: "Zara Fashion",
    category: "lifestyle",
    logo: "👔",
    points: "Earn 10 points per ₹1",
    distance: "2.2 km",
    outlets: 5,
    trending: true,
  },
  {
    id: 17,
    name: "Sneaker Zone",
    category: "lifestyle",
    logo: "👟",
    points: "Earn 15 points per ₹1",
    distance: "3.1 km",
    outlets: 4,
    trending: true,
  },
  {
    id: 18,
    name: "Accessory Hub",
    category: "lifestyle",
    logo: "👜",
    points: "Earn 11 points per ₹1",
    distance: "1.5 km",
    outlets: 9,
    trending: false,
  },
  {
    id: 19,
    name: "Watch World",
    category: "lifestyle",
    logo: "⌚",
    points: "Earn 13 points per ₹1",
    distance: "2.9 km",
    outlets: 3,
    trending: false,
  },
  {
    id: 20,
    name: "Eyewear Express",
    category: "lifestyle",
    logo: "🕶️",
    points: "Earn 14 points per ₹1",
    distance: "2.4 km",
    outlets: 7,
    trending: true,
  },
  
  // Essentials
  {
    id: 6,
    name: "Daily Mart",
    category: "essentials",
    logo: "🛒",
    points: "Earn 5 points per ₹1",
    distance: "0.8 km",
    outlets: 15,
    trending: true,
  },
  {
    id: 21,
    name: "FreshGrocery",
    category: "essentials",
    logo: "🥬",
    points: "Earn 6 points per ₹1",
    distance: "1.0 km",
    outlets: 12,
    trending: true,
  },
  {
    id: 22,
    name: "PharmaCare",
    category: "essentials",
    logo: "💊",
    points: "Earn 8 points per ₹1",
    distance: "0.6 km",
    outlets: 20,
    trending: false,
  },
  {
    id: 23,
    name: "Electronics Plus",
    category: "essentials",
    logo: "📱",
    points: "Earn 10 points per ₹1",
    distance: "2.7 km",
    outlets: 6,
    trending: true,
  },
];

export default function CategoryPrograms() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const category = categoryData[categoryId as keyof typeof categoryData];
  const CategoryIcon = category?.icon;

  const filteredPrograms = programs.filter((program) => {
    const matchesCategory = program.category === categoryId;
    const matchesSearch =
      program.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!category) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Glass Effect */}
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary shadow-glow">
                {CategoryIcon && <CategoryIcon className="h-6 w-6 text-white" />}
              </div>
              <div>
                <h1 className="text-lg font-bold">{category.name}</h1>
                <p className="text-xs text-muted-foreground">
                  {filteredPrograms.length} {filteredPrograms.length === 1 ? 'program' : 'programs'} available
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search with Modern Design */}
      <div className="border-b bg-gradient-to-br from-muted/50 to-background p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
          <Input
            placeholder="Search programs..."
            className="pl-12 h-12 rounded-2xl border-2 focus:border-primary bg-card/50 backdrop-blur"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Programs Grid with Enhanced Cards */}
      <div className="container mx-auto p-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Available Programs</h2>
            <p className="text-sm text-muted-foreground mt-1">Tap to view details & start earning 🎉</p>
          </div>
          <Badge variant="secondary" className="rounded-full px-4 py-2">
            {filteredPrograms.length} programs
          </Badge>
        </div>

        {filteredPrograms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-muted-foreground">No programs found</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPrograms.map((program, index) => (
              <div
                key={program.id}
                onClick={() => navigate(`/program/${program.id}`)}
                className="group cursor-pointer rounded-3xl border-2 bg-card shadow-card hover:shadow-glow transition-all hover:scale-[1.03] overflow-hidden hover-lift relative"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Trending Badge */}
                {program.trending && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-glow">
                      🔥 Trending
                    </div>
                  </div>
                )}

                {/* Logo Section */}
                <div className="p-6 pb-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-muted to-muted/50 text-5xl shadow-card group-hover:scale-110 transition-transform">
                    {program.logo}
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-6 pb-6">
                  <h3 className="mb-2 text-xl font-bold group-hover:text-primary transition-colors">
                    {program.name}
                  </h3>
                  <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {program.points}
                  </div>

                  <div className="flex items-center justify-between text-sm pt-4 border-t">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">{program.distance}</span>
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {program.outlets} outlets
                    </div>
                  </div>
                </div>

                {/* Hover Gradient Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
