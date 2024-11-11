import AddTransactionButton from "@/app/components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProp {
  icon: ReactNode;
  title: string;
  amount: number;
  userCanAddTransactions?: boolean;
  size?: "small" | "large";
}

const SummaryCard = ({
  icon,
  title,
  amount,
  userCanAddTransactions,
  size = "small",
}: SummaryCardProp) => {
  return (
    <Card className={`${size === "large" ? "bg-white bg-opacity-5" : ""}`}>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground" : "text-wrap opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && (
          <AddTransactionButton
            userCanAddTransactions={userCanAddTransactions}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
