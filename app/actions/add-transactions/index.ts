"use server";

import { db } from "@/app/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { addTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const UpsertTransaction = async (
  params: Omit<Prisma.TransactionCreateInput, "userId">,
) => {
  addTransactionSchema.parse(params);
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  await db.transaction.upsert({
    where: {
      id: params.id,
    },
    update: {
      ...params,
      userId,
    },
    create: {
      ...params,
      userId,
    },
  });
  revalidatePath("/transactions");
};
