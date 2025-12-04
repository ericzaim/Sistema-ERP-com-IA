import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KPICardProps {
    title: string;
    value: string;
    change: number;
    icon: LucideIcon;
}

const KPICard = ({ title, value, change, icon: Icon }: KPICardProps) => {
    const isPositive = change >= 0;

    return (
        <Card className="overflow-hidden border-border hover:border-japinha-red/20 transition-all duration-300 shadow-card hover:shadow-elegant group">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-muted group-hover:bg-japinha-red/10 transition-all duration-300">
                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-japinha-red transition-colors duration-300" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            isPositive
                                ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        }`}
                    >
                        {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {Math.abs(change)}%
                    </motion.div>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground mb-1">{title}</p>
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold text-foreground"
                    >
                        {value}
                    </motion.h3>
                </div>
            </CardContent>
        </Card>
    );
};

export default KPICard;
