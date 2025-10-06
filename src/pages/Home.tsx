import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Wallet,
  Menu,
  Utensils,
  Sparkles,
  ShoppingBag,
  Coffee,
  Home as HomeIcon,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";

const categories = [
  { id: "all", name: "All", icon: HomeIcon },
  { id: "food", name: "Food & Dining", icon: Utensils },
  { id: "spa", name: "Spa & Wellness", icon: Sparkles },
  { id: "lifestyle", name: "Lifestyle", icon: ShoppingBag },
  { id: "essentials", name: "Essentials", icon: Coffee },
];

const programs = [
  {
    id: 1,
    name: "Cafe Moments",
    category: "food",
    logo: "☕",
    points: "Earn 10 points per $1",
    distance: "0.5 km",
    outlets: 5,
  },
  {
    id: 2,
    name: "Pizza Hut",
    category: "food",
    logo: "🍕",
    points: "Earn 5 points per $1",
    distance: "1.2 km",
    outlets: 8,
  },
  {
    id: 3,
    name: "Burger King",
    category: "food",
    logo: "🍔",
    points: "Earn 8 points per $1",
    distance: "2.0 km",
    outlets: 12,
  },
  {
    id: 4,
    name: "Serenity Spa",
    category: "spa",
    logo: "💆",
    points: "Earn 15 points per $1",
    distance: "3.5 km",
    outlets: 3,
  },
  {
    id: 5,
    name: "Style Studio",
    category: "lifestyle",
    logo: "👗",
    points: "Earn 12 points per $1",
    distance: "1.8 km",
    outlets: 6,
  },
  {
    id: 6,
    name: "Daily Mart",
    category: "essentials",
    logo: "🛒",
    points: "Earn 5 points per $1",
    distance: "0.8 km",
    outlets: 15,
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrograms = programs.filter((program) => {
    const matchesCategory =
      selectedCategory === "all" || program.category === selectedCategory;
    const matchesSearch =
      program.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">ZYNO LOYALTY WALLET</h1>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/menu")}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="border-b bg-card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search programs, outlets, or locations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="border-b bg-card">
        <div className="container mx-auto overflow-x-auto px-4">
          <div className="flex gap-2 py-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <Button
                  key={category.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {selectedCategory === "all" ? "All Programs" : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <Badge variant="secondary">{filteredPrograms.length} programs</Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              onClick={() => navigate(`/program/${program.id}`)}
              className="group cursor-pointer rounded-xl border bg-card p-6 shadow-md transition-all hover:shadow-premium hover:scale-[1.02]"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-3xl">
                  {program.logo}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/wallet");
                  }}
                >
                  <span className="text-lg">+</span> Add
                </Button>
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
      </div>

      <BottomNav />
    </div>
  );
}
