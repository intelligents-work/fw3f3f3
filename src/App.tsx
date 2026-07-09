import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/platform/AppLayout";
import Dashboard from "./pages/platform/Dashboard";
import Prediction from "./pages/platform/Prediction";
import PromotionEngine from "./pages/platform/PromotionEngine";
import Segments from "./pages/platform/Segments";
import Stores from "./pages/platform/Stores";
import DecisionAnalysis from "./pages/platform/DecisionAnalysis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/promotions" element={<PromotionEngine />} />
            <Route path="/segments" element={<Segments />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/decisions" element={<DecisionAnalysis />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
