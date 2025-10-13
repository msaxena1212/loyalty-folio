import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
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
  Languages,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import zynoLogo from "@/assets/zyno-logo.png";

const categories = [
  { 
    id: "food", 
    icon: Utensils,
    emoji: "🍔",
    count: 8,
    color: "from-orange-400 via-red-400 to-pink-500"
  },
  { 
    id: "spa", 
    icon: Sparkles,
    emoji: "💆",
    count: 5,
    color: "from-purple-400 via-pink-400 to-rose-500"
  },
  { 
    id: "lifestyle", 
    icon: ShoppingBag,
    emoji: "👗",
    count: 6,
    color: "from-pink-400 via-purple-400 to-indigo-500"
  },
  { 
    id: "essentials", 
    icon: Coffee,
    emoji: "🛒",
    count: 4,
    color: "from-cyan-400 via-blue-400 to-indigo-500"
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { language, setLanguage, isJapanese } = useLanguage();
  const t = translations.home;

  const filteredCategories = categories.filter((category) =>
    t.categories[category.id as keyof typeof t.categories].name[language].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Glass Effect */}
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={zynoLogo} alt="Zyno Logo" className="h-12 w-12 rounded-xl shadow-lg" />
              <div>
                <h1 className="text-xl font-bold text-primary">
                  Zyno <span className="text-secondary">Loyalty</span>
                </h1>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{t.location[language]}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">EN</span>
                <Switch 
                  checked={isJapanese} 
                  onCheckedChange={(checked) => setLanguage(checked ? "jp" : "en")}
                  className="scale-75"
                />
                <span className="text-xs font-medium text-muted-foreground">JP</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10"
                onClick={() => navigate("/menu")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search with Modern Design */}
      <div className="border-b bg-gradient-to-br from-muted/50 to-background p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
          <Input
            placeholder={t.search[language]}
            className="pl-12 h-12 rounded-2xl border-2 focus:border-primary bg-card/50 backdrop-blur"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Hero Section */}
      <div className="gradient-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2 animate-float">✨ {t.hero.title[language]}</h2>
          <p className="text-white/90">{t.hero.subtitle[language]}</p>
        </div>
      </div>

      {/* Categories Grid with Enhanced Design */}
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{t.sections.explore[language]}</h2>
          <p className="text-muted-foreground">{t.sections.description[language]}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {filteredCategories.map((category, index) => {
            const Icon = category.icon;
            const categoryTranslation = t.categories[category.id as keyof typeof t.categories];
            return (
              <div
                key={category.id}
                onClick={() => navigate(`/category/${category.id}`)}
                className="group cursor-pointer rounded-3xl border-2 bg-card shadow-card hover:shadow-glow transition-all hover:scale-[1.03] overflow-hidden hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Background with Emoji */}
                <div className={`h-40 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute top-4 right-4 text-5xl opacity-20 animate-float">
                    {category.emoji}
                  </div>
                  <div className="relative h-full flex flex-col items-center justify-center">
                    <Icon className="h-16 w-16 text-white mb-2 group-hover:scale-110 transition-transform" />
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full">
                      <span className="text-white text-sm font-semibold">
                        {category.count} {t.programs[language]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content with Modern Typography */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {categoryTranslation.name[language]}
                    </h3>
                    <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {categoryTranslation.description[language]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fun Stats Section */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="text-2xl font-bold text-primary">23+</div>
            <div className="text-xs text-muted-foreground mt-1">{t.stats.programs[language]}</div>
          </div>
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10">
            <div className="text-2xl font-bold text-accent">50K+</div>
            <div className="text-xs text-muted-foreground mt-1">{t.stats.members[language]}</div>
          </div>
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/10">
            <div className="text-2xl font-bold text-secondary">¥2M+</div>
            <div className="text-xs text-muted-foreground mt-1">{t.stats.saved[language]}</div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
