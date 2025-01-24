"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { BotIcon, Loader2Icon } from "lucide-react";
import { ScrollArea } from "@/app/components/ui/scroll-area";
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
import Markdown from "react-markdown";
import generatePDF, { Margin } from "react-to-pdf";
import { IPdfOptions } from "@/app/types";
import generateAiReport from "../_actions/generate-ai-report";

interface AiReportButtonProps {
  hasPremiumPlan: boolean;
  month: string;
}

const AiReportButton = ({ hasPremiumPlan, month }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  const options: IPdfOptions = {
    method: "open",
    filename: "report.pdf",
    page: {
      margin: Margin.MEDIUM,
      format: "A4",
      orientation: "portrait",
    },
  };

  const handleGenerateReport = async () => {
    try {
      setIsLoading(true);
      const aiReport = await generateAiReport({ month });
      setReport(aiReport);
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
          setReport(null);
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
              <div ref={targetRef}>
                <Markdown>{report}</Markdown>
              </div>
            </ScrollArea>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              {report ? (
                <Button
                  onClick={() => generatePDF(() => targetRef.current, options)}
                >
                  Baixar Relatório
                </Button>
              ) : (
                <Button onClick={handleGenerateReport} disabled={isLoading}>
                  {isLoading && <Loader2Icon className="animate-spin" />}
                  Gerar Relatório
                </Button>
              )}
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
