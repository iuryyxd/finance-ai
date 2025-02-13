import { deleteTransaction } from "@/actions/delete-transaction";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TrashIcon } from "lucide-react";

interface DeleteTransactionButtonProps {
  transactionId: string;
}

const DeleteTransactionButton = ({
  transactionId,
}: DeleteTransactionButtonProps) => {
  const { toast } = useToast();

  const handleOnDeleteTransaction = () => {
    try {
      deleteTransaction(transactionId);

      toast({
        title: "Transação deletada com sucesso!",
        variant: "success",
      });
    } catch {
      toast({
        title: "Não foi possível deletar essa transação!",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-muted-foreground"
      onClick={handleOnDeleteTransaction}
    >
      <TrashIcon />
    </Button>
  );
};

export default DeleteTransactionButton;
