import { formatCurrency } from "@/app/_utils/currency";
import { Button } from "@/app/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { TRANSACTION_PAYMENT_ICONS } from "@/app/constants/transactions";
import { Transaction, TransactionType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  console.log(lastTransactions);

  const getPricecolor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return "text-red-500";
    }
    if (transaction.type === TransactionType.DEPOSIT) {
      return "text-primary";
    }
    return "text-white";
  };

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
        <Button variant="outline">
          <Link href={"/transactions"}>Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white p-2 opacity-[3%]">
                <Image
                  src={TRANSACTION_PAYMENT_ICONS[transaction.paymentMethod]}
                  width={20}
                  height={20}
                  alt="icone"
                />
              </div>
              <div className="">
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-sm font-bold text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getPricecolor(transaction)}`}>
              {transaction.type === TransactionType.EXPENSE ? "-" : "+"}
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
