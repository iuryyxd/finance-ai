import { db } from "@/lib/prisma";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";
import { TransactionType } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

export const getDashboard = async (month: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const currentYear = new Date().getFullYear();
  const monthIndex = Number(month) - 1;

  const where = {
    userId,
    date: {
      gte: new Date(currentYear, monthIndex, 1),
      lt: new Date(currentYear, monthIndex + 1, 1),
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )._sum.amount,
  );
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )._sum.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )._sum.amount,
  );
  const balance = depositsTotal - investmentsTotal - expensesTotal;

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const calculatePercentage = (value: number, total: number): number =>
    total === 0 ? 0 : Math.round((value / total) * 100);

  const transactionsTotalNumber = Number(transactionsTotal);

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: calculatePercentage(
      Number(depositsTotal),
      transactionsTotalNumber,
    ),
    [TransactionType.EXPENSE]: calculatePercentage(
      Number(expensesTotal),
      transactionsTotalNumber,
    ),
    [TransactionType.INVESTMENT]: calculatePercentage(
      Number(investmentsTotal),
      transactionsTotalNumber,
    ),
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => {
    const percentageOfTotal = Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    );

    return {
      category: category.category,
      totalAmount: Number(category._sum.amount),
      percentageOfTotal: isNaN(percentageOfTotal) ? 0 : percentageOfTotal,
    };
  });

  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 15,
  });

  return {
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    balance,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
  };
};
