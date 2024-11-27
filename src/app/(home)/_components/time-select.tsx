"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTH_OPTIONS } from "@/constants/dashboard";
import { useRouter, useSearchParams } from "next/navigation";

const TimeSelect = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const month = searchParams.get("month");

  const handleMonthChange = (month: string) => {
    push(`/?month=${month}`);
  };

  return (
    <Select
      onValueChange={(value) => handleMonthChange(value)}
      defaultValue={month ?? `${new Date().getMonth() + 1}`}
    >
      <SelectTrigger className="w-[150px] rounded-full">
        <SelectValue placeholder="Mês" />
      </SelectTrigger>
      <SelectContent>
        {MONTH_OPTIONS.map((option) => {
          return (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TimeSelect;
