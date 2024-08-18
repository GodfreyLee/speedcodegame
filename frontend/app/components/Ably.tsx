"use client";

import * as Ably from "ably";
import { AblyProvider, ChannelProvider, useChannel } from "ably/react";

const Button = () => {
  const { channel, ably } = useChannel("chat-demo", (message) => {
    console.log("🚀 ~ const{channel,ably}=useChannel ~ message:", message.data)
    // setStep(message.data)
  });
  function sendChatMessage(msg) {
    channel.publish({ name: "chat-message", data: msg });
  }
  return <button onClick={() => sendChatMessage('question')}>send</button>;
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
