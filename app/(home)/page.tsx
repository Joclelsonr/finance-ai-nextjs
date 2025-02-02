import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isMatch } from "date-fns";
import Navbar from "../components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import TransactionPieChart from "./_components/transaction-pie-chart";
import getDashboard from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import canUserAddTransaction from "../_data/can-user-add-transactions";
import AiReportButton from "./_components/ai-report-button";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const monthIsValid = !month || !isMatch(month, "MM");
  const currentMonth = new Date().getMonth();
  if (monthIsValid) {
    redirect(
      `?month=${currentMonth < 10 ? `0${currentMonth + 1}` : currentMonth + 1}`,
    );
  }

  const dataDashboard = await getDashboard(month);
  const userCanAddTransactions = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId as string);
  const userPlan = user.publicMetadata.subscriptionPlan;

  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <AiReportButton
              month={month}
              hasPremiumPlan={userPlan === "premium"}
            />
            <TimeSelect />
          </div>
        </div>
        <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              month={month}
              {...dataDashboard}
              userCanAddTransactions={userCanAddTransactions}
            />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionPieChart {...dataDashboard} />
              <ExpensesPerCategory
                totalExpensePerCategory={dataDashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dataDashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
