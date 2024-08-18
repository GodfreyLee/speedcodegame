"use client";

import * as Ably from "ably";
import { AblyProvider, ChannelProvider, useChannel } from "ably/react";
import { useContext, useEffect } from "react";
import { StepContext } from "../context/step";

const Button = ({}) => {
  const stepCon = useContext(StepContext);
  const { step, setStep, changeStep, broadcast } = stepCon;
  const { channel, ably } = useChannel("chat-demo", (message) => {
    console.log("🚀 ~ const{channel,ably}=useChannel ~ message:", message.data);
    if (message.data) {
      changeStep(message.data);
    }
  });
  function sendChatMessage(msg) {
    console.log("🚀 ~ sendChatMessage ~ msg:", msg);
    channel.publish({ name: "chat-message", data: msg });
  }
  useEffect(() => {
    if (broadcast) {
      channel.publish({ name: "chat-message", data: broadcast });
    }
  }, [broadcast])
  return (
    <button
      className="py-2 px-6 bg-[#002265] hover:bg-[#1368CE] text-white rounded shadow-xl"
      onClick={() => {
        sendChatMessage("question");
      }}
    >
      Start Game
    </button>
  );
  // return <button onClick={() => sendChatMessage('question')}>send</button>;
};

export default function Chat({ children }) {
  const client = new Ably.Realtime({ authUrl: "/api" });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="chat-demo">
        <Button />
        {children}
      </ChannelProvider>
    </AblyProvider>
  );
}
