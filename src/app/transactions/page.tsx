import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/prisma";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "@/components/add-transaction-button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

const TransactionsPage = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/login");

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="space-y-6 overflow-hidden p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <ScrollArea>
        <DataTable columns={transactionColumns} data={transactions} />
      </ScrollArea>
    </div>
  );
};

export default TransactionsPage;
