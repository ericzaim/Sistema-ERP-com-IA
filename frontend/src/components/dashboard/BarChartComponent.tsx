import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
    { category: "Camisas", value: 4000 },
    { category: "Calças", value: 3000 },
    { category: "Blusas", value: 2000 },
    { category: "Shorts", value: 2780 },
    { category: "Pijamas", value: 1890 },
];

const chartConfig = {
    value: {
        label: "Vendas",
        color: "hsl(var(--japinha-red))",
    },
};

const BarChartComponent = () => {
    return (
        <Card className="border-border shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader>
                <CardTitle className="text-foreground">Vendas por Categoria</CardTitle>
                <CardDescription className="text-muted-foreground">Top 6 categorias</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis
                                type="number"
                                stroke="hsl(var(--muted-foreground))"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                type="category"
                                dataKey="category"
                                stroke="hsl(var(--muted-foreground))"
                                style={{ fontSize: '12px' }}
                                width={80}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                                dataKey="value"
                                fill="hsl(var(--japinha-red))"
                                radius={[0, 4, 4, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default BarChartComponent;
