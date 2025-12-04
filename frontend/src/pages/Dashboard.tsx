import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Filter, TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LineChart from "@/components/dashboard/LineChart";
import LineColumnChart from "@/components/dashboard/LineColumnChart";
import DoubleLineChart from "@/components/dashboard/DoubleLineChart";
import PieChartComponent from "@/components/dashboard/PieChartComponent";
import BarChartComponent from "@/components/dashboard/BarChartComponent";
import AreaChartComponent from "@/components/dashboard/AreaChartComponent";
import ScatterChartComponent from "@/components/dashboard/ScatterChartComponent";
import KPICard from "@/components/dashboard/KPICard";

const Dashboard = () => {
    const [showFilters, setShowFilters] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-orange-50 p-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard ERP</h1>
                        <p className="text-muted-foreground">Sistema de gerenciamento de estoque</p>
                    </div>
                </div>
            </motion.div>

            {/* KPI Cards */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
                <motion.div variants={itemVariants}>
                    <KPICard
                        title="Total de Vendas"
                        value="R$ 127.500"
                        change={12.5}
                        icon={DollarSign}
                    />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <KPICard
                        title="Produtos Vendidos"
                        value="456"
                        change={3.2}
                        icon={ShoppingCart}
                    />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <KPICard
                        title="Taxa de Crescimento"
                        value="18.7%"
                        change={5.1}
                        icon={TrendingUp}
                    />
                </motion.div>
            </motion.div>

            {/* Charts Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                <motion.div variants={itemVariants}>
                    <LineChart />
                </motion.div>

                {/*<motion.div variants={itemVariants}>*/}
                {/*    <LineColumnChart />*/}
                {/*</motion.div>*/}

                <motion.div variants={itemVariants}>
                    <DoubleLineChart />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <PieChartComponent />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <BarChartComponent />
                </motion.div>

                {/*<motion.div variants={itemVariants}>*/}
                {/*    <AreaChartComponent />*/}
                {/*</motion.div>*/}

                <motion.div variants={itemVariants} className="lg:col-span-2 self-center">
                    <ScatterChartComponent />
                </motion.div>
            </motion.div>

            {/*/!* Floating Action Button *!/*/}
            {/*<motion.div*/}
            {/*    className="fixed bottom-8 right-8 z-50"*/}
            {/*    initial={{ scale: 0 }}*/}
            {/*    animate={{ scale: 1 }}*/}
            {/*    transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}*/}
            {/*>*/}
            {/*    <motion.div*/}
            {/*        whileHover={{ scale: 1.1 }}*/}
            {/*        whileTap={{ scale: 0.9 }}*/}
            {/*    >*/}
            {/*        <Button*/}
            {/*            size="icon"*/}
            {/*            className="w-14 h-14 rounded-full bg-japinha-red hover:bg-japinha-red-dark text-japinha-red-foreground shadow-red"*/}
            {/*        >*/}
            {/*            <Plus className="w-6 h-6" />*/}
            {/*        </Button>*/}
            {/*    </motion.div>*/}
            {/*</motion.div>*/}
        </div>
    );
};

export default Dashboard;
