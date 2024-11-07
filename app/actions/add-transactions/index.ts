"use server";

import { db } from "@/app/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { addTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const addTransaction = async (
  params: Omit<Prisma.TransactionCreateInput, "userId">,
) => {
  addTransactionSchema.parse(params);
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  await db.transaction.create({
    data: { ...params, userId },
  });
  revalidatePath("/transactions");
};
