"use client";
import Image from "next/image";
import Embed from "react-runkit";
import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { cn } from "@/utils/tailwind";
import Countdown from "react-countdown";

export default function Home() {
  const [inputUsername, setInputUsername] = useState<any>();
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState(
    "Print all even numbers from 0 – 10"
  );
  const [consoleOutput, setConsoleOutput] = useState("");
  const [step, setStep] = useState("enterName");
  const [isCorrect, setIsCorrect] = useState(false);
  const [scoreList, setScoreList] = useState([
    { username: "Robyn", score: 982 },
    { username: "Nancy", score: 911 },
    { username: "Mal", score: 0 },
    { username: "jeff", score: 0 },
  ]);
  const editorRef = useRef(null);
  const enterQuestionStage = () => {
    if (!inputUsername) {
      alert("please enter a name");
      return;
    }
    setUsername(inputUsername);
    setStep("question");
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  function showValue() {
    var expression = editorRef.current.getValue();
    let result = eval(`(${expression})()`);
    setConsoleOutput(result);
    // alert(`result: ${result}`);
  }
  const codeTemplate = `function solution() {` + `\n  return 1` + `\n}`;
  return (
    <div className="bg-[url('/bg-2.png')] h-[100vh] bg-cover">
      <div className="bg-[#002265] p-2 flex justify-between">
        <div className="text-white">SpeedCodeGame</div>
        {username && <div className="text-white">welcome, {username}</div>}
      </div>
      {step === "enterName" && (
        <div className="flex flex-col items-center gap-12 mt-12">
          <input
            className="border p-2"
            placeholder="Enter your name"
            onKeyDown={(e) => {
              if (e.code === "Enter" || e.code === "NumpadEnter") {
                enterQuestionStage();
              }
            }}
            onChange={(e) => {
              setInputUsername(e.target.value);
            }}
          />
          <button
            className="p-2 bg-[#1368CE] text-white"
            onClick={() => {
              enterQuestionStage();
            }}
          >
            Enter Game
          </button>
        </div>
      )}
      {step === "question" && (
        <div className="flex flex-col items-center">
          <div className="bg-white w-full p-2">questions: {question}</div>
          <div>
            <Countdown
              renderer={({hours, minutes, seconds, completed}) => {
                return (
                  <span>
                    {minutes * 60 + seconds}
                  </span>
                );
              }}
              date={Date.now() + 60000}
            />
          </div>
          <div className="border max-w-[500px] w-full mt-12">
            {/* <Embed
              onEvaluate={(e: any) => {
                console.log(e);
              }}
              source={`// enter your answer here! \n`}
            /> */}

            <form
              action="#"
              onSubmit={(e) => {
                e.preventDefault();
                showValue();
              }}
            >
              <div className="">
                <label htmlFor="comment" className="sr-only">
                  Add your code
                </label>
                <Editor
                  height="50vh"
                  defaultLanguage="javascript"
                  defaultValue={codeTemplate}
                  onMount={handleEditorDidMount}
                />
              </div>
              <div className="bg-white">{consoleOutput}</div>
              <div className="flex justify-between pt-2">
                <div className="flex items-center space-x-5"></div>
                <div className="flex-shrink-0">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                  >
                    Run
                  </button>
                </div>
              </div>
            </form>
          </div>
          <button
            onClick={() => {
              setStep("score");
            }}
            className="mt-4 inline-flex items-center rounded-md bg-[#26890C] px-3 py-2 text-sm font-semibold text-white hover:bg-green-500"
          >
            Submit
          </button>
        </div>
      )}

      {step === "score" && (
        <div className={cn("flex flex-col items-center")}>
          <div
            className={cn("bg-white w-full p-2 flex justify-center", {
              "text-red-500": !isCorrect,
              "text-green-500": isCorrect,
            })}
          >
            Your answer is {isCorrect ? "correct" : "wrong"}
          </div>
          <div className="bg-[#002265] min-w-[300px] min-h-[400px] p-2 mt-12 text-white flex flex-col gap-2">
            {scoreList.map((s) => (
              <div className="flex justify-between">
                <div>{s.username}</div>
                <div>{s.score}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
