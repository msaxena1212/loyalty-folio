import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SetPin from "./pages/SetPin";
import Home from "./pages/Home";
import CategoryPrograms from "./pages/CategoryPrograms";
import Wallet from "./pages/Wallet";
import Offers from "./pages/Offers";
import Rewards from "./pages/Rewards";
import Menu from "./pages/Menu";
import ProgramDetails from "./pages/ProgramDetails";
import RedeemPoints from "./pages/RedeemPoints";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/set-pin" element={<SetPin />} />
            <Route path="/home" element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryPrograms />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/program/:id" element={<ProgramDetails />} />
            <Route path="/redeem/:id" element={<RedeemPoints />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
