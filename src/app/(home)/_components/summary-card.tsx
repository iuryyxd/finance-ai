import AddTransactionButton from "@/components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
}: SummaryCardProps) => {
  return (
    <Card className={`${size === "large" ? "bg-white bg-opacity-5" : ""}`}>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p
          className={
            size === "small" ? "text-muted-foreground" : "text-white opacity-70"
          }
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-10 md:flex-row md:gap-0">
        <p
          className={`font-bold ${size === "small" ? "xs:text-2xl" : "xs:text-4xl"} text-2xl`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" ? <AddTransactionButton /> : null}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
