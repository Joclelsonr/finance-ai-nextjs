import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { deleteTransactionAction } from "../_actions/delete-transaction";
import { toast } from "sonner";

interface DeleteTransactionButtonProps {
  transactionId: string;
}

const DeleteTransactionButton = ({
  transactionId,
}: DeleteTransactionButtonProps) => {
  const handleConfirmDeleteClick = async () => {
    try {
      await deleteTransactionAction({ transactionId });
      toast.success("Transação excluída com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao excluir a transação.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você deseja realmente excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeleteClick}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTransactionButton;
