import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight, Languages } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import heroFood from "@/assets/hero-food.jpg";
import heroLifestyle from "@/assets/hero-lifestyle.jpg";
import heroEssentials from "@/assets/hero-essentials.jpg";
import heroWellness from "@/assets/hero-wellness.jpg";
import zynoLogo from "@/assets/zyno-logo.png";

const slides = [
  {
    image: heroFood,
    key: "food" as const,
  },
  {
    image: heroLifestyle,
    key: "lifestyle" as const,
  },
  {
    image: heroWellness,
    key: "wellness" as const,
  },
  {
    image: heroEssentials,
    key: "essentials" as const,
  },
];

export const PreLoginCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { language, setLanguage, isJapanese } = useLanguage();

  const t = translations.preLogin;
  const currentSlideData = slides[currentSlide];
  const slideTranslations = t.slides[currentSlideData.key];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Slide Images */}
        {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={t.slides[slide.key].category[language]}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero" />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={zynoLogo} alt="Zyno Logo" className="h-12 w-12 rounded-xl" />
              <div>
                <h1 className="text-2xl font-bold text-white">Zyno <span className="text-secondary">Loyalty</span></h1>
                <p className="text-sm text-white/80">{t.company[language]}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm">
              <Languages className="h-4 w-4 text-white/90" />
              <span className="text-xs font-medium text-white/90">EN</span>
              <Switch 
                checked={isJapanese} 
                onCheckedChange={(checked) => setLanguage(checked ? "jp" : "en")}
                className="scale-75"
              />
              <span className="text-xs font-medium text-white/90">JP</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-end pb-20 text-center">
          <div className="max-w-2xl space-y-6 px-6">
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-wider text-white/90">
                {slideTranslations.category[language]}
              </p>
              <h2 className="text-5xl font-bold text-white">
                {slideTranslations.title[language]}
              </h2>
              <p className="text-xl text-white/90">
                {slideTranslations.subtitle[language]}
              </p>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 py-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "w-8 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto"
              >
                {t.buttons.login[language]}
              </Button>
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto"
              >
                {t.buttons.register[language]}
              </Button>
            </div>
          </div>
        </div>

        {/* Arrow Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all hover:bg-white/30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all hover:bg-white/30"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Footer */}
        <footer className="p-6 text-center">
          <p className="text-sm text-white/70">
            {t.footer.poweredBy[language]}
          </p>
        </footer>
      </div>
    </div>
  );
};
