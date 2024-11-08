"use server";

import { db } from "@/app/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { addTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const UpsertTransaction = async (
  params: Omit<Prisma.TransactionCreateInput, "userId">,
) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  addTransactionSchema.parse(params);
  await db.transaction.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params?.id ?? "",
    },
  });
  revalidatePath("/transactions");
};
