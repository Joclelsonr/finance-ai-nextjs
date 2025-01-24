"use server";

import { db } from "@/app/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";
import OpenAi from "openai";

const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month });

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  if (!hasPremiumPlan) {
    throw new Error("User need a premium plan to generate a report");
  }

  const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const currentDate = new Date();
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`${currentDate.getFullYear()}-${month}-01`),
        lte: new Date(`${currentDate.getFullYear()}-${month}-31`),
      },
    },
  });
  const messages = `Gere um relatório com insights sobre as minha finanças, com dicas e orientações de como melhorar minha vida financeira.
    As transações estão divididas por ponto e virgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
    ${transactions.map((transaction) => `${transaction.date.toLocaleDateString("pt-BR")}-${transaction.type}-${transaction.amount}-${transaction.category}`).join(";")}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor suas finanças.",
      },
      {
        role: "user",
        content: messages,
      },
    ],
  });

  return completion.choices[0].message.content;
};

export default generateAiReport;
