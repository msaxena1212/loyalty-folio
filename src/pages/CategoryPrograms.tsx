import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
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
import { LanguageToggle } from "@/components/LanguageToggle";

const categoryData = {
  food: { icon: Utensils },
  spa: { icon: Sparkles },
  lifestyle: { icon: ShoppingBag },
  essentials: { icon: Coffee },
};

const programs = [
  // Food & Dining
  {
    id: 1,
    name: { en: "Cafe Moments", jp: "カフェモーメント" },
    category: "food",
    logo: "☕",
    points: { en: "Earn 10 points per ¥1", jp: "¥1につき10ポイント獲得" },
    distance: "0.5 km",
    outlets: 5,
    trending: true,
  },
  {
    id: 2,
    name: { en: "Pizza Hut", jp: "ピザハット" },
    category: "food",
    logo: "🍕",
    points: { en: "Earn 5 points per ¥1", jp: "¥1につき5ポイント獲得" },
    distance: "1.2 km",
    outlets: 8,
    trending: false,
  },
  {
    id: 3,
    name: { en: "Burger King", jp: "バーガーキング" },
    category: "food",
    logo: "🍔",
    points: { en: "Earn 8 points per ¥1", jp: "¥1につき8ポイント獲得" },
    distance: "2.0 km",
    outlets: 12,
    trending: true,
  },
  {
    id: 7,
    name: { en: "Starbucks", jp: "スターバックス" },
    category: "food",
    logo: "🥤",
    points: { en: "Earn 12 points per ¥1", jp: "¥1につき12ポイント獲得" },
    distance: "1.5 km",
    outlets: 10,
    trending: true,
  },
  {
    id: 8,
    name: { en: "Domino's Pizza", jp: "ドミノピザ" },
    category: "food",
    logo: "🍕",
    points: { en: "Earn 6 points per ¥1", jp: "¥1につき6ポイント獲得" },
    distance: "1.8 km",
    outlets: 15,
    trending: false,
  },
  {
    id: 9,
    name: { en: "Subway", jp: "サブウェイ" },
    category: "food",
    logo: "🥪",
    points: { en: "Earn 7 points per ¥1", jp: "¥1につき7ポイント獲得" },
    distance: "2.3 km",
    outlets: 9,
    trending: false,
  },
  {
    id: 10,
    name: { en: "KFC", jp: "ケンタッキー" },
    category: "food",
    logo: "🍗",
    points: { en: "Earn 9 points per ¥1", jp: "¥1につき9ポイント獲得" },
    distance: "3.0 km",
    outlets: 11,
    trending: true,
  },
  {
    id: 11,
    name: { en: "Taco Bell", jp: "タコベル" },
    category: "food",
    logo: "🌮",
    points: { en: "Earn 8 points per ¥1", jp: "¥1につき8ポイント獲得" },
    distance: "2.8 km",
    outlets: 6,
    trending: false,
  },
  
  // Spa & Wellness
  {
    id: 4,
    name: { en: "Serenity Spa", jp: "セレニティスパ" },
    category: "spa",
    logo: "💆",
    points: { en: "Earn 15 points per ¥1", jp: "¥1につき15ポイント獲得" },
    distance: "3.5 km",
    outlets: 3,
    trending: true,
  },
  {
    id: 12,
    name: { en: "Bliss Wellness", jp: "ブリスウェルネス" },
    category: "spa",
    logo: "🧘",
    points: { en: "Earn 18 points per ¥1", jp: "¥1につき18ポイント獲得" },
    distance: "2.5 km",
    outlets: 4,
    trending: true,
  },
  {
    id: 13,
    name: { en: "Glow Beauty Salon", jp: "グロービューティーサロン" },
    category: "spa",
    logo: "💇",
    points: { en: "Earn 14 points per ¥1", jp: "¥1につき14ポイント獲得" },
    distance: "1.2 km",
    outlets: 7,
    trending: false,
  },
  {
    id: 14,
    name: { en: "Zen Massage", jp: "禅マッサージ" },
    category: "spa",
    logo: "💆‍♂️",
    points: { en: "Earn 16 points per ¥1", jp: "¥1につき16ポイント獲得" },
    distance: "4.0 km",
    outlets: 2,
    trending: false,
  },
  {
    id: 15,
    name: { en: "Fitness First", jp: "フィットネスファースト" },
    category: "spa",
    logo: "🏋️",
    points: { en: "Earn 10 points per ¥1", jp: "¥1につき10ポイント獲得" },
    distance: "1.8 km",
    outlets: 8,
    trending: true,
  },
  
  // Lifestyle
  {
    id: 5,
    name: { en: "Style Studio", jp: "スタイルスタジオ" },
    category: "lifestyle",
    logo: "👗",
    points: { en: "Earn 12 points per ¥1", jp: "¥1につき12ポイント獲得" },
    distance: "1.8 km",
    outlets: 6,
    trending: false,
  },
  {
    id: 16,
    name: { en: "Zara Fashion", jp: "ザラファッション" },
    category: "lifestyle",
    logo: "👔",
    points: { en: "Earn 10 points per ¥1", jp: "¥1につき10ポイント獲得" },
    distance: "2.2 km",
    outlets: 5,
    trending: true,
  },
  {
    id: 17,
    name: { en: "Sneaker Zone", jp: "スニーカーゾーン" },
    category: "lifestyle",
    logo: "👟",
    points: { en: "Earn 15 points per ¥1", jp: "¥1につき15ポイント獲得" },
    distance: "3.1 km",
    outlets: 4,
    trending: true,
  },
  {
    id: 18,
    name: { en: "Accessory Hub", jp: "アクセサリーハブ" },
    category: "lifestyle",
    logo: "👜",
    points: { en: "Earn 11 points per ¥1", jp: "¥1につき11ポイント獲得" },
    distance: "1.5 km",
    outlets: 9,
    trending: false,
  },
  {
    id: 19,
    name: { en: "Watch World", jp: "ウォッチワールド" },
    category: "lifestyle",
    logo: "⌚",
    points: { en: "Earn 13 points per ¥1", jp: "¥1につき13ポイント獲得" },
    distance: "2.9 km",
    outlets: 3,
    trending: false,
  },
  {
    id: 20,
    name: { en: "Eyewear Express", jp: "アイウェアエクスプレス" },
    category: "lifestyle",
    logo: "🕶️",
    points: { en: "Earn 14 points per ¥1", jp: "¥1につき14ポイント獲得" },
    distance: "2.4 km",
    outlets: 7,
    trending: true,
  },
  
  // Essentials
  {
    id: 6,
    name: { en: "Daily Mart", jp: "デイリーマート" },
    category: "essentials",
    logo: "🛒",
    points: { en: "Earn 5 points per ¥1", jp: "¥1につき5ポイント獲得" },
    distance: "0.8 km",
    outlets: 15,
    trending: true,
  },
  {
    id: 21,
    name: { en: "FreshGrocery", jp: "フレッシュグロサリー" },
    category: "essentials",
    logo: "🥬",
    points: { en: "Earn 6 points per ¥1", jp: "¥1につき6ポイント獲得" },
    distance: "1.0 km",
    outlets: 12,
    trending: true,
  },
  {
    id: 22,
    name: { en: "PharmaCare", jp: "ファーマケア" },
    category: "essentials",
    logo: "💊",
    points: { en: "Earn 8 points per ¥1", jp: "¥1につき8ポイント獲得" },
    distance: "0.6 km",
    outlets: 20,
    trending: false,
  },
  {
    id: 23,
    name: { en: "Electronics Plus", jp: "エレクトロニクスプラス" },
    category: "essentials",
    logo: "📱",
    points: { en: "Earn 10 points per ¥1", jp: "¥1につき10ポイント獲得" },
    distance: "2.7 km",
    outlets: 6,
    trending: true,
  },
];

