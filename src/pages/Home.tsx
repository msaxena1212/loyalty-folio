import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Wallet,
  Menu,
  Utensils,
  Sparkles,
  ShoppingBag,
  Coffee,
  ChevronRight,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";

const categories = [
  { 
    id: "food", 
    name: "Food & Dining", 
    icon: Utensils,
    description: "Restaurants, Cafes & More",
    count: 3,
    color: "from-orange-500 to-red-600"
  },
  { 
    id: "spa", 
    name: "Spa & Wellness", 
    icon: Sparkles,
    description: "Relaxation & Self-care",
    count: 1,
    color: "from-purple-500 to-indigo-600"
  },
  { 
    id: "lifestyle", 
    name: "Lifestyle", 
    icon: ShoppingBag,
    description: "Fashion & Accessories",
    count: 1,
    color: "from-pink-500 to-rose-600"
  },
  { 
    id: "essentials", 
    name: "Essentials", 
    icon: Coffee,
    description: "Daily Needs & Groceries",
    count: 1,
    color: "from-blue-500 to-cyan-600"
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            placeholder="Search categories..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Explore Categories</h2>
          <p className="text-muted-foreground">Choose a category to discover loyalty programs</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => navigate(`/category/${category.id}`)}
                className="group cursor-pointer rounded-xl border bg-card shadow-md transition-all hover:shadow-premium hover:scale-[1.02] overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`h-32 bg-gradient-to-br ${category.color} relative`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative h-full flex items-center justify-center">
                    <Icon className="h-16 w-16 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">
                      {category.count} {category.count === 1 ? 'Program' : 'Programs'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
