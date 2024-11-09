import { db } from "../lib/prisma";
import { DataTable } from "../components/ui/data-table";
import { TransactionColumns } from "./_columns";
import AddTransactionButton from "../components/add-transaction-button";
import Navbar from "../components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../components/ui/scroll-area";

const TransactionsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <Navbar />
      <div className="space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transaçôes</h1>
          <AddTransactionButton />
        </div>
        <ScrollArea>
          <DataTable columns={TransactionColumns} data={transactions} />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
