'use client'
import { insert } from "@/actions/questions";
import React, { useState } from "react";

export default function NewQuestions() {
  const [newQ, setNewQ] = useState("");
  const [newTime, setNewTime] = useState(1);
  return (
    <div className="flex flex-col w-full items-center mt-12">
      <textarea
        onChange={(e) => setNewQ(e.target.value)}
        className="border w-full h-[300px]"
        placeholder="question_text"
      />
      <textarea
        onChange={(e) => setNewTime(parseInt(e.target.value))}
        className="border w-full"
        placeholder="time_limit"
      />
      <button
        onClick={async () => {
          await insert({ time_limit: newTime, question_text: newQ });
        }}
      >
        create new
      </button>
    </div>
  );
}
