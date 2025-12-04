import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Scatter, ScatterChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, ZAxis } from "recharts";

const data = [
    { x: 80, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 320, z: 280 },
    { x: 150, y: 378, z: 500 },
    { x: 110, y: 229, z: 200 },
    { x: 50, y: 406, z: 450 },
    { x: 30, y: 180, z: 300 },
];

const chartConfig = {
    value: {
        label: "Dados",
        color: "hsl(var(--japinha-red))",
    },
};

const ScatterChartComponent = () => {
    return (
        <Card className="w-fit border-border shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader>
                <CardTitle className="text-foreground">Análise de Dispersão</CardTitle>
                <CardDescription className="text-muted-foreground">Correlação entre variáveis</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-[150dvh] h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis
                                type="number"
                                dataKey="x"
                                name="Variável X"
                                stroke="hsl(var(--muted-foreground))"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                type="number"
                                dataKey="y"
                                name="Variável Y"
                                stroke="hsl(var(--muted-foreground))"
                                style={{ fontSize: '12px' }}
                            />
                            <ZAxis type="number" dataKey="z" range={[60, 400]} name="Tamanho" />
                            <ChartTooltip content={<ChartTooltipContent />} cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter
                                name="Dados"
                                data={data}
                                fill="hsl(var(--japinha-red))"
                                fillOpacity={0.6}
                            />
                        </ScatterChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default ScatterChartComponent;
