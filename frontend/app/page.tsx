"use client";
import Image from "next/image";
import Embed from "react-runkit";
import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

export default function Home() {
  const [inputUsername, setInputUsername] = useState<any>();
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState(
    "Print all even numbers from 0 – 10"
  );
  const [step, setStep] = useState("enterName");
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
    var a = eval('answer()');
    console.log(a);
  }
  return (
    <div className="bg-[url('/bg.png')] h-[100vh] bg-cover">
      <div className="bg-blue-300 p-2 flex justify-between">
        <div>SpeedCodeGame</div>
        {username && <div>welcome, {username}</div>}
      </div>
      {step === "enterName" && (
        <div className="flex flex-col items-center">
          <input
            className="border"
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
            className="border"
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
          <div className="border max-w-[500px] w-full">
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
                  defaultValue='console.log("yes");'
                  onMount={handleEditorDidMount}
                />
              </div>
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
        </div>
      )}
    </div>
  );
}
