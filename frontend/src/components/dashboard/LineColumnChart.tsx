import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, Bar, ComposedChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
    { month: "Jan", vendas: 4000, custos: 2400 },
    { month: "Fev", vendas: 3000, custos: 1398 },
    { month: "Mar", vendas: 5000, custos: 3800 },
    { month: "Abr", vendas: 4500, custos: 3908 },
    { month: "Mai", vendas: 6000, custos: 4800 },
    { month: "Jun", vendas: 5500, custos: 3800 },
];

const chartConfig = {
    vendas: {
        label: "Vendas",
        color: "hsl(var(--japinha-red))",
    },
    custos: {
        label: "Custos",
        color: "hsl(var(--primary))",
    },
};

const LineColumnChart = () => {
    return (
        <Card className="border-border shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader>
                <CardTitle className="text-foreground">Vendas vs Custos</CardTitle>
                <CardDescription className="text-muted-foreground">Comparativo mensal</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data}>
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
                            <Bar dataKey="custos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            <Line
                                type="monotone"
                                dataKey="vendas"
                                stroke="hsl(var(--japinha-red))"
                                strokeWidth={2}
                                dot={{ fill: "hsl(var(--japinha-red))", r: 4 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default LineColumnChart;
