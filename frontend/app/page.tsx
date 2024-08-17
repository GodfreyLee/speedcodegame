"use client";
import Image from "next/image";
import Embed from "react-runkit";
import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { cn } from "@/utils/tailwind";
import { useRouter } from "next/navigation";

export default function Home() {
  let roomIdInput = ''
  const router = useRouter();

  // const [roomList, setRoomList] = useState([
  //   {
  //     roomId: "test-1",
  //     roomName: "test room",
  //   },
  //   {
  //     roomId: "test-1",
  //     roomName: "test room",
  //   },
  //   {
  //     roomId: "test-1",
  //     roomName: "test room",
  //   },
  // ]);

  // function for users to create rooms
  const createRoom = async () => {
    const res = await fetch('/api/rooms/create')
    const roomId: string = await res.text()
    router.push(`/room/${roomId}`)
  }

  // function that triggers when users join a room
  const joinRoom = async (roomId: string) => {
    router.push(`/room/${roomId}`)
  }

  return (
    <div className="bg-[url('/bg-2.png')] h-[100vh] bg-cover">
      <div className="bg-[#002265] p-2 flex justify-between">
        <div className="text-white">SpeedCodeGame</div>
      </div>
      <div className="flex flex-col items-center gap-4 justify-center h-[80%] ">

      <button 
        onClick={createRoom}
        className=" p-3 border-2 border-red-600 w-[310px] rounded-md shadow-md bg-red-500">Enter Room</button>

        <div className="bg-white rounded-md shadow-xl p-8 flex flex-col gap-4">
          <input 
            onChange={({ target }) => (roomIdInput = target.value)}
            placeholder="Enter Room Id" type="text" className="text-center p-3 border-2 border-slate-400 rounded-md shadow-md"/>
          <button 
            onClick={() => joinRoom(roomIdInput)}
            className="text-white p-3 border-2 border-slate-700 rounded-md shadow-md bg-slate-700">Enter Room</button>
        </div>
        {/* <div className="bg-white p-2 mt-12">Room list</div> */}
          {/* <div className="flex gap-12 ">
            {roomList.map((r, index) => (
              <div
                key={ index }
                className="bg-green-500 p-2 flex flex-col gap-2 w-[100px] cursor-pointer"
                onClick={() => {
                  router.push("/room/" + r.roomId);
                }}
              >
                <div className="">{r.roomName}</div>
                <div className="text-sm">{r.roomId}</div>
              </div>
            ))}
          </div> */}
      </div>
    </div>
  );
}
