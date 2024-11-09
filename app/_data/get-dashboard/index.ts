import { db } from "@/app/lib/prisma";
import { TransactionType } from "@prisma/client";
import { TransactionPercentageType } from "./types";

const getDashboard = async (month: string) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );
  const investimentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );
  const expenseTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );

  const balance = depositsTotal - investimentsTotal - Number(expenseTotal);

  const typePercentage: TransactionPercentageType = {
    [TransactionType.DEPOSIT]: Math.round(
      (depositsTotal / (depositsTotal + investimentsTotal + expenseTotal)) *
        100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (investimentsTotal / (depositsTotal + investimentsTotal + expenseTotal)) *
        100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (expenseTotal / (depositsTotal + investimentsTotal + expenseTotal)) * 100,
    ),
  };

  return {
    balance,
    depositsTotal,
    investimentsTotal,
    expenseTotal,
    typePercentage,
  };
};

export default getDashboard;
