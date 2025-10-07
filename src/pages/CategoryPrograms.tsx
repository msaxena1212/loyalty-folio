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
  {
    id: 1,
    name: "Cafe Moments",
    category: "food",
    logo: "☕",
    points: "Earn 10 points per ₹1",
    distance: "0.5 km",
    outlets: 5,
  },
  {
    id: 2,
    name: "Pizza Hut",
    category: "food",
    logo: "🍕",
    points: "Earn 5 points per ₹1",
    distance: "1.2 km",
    outlets: 8,
  },
  {
    id: 3,
    name: "Burger King",
    category: "food",
    logo: "🍔",
    points: "Earn 8 points per ₹1",
    distance: "2.0 km",
    outlets: 12,
  },
  {
    id: 4,
    name: "Serenity Spa",
    category: "spa",
    logo: "💆",
    points: "Earn 15 points per ₹1",
    distance: "3.5 km",
    outlets: 3,
  },
  {
    id: 5,
    name: "Style Studio",
    category: "lifestyle",
    logo: "👗",
    points: "Earn 12 points per ₹1",
    distance: "1.8 km",
    outlets: 6,
  },
  {
    id: 6,
    name: "Daily Mart",
    category: "essentials",
    logo: "🛒",
    points: "Earn 5 points per ₹1",
    distance: "0.8 km",
    outlets: 15,
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
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary">
                {CategoryIcon && <CategoryIcon className="h-5 w-5 text-white" />}
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

      {/* Search */}
      <div className="border-b bg-card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search programs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Programs Grid */}
      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Available Programs</h2>
          <Badge variant="secondary">{filteredPrograms.length} programs</Badge>
        </div>

        {filteredPrograms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No programs found</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                onClick={() => navigate(`/program/${program.id}`)}
                className="group cursor-pointer rounded-xl border bg-card p-6 shadow-md transition-all hover:shadow-premium hover:scale-[1.02]"
              >
                <div className="mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-3xl">
                    {program.logo}
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-bold">{program.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{program.points}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{program.distance}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {program.outlets} outlets
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
