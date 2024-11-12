import { db } from "@/app/lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentageType } from "./types";
import { auth } from "@clerk/nextjs/server";

const getDashboard = async (month: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const where = {
    userId,
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

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: { ...where, type: TransactionType.EXPENSE },
      _sum: { amount: true },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expenseTotal)) * 100,
    ),
  }));

  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 10,
  });

  return {
    balance,
    depositsTotal,
    investimentsTotal,
    expenseTotal,
    typePercentage,
    totalExpensePerCategory,
    lastTransactions: JSON.parse(JSON.stringify(lastTransactions)),
  };
};

export default getDashboard;
