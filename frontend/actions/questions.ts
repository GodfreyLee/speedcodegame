"use server"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export async function insert(input: any) {
  await prisma.questionBank.create({
    data: {
      question_text: input.question_text,
      time_limit: input.time_limit,
    },
  });
  revalidatePath("/create-question");
}

export async function findMany() {
  return await prisma.questionBank.findMany();
}
