import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart as RechartsLineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
    { month: "Jan", value: 4000 },
    { month: "Fev", value: 5000 },
    { month: "Mar", value: 5000 },
    { month: "Abr", value: 6300 },
    { month: "Mai", value: 7000 },
    { month: "Jun", value: 8500 },
    { month: "Jul", value: 8000 },
];

const chartConfig = {
    value: {
        label: "Vendas",
        color: "hsl(var(--japinha-red))",
    },
};

const LineChart = () => {
    return (
        <Card className="border-border shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader>
                <CardTitle className="text-foreground">Evolução de Vendas</CardTitle>
                <CardDescription className="text-muted-foreground">Últimos 7 meses</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={data}>
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
                                dataKey="value"
                                stroke="hsl(var(--japinha-red))"
                                strokeWidth={2}
                                dot={{ fill: "hsl(var(--japinha-red))", r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </RechartsLineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default LineChart;
