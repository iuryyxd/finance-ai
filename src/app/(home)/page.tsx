import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "@/data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";

interface HomeProps {
  searchParams: Promise<{ month: string }>;
}

const Home = async ({ searchParams }: HomeProps) => {
  const { month } = await searchParams;
  const { userId } = await auth();

  if (!userId) redirect("/login");

  const isMonthValid = month && isMatch(month, "MM");
  if (!isMonthValid) {
    redirect(`?month=${String(new Date().getMonth() + 1).padStart(2, "0")}`);
  }

  const dashboard = await getDashboard(month);

  return (
    <div className="flex flex-col space-y-6 p-6 2xl:overflow-hidden">
      <div className="flex flex-col justify-between gap-5 2xl:flex-row 2xl:gap-0">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>
      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[2fr,1fr] 2xl:overflow-hidden">
        <div className="flex w-full flex-col gap-6 overflow-auto 2xl:overflow-hidden">
          <SummaryCards {...dashboard} />
          <div className="grid grid-cols-1 gap-y-6 overflow-auto lg:grid-cols-3 lg:gap-6 lg:overflow-hidden">
            <TransactionsPieChart {...dashboard} />
            <ExpensesPerCategory
              expensesPerCategory={dashboard.totalExpensePerCategory}
            />
          </div>
        </div>
        <LastTransactions lastTransactions={dashboard.lastTransactions} />
      </div>
    </div>
  );
};

export default Home;
