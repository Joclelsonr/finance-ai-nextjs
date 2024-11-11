"use client";

import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransactions?: boolean;
}

const AddTransactionButton = ({
  userCanAddTransactions,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsIoen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full font-bold"
              onClick={() => setDialogIsIoen(true)}
              disabled={!userCanAddTransactions}
            >
              Adicionar Transação
              <ArrowDownUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {userCanAddTransactions &&
              "Você atingiu o limite de transações, atualize seu plano para adicionar mais transações"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsIoen}
      />
    </>
  );
};

export default AddTransactionButton;
