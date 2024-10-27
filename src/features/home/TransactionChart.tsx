import { TrendingDown, TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Transaction } from "@/interfaces"
import { useMemo } from "react"
import { useQuery } from "react-query"
import { axiosInstance } from "@/domain/api.config"
import { panPalFresEndpoints } from "@/domain/endpoints"
import { Skeleton } from "@/components"

export const description = "A line chart with a label"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];



const chartConfig = {
  ingreso: {
    label: "Ingresos",
    color: "hsl(var(--chart-1))",
  },
  egreso: {
    label: "Egresos",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


export function TransactionChart() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['allTransaction'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Transaction[]>(panPalFresEndpoints.TRANSACTIONS);

      return data
    }
  })

  const chartDataTransactions = useMemo(() => {

    // Crear objeto para almacenar datos por mes
    const monthlyTotals: Record<string, { egreso: number; ingreso: number }> = {};

    // Inicializar todos los meses hasta el actual con valores en 0
    const currentDate = new Date();
    // const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Inicializar todos los meses hasta el siguiente mes
    for (let i = 0; i <= currentMonth + 1; i++) {
      monthlyTotals[months[i]] = { egreso: 0, ingreso: 0 };
    }

    // Procesar transacciones
    (transactions || []).forEach(transaction => {
      const date = new Date(transaction.createdAt);
      const month = months[date.getMonth()];

      const amount = transaction.transactionDetail.reduce((sum, detail) =>
        sum + (detail.quantity * detail.product.price), 0);

      if (transaction.type === 'egreso') {
        monthlyTotals[month].egreso += amount;
      } else {
        monthlyTotals[month].ingreso += amount;
      }
    });

    // Convertir a array y calcular balance
    return Object.entries(monthlyTotals).map(([month, data]) => ({
      month,
      egreso: data.egreso,
      ingreso: data.ingreso,
      // balance: data.ingreso - data.egreso
      balance: data.egreso - data.ingreso
    }));

  }, [transactions]);

  const calculateTotalData = useMemo(() => {
    const totals = (chartDataTransactions || []).reduce(
      (acc, transaction) => {
        acc.totalIngresos += transaction.ingreso;
        acc.totalEgresos += transaction.egreso;
        acc.balanceTotal += transaction.balance;
        return acc;
      },
      { totalIngresos: 0, totalEgresos: 0, balanceTotal: 0 }
    );
  
    return totals;
  }, [chartDataTransactions])


  if (!transactions && isLoading) return <Skeleton className="size-4 rounded-md" />

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen de transaciones</CardTitle>
        <CardDescription>Todas las transaciones</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartDataTransactions}
            margin={{
              top: 20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis 
            type="number"
              domain={[(dataMin: number) => (0 - Math.abs(dataMin)), (dataMax: number) => (dataMax * 1.5)]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="egreso"
              type="monotone"
              stroke="var(--color-ingreso)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-ingreso)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
            <Line
              dataKey="ingreso"
              type="monotone"
              stroke="var(--color-egreso)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-egreso)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Balance total: {calculateTotalData.balanceTotal} <span>{calculateTotalData.balanceTotal > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" /> }</span>
        </div>
        <div className="leading-none text-muted-foreground flex flex-col gap-y-1">
          <p>Total de ingresos: {calculateTotalData.totalIngresos} </p>
          <p>Total de egresos: {calculateTotalData.totalEgresos}</p>
        </div>
      </CardFooter>
    </Card>
  )
}
