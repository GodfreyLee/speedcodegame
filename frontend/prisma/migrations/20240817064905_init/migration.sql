/*
  Warnings:

  - You are about to drop the `GameSessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameLog" DROP CONSTRAINT "GameLog_game_id_fkey";

-- DropForeignKey
ALTER TABLE "GameQuestion" DROP CONSTRAINT "GameQuestion_game_id_fkey";

-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_game_id_fkey";

-- DropTable
DROP TABLE "GameSessions";

-- CreateTable
CREATE TABLE "GameSession" (
    "id" SERIAL NOT NULL,
    "game_code" TEXT NOT NULL,
    "game_name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "current_question" INTEGER,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameSession_game_code_key" ON "GameSession"("game_code");

-- AddForeignKey
ALTER TABLE "GameQuestion" ADD CONSTRAINT "GameQuestion_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameLog" ADD CONSTRAINT "GameLog_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
