import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis } from "lucide-react";
import { ReactNode } from "react";

interface ColumnActionsProps {
  children: ReactNode;
}

const ColumnActions = ({ children }: ColumnActionsProps) => {
  return (
    <>
      <div className="hidden space-x-1 lg:block">{children}</div>
      <Popover>
        <PopoverTrigger className="block lg:hidden">
          <Ellipsis size={24} className="text-white" />
        </PopoverTrigger>
        <PopoverContent className="flex w-12 flex-col items-center py-2">
          {children}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ColumnActions;
