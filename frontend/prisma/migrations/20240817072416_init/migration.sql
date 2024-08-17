-- CreateTable
CREATE TABLE "QuestionBank" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question_text" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time_limit" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "GameSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "game_code" TEXT NOT NULL,
    "game_name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "current_question" INTEGER
);

-- CreateTable
CREATE TABLE "GameQuestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "game_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    CONSTRAINT "GameQuestion_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "GameSession" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameQuestion_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "QuestionBank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TestCase" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question_id" INTEGER NOT NULL,
    "input" TEXT NOT NULL,
    "expected_output" TEXT NOT NULL,
    CONSTRAINT "TestCase_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "QuestionBank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "game_id" INTEGER NOT NULL,
    "joined_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Player_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "GameSession" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlayerAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "player_id" INTEGER NOT NULL,
    "game_question_id" INTEGER NOT NULL,
    "answer_text" TEXT,
    "submitted_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_correct" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "PlayerAnswer_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerAnswer_game_question_id_fkey" FOREIGN KEY ("game_question_id") REFERENCES "GameQuestion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlayerScore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "player_id" INTEGER NOT NULL,
    "game_question_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    CONSTRAINT "PlayerScore_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerScore_game_question_id_fkey" FOREIGN KEY ("game_question_id") REFERENCES "GameQuestion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GameLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "game_id" INTEGER NOT NULL,
    "player_id" INTEGER,
    "action" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GameLog_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "GameSession" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameLog_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "GameSession_game_code_key" ON "GameSession"("game_code");

-- CreateIndex
CREATE INDEX "GameQuestionOrderIndex" ON "GameQuestion"("game_id", "order");

-- CreateIndex
CREATE INDEX "TestCaseQuestionIndex" ON "TestCase"("question_id");

-- CreateIndex
CREATE INDEX "PlayerGameJoinIndex" ON "Player"("game_id", "joined_at");

-- CreateIndex
CREATE INDEX "PlayerAnswerIndex" ON "PlayerAnswer"("player_id", "game_question_id");

-- CreateIndex
CREATE INDEX "PlayerScoreIndex" ON "PlayerScore"("player_id", "game_question_id");

-- CreateIndex
CREATE INDEX "GameLogIndex" ON "GameLog"("game_id", "timestamp");
