"use client";
import { createAnswer, insert } from "@/actions/questions";
import React, { useState } from "react";

export default function NewQuestions() {
  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");
  const [newTime, setNewTime] = useState(1);
  return (
    <div className="flex flex-col w-full items-center mt-12">
      <textarea
        onChange={(e) => setNewQ(e.target.value)}
        className="border w-full h-[150px]"
        placeholder="question_text"
      />
      <textarea
        onChange={(e) => setNewA(e.target.value)}
        className="border w-full h-[150px]"
        placeholder="answer"
      />
      <textarea
        onChange={(e) => setNewTime(parseInt(e.target.value))}
        className="border w-full"
        placeholder="time_limit"
      />
      <button
        onClick={async () => {
          const newq = await insert({
            time_limit: newTime,
            question_text: newQ,
          });
          console.log("🚀 ~ onClick={ ~ newq:", newq);
          await createAnswer({
            expected_output: newA,
            input: "1",
            question_id: newq.id,
          });
        }}
      >
        create new
      </button>
    </div>
  );
}
