import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  Wallet2Icon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  month: string;
  balance: number;
  depositsTotal: number;
  investimentsTotal: number;
  expenseTotal: number;
  userCanAddTransactions?: boolean;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  investimentsTotal,
  expenseTotal,
  userCanAddTransactions,
}: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<Wallet2Icon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
        userCanAddTransactions={userCanAddTransactions}
      />
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investimentsTotal}
          size="small"
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
          size="small"
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={expenseTotal}
          size="small"
        />
      </div>
    </div>
  );
};

export default SummaryCards;
