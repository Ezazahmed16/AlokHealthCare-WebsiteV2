import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Doctors from "./pages/Doctors";
import DoctorDetail from "./pages/DoctorDetail";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminDoctors from "./pages/admin/AdminDoctors";
import AdminSpecializations from "./pages/admin/AdminSpecializations";
import AdminSchedules from "./pages/admin/AdminSchedules";
import AdminTests from "./pages/admin/AdminTests";
import NotFound from "./pages/NotFound";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import OurStory from "./pages/OurStory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ourstorys" element={<OurStory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminOverview />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="specializations" element={<AdminSpecializations />} />
            <Route path="schedules" element={<AdminSchedules />} />
            <Route path="tests" element={<AdminTests />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
