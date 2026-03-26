import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Subscribe from "./pages/Subscribe.tsx";
import Confirmation from "./pages/Confirmation.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";
import Pending from "./pages/Pending";
import Payment from "./pages/Payment";
import SelectPlan from "./pages/SelectPlan";
import AdminUsers from "./pages/AdminUsers"; 
import AdminLogin from "./pages/AdminLogin.tsx"; 


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/select-plan" element={<SelectPlan />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
