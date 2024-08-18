"use client";
import Image from "next/image";
import Embed from "react-runkit";
import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { cn } from "@/utils/tailwind";
import Countdown from "react-countdown";
import {
  answerQuestion,
  createPlayerScore,
  enterGame,
  fetchRoomQuestion,
  fetchScore,
} from "@/actions/game";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import('../../components/Ably'), {
  ssr: false,
})

export default function Home({ params }) {
  let { roomId } = params;
  roomId = parseInt(roomId);
  const nowTime = Date.now();
  const timeLimit = 60;
  const router = useRouter();

  const [gameId, setGameId] = useState(-1);
  const [inputUsername, setInputUsername] = useState<any>();
  const [username, setUsername] = useState("");
  const [question, setQuestion] = useState(
    "Print all even numbers from 0 – 10"
  );

  const [allPlayers, setAllPlayers] = useState([]);
  const [gameQs, setGameQs] = useState([]);
  const [questionNum, setQuestionNum] = useState(-1);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [step, setStep] = useState("enterName");
  const [isCorrect, setIsCorrect] = useState(false);
  const [scoreList, setScoreList] = useState([
    // { username: "Robyn", score: 982 },
    // { username: "Nancy", score: 911 },
    // { username: "Mal", score: 0 },
    // { username: "jeff", score: 0 },
  ]);
  const editorRef = useRef(null);

  // fetch all question after enter room
  // todo move this into waiting room
  useEffect(() => {
    const fetchQ = async () => {
      const game = await fetchRoomQuestion(roomId);
      setGameQs(game.GameQuestions);
      setAllPlayers(game.Players);
      setGameId(game.id);
      if (questionNum < 0) setQuestionNum(0);
    };
    if (step === "enterName") {
      fetchQ();
    }
  }, [step]);


  const startGame = () => {
    // socket.emit('startGame');
    // setNewMessage('');
    setStep("question");
  };

  const enterG = async () => {
    if (!inputUsername) {
      alert("please enter a name");
      return;
    }
    const allPlayers = await enterGame({
      name: inputUsername,
      game_id: roomId,
    });
    setUsername(inputUsername);
    // todo move to when start game
    setStep("waitForStart");
    const game = await fetchRoomQuestion(roomId);
    setAllPlayers(game.Players);
  };

  // post answer to backend
  useEffect(() => {
    const answerQ = async (input) => {
      // const game = await answerQuestion(input);
      await createPlayerScore({
        score: input.score,
        player_id: input.player_id,
        game_question_id: input.game_question_id,
      });
      await new Promise((r) => setTimeout(r, 3000));
      setStep("score");
    };

    if (step === "waitForOther") {
      let score = 0;
      if (
        consoleOutput.toString() ===
        gameQs[questionNum]?.QuestionBank?.TestCases[0]?.expected_output
      ) {
        setIsCorrect(true);
        score = 500;
        const usedTime = Date.now() - nowTime;
        score = score * (1 + (timeLimit - usedTime) / timeLimit);
      } else {
        setIsCorrect(false);
      }
      answerQ({
        player_id: allPlayers.find((v) => v.name === username)?.id,
        game_question_id: gameQs[questionNum]?.id,
        // answer_text: consoleOutput.toString(),
        score,
      });
    }
  }, [step]);
  /**[
    {
        "id": 1,
        "name": "jeff",
        "game_id": 1,
        "joined_at": "2024-08-17T08:27:44.000Z",
        "PlayerScores": [
            {
                "id": 5,
                "player_id": 1,
                "game_question_id": 1,
                "score": 941
            }
        ]
    }
] */
  useEffect(() => {
    const fetchAllScore = async () => {
      const allScore = await fetchScore(gameId);
      const newList = allScore.map((a) => {
        return {
          username: a.name,
          score: a.PlayerScores.reduce((prev, curr, i) => {
            return prev + curr.score;
          }, 0),
        };
      });

      setScoreList(newList);
    };
    const enterNextQ = async () => {
      await new Promise((r) => setTimeout(r, 5000));
      console.log("🚀 ~ enterNextQ ~ questionNum:", questionNum);
      if (questionNum === gameQs.length - 1) {
        console.log("game end");
        setStep("gameEnd");
      } else {
        setStep("question");
        setQuestionNum(questionNum + 1);
      }
    };
    if (step === "score") {
      fetchAllScore();
      enterNextQ();
    }
  }, [step]);

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
      <Chat>
      <div className="bg-[url('/bg-2.png')] h-[100vh] bg-cover">
      <div className="bg-[#002265] p-5 flex justify-between">
        <div
          className="text-white cursor-pointer"
          onClick={() => router.push("/")}
        >
          SpeedCodeGame
        </div>
        <div className="text-white">Game Room {roomId}</div>
        {username && <div className="text-white">welcome, {username}</div>}
      </div>
      {(step === "enterName" || step === "waitForStart") && (
        <div className="flex flex-col items-center gap-12 mt-12">
          <input
            className="border p-2 rounded"
            placeholder="Enter your name"
            onKeyDown={(e) => {
              if (e.code === "Enter" || e.code === "NumpadEnter") {
                enterG();
              }
            }}
            onChange={(e) => {
              setInputUsername(e.target.value);
            }}
          />
          <button
            className="py-2 px-6 bg-[#002265] hover:bg-[#1368CE] text-white rounded shadow-xl"
            onClick={() => {
              enterG();
            }}
          >
            Enter Game
          </button>
          <div className="flex gap-4">
            {allPlayers.map((p) => (
              <div className="p-2 bg-white rounded-sm w-[50px] text-center">
                {p.name}
              </div>
            ))}
          </div>
          {username &&
            allPlayers.findIndex((p) => p.name === username) > -1 && (
              <button
                className="py-2 px-6 bg-[#002265] hover:bg-[#1368CE] text-white rounded shadow-xl"
                onClick={() => {
                  startGame();
                }}
              >
                Start Game
              </button>
            )}
        </div>
      )}
      {step === "question" && (
        <div className="flex flex-col items-center">
          <div className="bg-white w-full font-bold p-5">
            Questions: {gameQs[questionNum]?.QuestionBank?.question_text || ""}
          </div>
          <div className="mt-5">
            <Countdown
              renderer={({ hours, minutes, seconds, completed }) => {
                return (
                  <span className="p-3 mt-10 rounded-full bg-[#002265] text-white shadow-xl">
                    {minutes * 60 + seconds}
                  </span>
                );
              }}
              date={nowTime + 60 * 1000}
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
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 shadow-xl"
                  >
                    Run
                  </button>
                </div>
              </div>
            </form>
          </div>
          <button
            onClick={() => {
              showValue();
              setStep("waitForOther");
            }}
            className="mt-4 inline-flex items-center rounded-md bg-[#26890C] px-12 py-2 text-sm font-semibold text-white hover:bg-green-500"
          >
            Submit
          </button>
        </div>
      )}
      {step === "waitForOther" && <div className="text-4xl">Loading</div>}
      {step === "score" && (
        <div className={cn("flex flex-col items-center")}>
          <div
            className={cn("bg-white w-full p-5 font-bold flex justify-center", {
              "text-red-500": !isCorrect,
              "text-green-500": isCorrect,
            })}
          >
            Your answer is {isCorrect ? "correct" : "wrong"}
          </div>
          <div className="bg-[#002265] min-w-[300px] min-h-[400px] p-2 mt-12 text-white flex flex-col gap-2 rounded font-bold">
            {scoreList.map((s) => (
              <div className="flex justify-between m-2">
                <div>{s.username}</div>
                <div>{s.score}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {step === "gameEnd" && (
        <div className="flex flex-col justify-center items-center mt-6">
          <div className="bg-[#002265] rounded-md shadow-xl p-8 flex flex-col gap-4 text-4xl text-white">
            Final Ranking
          </div>
          <div className="bg-[#002265] min-w-[300px] min-h-[400px] p-2 mt-12 text-white flex flex-col gap-2 rounded font-bold">
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
    </Chat>
  );
}
