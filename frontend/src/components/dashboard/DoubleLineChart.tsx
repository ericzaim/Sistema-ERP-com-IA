import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
    { month: "Jan", Camisas: 5000, Blusas: 2400 },
    { month: "Fev", Camisas: 4400, Blusas: 1398 },
    { month: "Mar", Camisas: 3600, Blusas: 1800 },
    { month: "Abr", Camisas: 4200, Blusas: 1008 },
    { month: "Mai", Camisas: 3400, Blusas: 3800 },
    { month: "Jun", Camisas: 2200, Blusas: 4800 },
];

const chartConfig = {
    Camisas: {
        label: "Camisas",
        color: "hsl(var(--japinha-red))",
    },
    Blusas: {
        label: "Blusas",
        color: "hsl(var(--primary))",
    },
};

const DoubleLineChart = () => {
    return (
        <Card className="border-border shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader>
                <CardTitle className="text-foreground">Comparativo de Produtos</CardTitle>
                <CardDescription className="text-muted-foreground">Tendências de vendas</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis
                                dataKey="month"
                                stroke="hsl(var(--muted-foreground))"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                stroke="hsl(var(--muted-foreground))"
                                style={{ fontSize: '12px' }}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                                type="monotone"
                                dataKey="Camisas"
                                stroke="hsl(var(--japinha-red))"
                                strokeWidth={2}
                                dot={{ fill: "hsl(var(--japinha-red))", r: 4 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Blusas"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                dot={{ fill: "hsl(var(--primary))", r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default DoubleLineChart;
