import { Badge } from "@/components/ui/badge";
import { Transaction } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === "DEPOSIT") {
    return (
      <Badge className="bg-muted font-bold text-primary">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Ganho
      </Badge>
    );
  } else if (transaction.type === "EXPENSE") {
    return (
      <Badge className="bg-danger bg-opacity-10 font-bold text-danger">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Gasto
      </Badge>
    );
  } else if (transaction.type === "INVESTMENT") {
    return (
      <Badge className="bg-muted font-bold text-white">
        <CircleIcon className="mr-2 fill-white" size={10} />
        Investimento
      </Badge>
    );
  }
};

export default TransactionTypeBadge;
