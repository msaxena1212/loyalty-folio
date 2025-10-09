import { Switch } from "@/components/ui/switch";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { isJapanese, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50 ${className}`}>
      <Languages className="h-4 w-4 text-muted-foreground" />
      <span className="text-xs font-medium text-muted-foreground">EN</span>
      <Switch 
        checked={isJapanese} 
        onCheckedChange={(checked) => setLanguage(checked ? "jp" : "en")}
        className="scale-75"
      />
      <span className="text-xs font-medium text-muted-foreground">JP</span>
    </div>
  );
}
