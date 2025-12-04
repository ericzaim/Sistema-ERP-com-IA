import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Cadastro from "./pages/Cadastro";

const queryClient = new QueryClient();

import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar.tsx";
import Entrada from "@/pages/Entrada.tsx";
import Saida from "@/pages/Saida";
import {AuthProvider} from "@/context/AuthContext.tsx";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();

    const hideNavbarOnPaths = ["/"]; // você pode adicionar outras rotas aqui
    const shouldShowNavbar = !hideNavbarOnPaths.includes(location.pathname);

    return (
        <div className="ml-16">
            {shouldShowNavbar && <Navbar />}
            {children}
        </div>
    );
};

const App = () => (
    <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <LayoutWrapper>
                        <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/cadastro" element={<Cadastro />} />
                            <Route path="/entrada" element={<Entrada/>}/>
                            <Route path="/saida" element={<Saida/>}/>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </LayoutWrapper>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    </AuthProvider>
);

export default App;
