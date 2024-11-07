import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { db } from "../lib/prisma";
import { DataTable } from "../components/ui/data-table";
import { TransactionColumns } from "./_columns";

const TransactionsPage = async () => {
  const transactions = await db.transaction.findMany({});

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transaçôes</h1>
        <Button className="font-bold">
          Adicionar Transação
          <ArrowDownUpIcon />
        </Button>
      </div>
      <DataTable columns={TransactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;
