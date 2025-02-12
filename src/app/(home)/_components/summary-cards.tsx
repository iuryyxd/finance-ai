import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  balance: number;
  investmentsTotal: number;
  depositsTotal: number;
  expensesTotal: number;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  expensesTotal,
  investmentsTotal,
}: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        amount={balance}
        title="Saldo"
        size="large"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          amount={investmentsTotal}
          title="Investimento"
        />

        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          amount={depositsTotal}
          title="Receita"
        />

        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          amount={expensesTotal}
          title="Despesas"
        />
      </div>
    </div>
  );
};

export default SummaryCards;
