"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import generateAiReport from "../_actions/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";

interface AiReportButtonProps {
  hasPremiumPlan: boolean;
  month: string;
}

const AiReportButton = ({ hasPremiumPlan, month }: AiReportButtonProps) => {
  const [report, serReport] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateReport = async () => {
    try {
      setIsLoading(true);
      const aiReport = await generateAiReport({ month });
      serReport(aiReport);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          serReport(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost">
          Relatório IA
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        {hasPremiumPlan ? (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Use inteligência artificial para gerar um relatório com insights
                sobre suas finanças.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose max-h-[450px] prose-h3:text-white prose-h4:text-white prose-strong:text-white">
              <Markdown>{report}</Markdown>
            </ScrollArea>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button onClick={handleGenerateReport} disabled={isLoading}>
                {isLoading && <Loader2Icon className="animate-spin" />}
                Gerar Relatório
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Você precisa de um plano premium para gerar relatórios com IA
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button asChild>
                <Link href="/subscription">Assinar plano</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;
