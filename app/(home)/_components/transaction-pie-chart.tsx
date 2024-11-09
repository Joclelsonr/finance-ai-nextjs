"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/app/components/ui/card";
import { TransactionType } from "@prisma/client";
import { TransactionPercentageType } from "@/app/_data/get-dashboard/types";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PercentageItem from "./percentage-item";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#ffffff",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55b02e",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesa",
    color: "#e93030",
  },
} satisfies ChartConfig;

interface TransactionPieChartProps {
  typePercentage: TransactionPercentageType;
  depositsTotal: number;
  investimentsTotal: number;
  expenseTotal: number;
}

const TransactionPieChart = ({
  typePercentage,
  depositsTotal,
  investimentsTotal,
  expenseTotal,
}: TransactionPieChartProps) => {
  const chartData = [
    { type: TransactionType.DEPOSIT, amount: depositsTotal, fill: "#55b02e" },
    { type: TransactionType.EXPENSE, amount: expenseTotal, fill: "#e93030" },
    {
      type: TransactionType.INVESTMENT,
      amount: investimentsTotal,
      fill: "#fff",
    },
  ];
  return (
    <Card className="flex flex-col p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-2 pb-4">
          <PercentageItem
            title="Receita"
            percentage={typePercentage.DEPOSIT}
            icon={<TrendingUpIcon size={16} className="text-primary" />}
          />
          <PercentageItem
            title="Despesa"
            percentage={typePercentage.EXPENSE}
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
          />
          <PercentageItem
            title="investido"
            percentage={typePercentage.INVESTMENT}
            icon={<PiggyBankIcon size={16} />}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPieChart;
