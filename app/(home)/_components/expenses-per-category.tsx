import React from "react";
import { Progress } from "@/app/components/ui/progress";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types";
import { CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { TRANSACTION_CATEGORY_LABELS } from "@/app/constants/transactions";

interface ExpensesPerCategoryProps {
  totalExpensePerCategory: TotalExpensePerCategory[];
}

const ExpensesPerCategory = ({
  totalExpensePerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border pb-6">
      <CardHeader>
        <CardTitle className="self-center font-bold">
          Despesas por categoria
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {totalExpensePerCategory.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            Nenhuma despesa encontrada
          </p>
        )}
        {totalExpensePerCategory.map((item) => (
          <div key={item.category} className="space-y-2">
            <div className="flex w-full justify-between">
              <p className="text-sm font-bold">
                {TRANSACTION_CATEGORY_LABELS[item.category]}
              </p>
              <p className="text-sm font-bold">{item.percentageOfTotal}%</p>
            </div>
            <Progress value={item.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;