export default function CategoryPrograms() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const { language } = useLanguage();
  const t = translations.categoryPrograms;

  const category = categoryData[categoryId as keyof typeof categoryData];
  const CategoryIcon = category?.icon;
  const categoryName = categoryId ? t.categories[categoryId as keyof typeof t.categories]?.[language] : "";

  const filteredPrograms = programs.filter((program) => {
    const matchesCategory = program.category === categoryId;
    const programName = typeof program.name === 'string' ? program.name : program.name[language];
    const matchesSearch = programName.toLowerCase().includes(searchQuery.toLowerCase());
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
          <div className="flex items-center justify-between gap-3">
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
                  <h1 className="text-lg font-bold">{categoryName}</h1>
                  <p className="text-xs text-muted-foreground">
                    {filteredPrograms.length} {t.programs[language]}
                  </p>
                </div>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Search with Modern Design */}
      <div className="border-b bg-gradient-to-br from-muted/50 to-background p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
          <Input
            placeholder={language === "en" ? "Search programs..." : "プログラムを検索..."}
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
            <h2 className="text-2xl font-bold">{language === "en" ? "Available Programs" : "利用可能なプログラム"}</h2>
            <p className="text-sm text-muted-foreground mt-1">{language === "en" ? "Tap to view details & start earning 🎉" : "詳細を表示してポイントを獲得しましょう 🎉"}</p>
          </div>
          <Badge variant="secondary" className="rounded-full px-4 py-2">
            {filteredPrograms.length} {t.programs[language]}
          </Badge>
        </div>

        {filteredPrograms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-muted-foreground">{language === "en" ? "No programs found" : "プログラムが見つかりません"}</p>
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
                    {typeof program.name === 'string' ? program.name : program.name[language]}
                  </h3>
                  <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {typeof program.points === 'string' ? program.points : program.points[language]}
                  </div>

                  <div className="flex items-center justify-between text-sm pt-4 border-t">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">{program.distance}</span>
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {program.outlets} {language === "en" ? "outlets" : "店舗"}
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
