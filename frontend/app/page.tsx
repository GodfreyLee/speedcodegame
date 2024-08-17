"use client";
import Image from "next/image";
import Embed from "react-runkit";
import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { cn } from "@/utils/tailwind";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [roomList, setRoomList] = useState([
    {
      roomId: "test-1",
      roomName: "test room",
    },
    {
      roomId: "test-1",
      roomName: "test room",
    },
    {
      roomId: "test-1",
      roomName: "test room",
    },
  ]);
  return (
    <div className="bg-[url('/bg-2.png')] h-[100vh] bg-cover">
      <div className="bg-[#002265] p-2 flex justify-between">
        <div className="text-white">SpeedCodeGame</div>
      </div>
      <div className="flex flex-col items-center gap-12">
        <div className="bg-white p-2 mt-12">Room list</div>
        <div className="flex gap-12">
          {roomList.map((r) => (
            <div
              className="bg-green-500 p-2 flex flex-col gap-2 w-[100px] cursor-pointer"
              onClick={() => {
                router.push("/room/" + r.roomId);
              }}
            >
              <div className="">{r.roomName}</div>
              <div className="text-sm">{r.roomId}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
