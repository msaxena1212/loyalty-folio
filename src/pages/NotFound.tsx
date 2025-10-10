import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations.notFound;
  const lang = language;

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary">{t.title[lang]}</h1>
        <p className="mb-8 text-xl text-muted-foreground">{t.message[lang]}</p>
        <Button asChild variant="premium">
          <a href="/">{t.returnHome[lang]}</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
