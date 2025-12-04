import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
    { month: "Jan", valor: 4000 },
    { month: "Fev", valor: 3000 },
    { month: "Mar", valor: 5000 },
    { month: "Abr", valor: 4500 },
    { month: "Mai", valor: 6000 },
    { month: "Jun", valor: 5500 },
    { month: "Jul", valor: 7000 },
    { month: "Ago", valor: 6800 },
];

const chartConfig = {
    valor: {
        label: "Receita",
        color: "hsl(var(--japinha-red))",
    },
};

const AreaChartComponent = () => {
    return (
        <Card className="border-border shadow-card hover:shadow-elegant transition-all duration-300">
        <CardHeader>
            <CardTitle className="text-foreground">Receita Acumulada</CardTitle>
    <CardDescription className="text-muted-foreground">Últimos 8 meses</CardDescription>
    </CardHeader>
    <CardContent>
    <ChartContainer config={chartConfig} className="h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data}>
    <defs>
        <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="hsl(var(--japinha-red))" stopOpacity={0.3}/>
    <stop offset="95%" stopColor="hsl(var(--japinha-red))" stopOpacity={0}/>
    </linearGradient>
    </defs>
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
    <Area
    type="monotone"
    dataKey="valor"
    stroke="hsl(var(--japinha-red))"
    strokeWidth={2}
    fillOpacity={1}
    fill="url(#colorValor)"
        />
        </AreaChart>
        </ResponsiveContainer>
        </ChartContainer>
        </CardContent>
        </Card>
);
};

export default AreaChartComponent;
