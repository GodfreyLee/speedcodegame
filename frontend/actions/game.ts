"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function fetchRoomQuestion(roomId: number) {
  return await prisma.gameSession.findFirst({
    where: {
      id: roomId,
    },
    include: {
      GameQuestions: {
        include: {
          QuestionBank: true,
        },
      },
      Players: true,
    },
  });
}

export async function answerQuestion(input) {
  await prisma.playerAnswer.create({
    data: {
      is_correct: false,
      status: "active",
      player_id: input.player_id || 1,
      game_question_id: input.game_question_id || 1,
      answer_text: input.answer_text || "",
    },
  });
}
