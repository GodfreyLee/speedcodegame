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
          QuestionBank: {
            include: {
              TestCases: true,
            },
          },
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

export async function fetchScore(input) {
  return await prisma.player.findMany({
    where: {
      game_id: input.game_id,
    },
    include: {
      PlayerScores: true,
    },
  });
}

export async function createPlayerScore(input) {
  await prisma.playerScore.create({
    data: {
      score: input.score,
      player_id: input.player_id,
      game_question_id: input.game_question_id,
    },
  });
  return await prisma.playerScore.findMany({
    where: {
      game_question_id: input.game_question_id,
    },
  });
}

export async function enterGame(input) {
  const existing = await prisma.player.findFirst({
    where: {
      name: input.name,
      game_id: input.game_id,
    },
  });
  if (!existing) {
    await prisma.player.create({
      data: {
        name: input.name,
        game_id: input.game_id,
      },
    });
  }
  revalidatePath("/room/" + input.game_id);
}

function getRandomElements(arr, numElements) {
  if (numElements > arr.length) {
    throw new Error("Number of elements to select exceeds array length");
  }

  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numElements);
}

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export async function createRoo() {
  const room = await prisma.gameSession.create({
    data: {
      game_code: makeid(5),
      game_name: "",
      status: "active",
    },
  });

  const allQ = await prisma.questionBank.findMany();
  const selectedElements = getRandomElements(allQ, 3);
  for (const q of selectedElements) {
    await prisma.gameQuestion.create({
      data: {
        order: 1,
        game_id: room.id,
        question_id: q.id,
      },
    });
  }
  return room.id;
}
