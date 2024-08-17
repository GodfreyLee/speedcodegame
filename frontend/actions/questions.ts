"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export async function insert(input: any) {
  return await prisma.questionBank.create({
    data: {
      question_text: input.question_text,
      time_limit: input.time_limit,
    },
  });
}

export async function findMany() {
  return await prisma.questionBank.findMany({
    include: {
      TestCases: true
    }
  });
}

export async function createAnswer(input) {
  await prisma.testCase.create({
    data: {
      expected_output: input.expected_output,
      input: "1",
      question_id: input.question_id,
    },
  });
  revalidatePath("/create-question");
}
