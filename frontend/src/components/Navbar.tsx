import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import logo from "@/assets/japinha-logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: "Dashboards", href: "/dashboard" },
        { name: "Cadastro", href: "/cadastro" },
        { name: "Entrada", href: "/entrada" },
        { name: "Saida", href: "/saida" },
    ];

    const caminho = window.location.pathname;

    return (
        <>
            {/* Navbar lateral */}
            <motion.nav
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: isMenuOpen ? 0 : -200, opacity: isMenuOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className={`fixed top-0 left-0 h-screen w-64 bg-card/80 backdrop-blur-lg border-r border-border z-40 flex flex-col justify-between p-4 ${
                    !isMenuOpen ? "pointer-events-none" : ""
                }`}
            >
                {/* Top Section - Logo e Navigation */}
                <div>
                    {/* Logo */}
                    <a href="/" className="block mb-6 mt-16">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-2"
                        >
                            <img src={logo} alt="Japinha" className="h-10 w-10" />
                            <span className="text-2xl font-bold text-foreground font-japanese">
                                Japinha
                            </span>
                        </motion.div>
                    </a>

                    {/* Navigation Links */}
                    <nav className="space-y-4">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="block text-lg text-foreground hover:text-japinha-red relative group transition-smooth"
                            >
                                {item.name}
                                {caminho === item.href ? (
                                <motion.div
                                    className="absolute left-0 bottom-0 w-full h-0.5 bg-japinha-red"
                                />
                            ):<motion.div
                                    className="absolute left-0 bottom-0 w-0 h-0.5 bg-japinha-red group-hover:w-full"
                                />}
                            </motion.a>
                        ))}
                    </nav>
                </div>
            </motion.nav>

            {/* Botão de Menu - único que se move */}
            <motion.div
                animate={{
                    x: isMenuOpen ? 195 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="fixed top-4 left-2 z-50"
            >
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="transition-transform"
                >
                    <Menu className="text-foreground" />
                </Button>
            </motion.div>
        </>
    );
};

export default Navbar;