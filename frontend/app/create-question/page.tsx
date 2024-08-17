import { findMany, insert } from "@/actions/questions";
import NewQuestions from "@/components/NewQuestions";
import { useState } from "react";
export default async function Home() {
  const questions = await findMany();
  return (
    <div>
      <div className="flex">
        <div className="border w-[200px]">create</div>
        <div className="border w-[200px]">id</div>
        <div className="border w-[200px]">question_text</div>
        <div className="border w-[200px]">time limit</div>
      </div>
      {questions.map((q) => (
        <div className="flex">
          <div className="border w-[200px]">{q.created_at.toISOString()}</div>
          <div className="border w-[200px]">{q.id}</div>
          <div className="border w-[200px]">{q.question_text}</div>
          <div className="border w-[200px]">{q.time_limit}</div>
        </div>
      ))}
      <NewQuestions />
    </div>
  );
}
