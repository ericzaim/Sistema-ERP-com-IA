import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
    { name: "Camisas", value: 400 },
    { name: "Calças", value: 300 },
    { name: "Blusas", value: 200 },
    { name: "Shorts", value: 278 },
    { name: "Pijamas", value: 189 },
];

const COLORS = [
    "hsl(var(--japinha-red))",
    "hsl(var(--primary))",
    "hsl(var(--muted-foreground))",
    "hsl(355 85% 65%)",
    "hsl(0 0% 40%)",
];

const chartConfig = {
    value: {
        label: "Distribuição",
    },
};

const PieChartComponent = () => {
    return (
        <Card className="border-border shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader>
                <CardTitle className="text-foreground">Distribuição por Categoria</CardTitle>
                <CardDescription className="text-muted-foreground">Percentual de vendas</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={(entry) => entry.name}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default PieChartComponent;
