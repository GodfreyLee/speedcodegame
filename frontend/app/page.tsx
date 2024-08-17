'use client';
import Image from "next/image";
import Embed from 'react-runkit'
import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState<any>()
  return (
    <div>
      {<div>enter user name: <input onChange={(e) => setUsername(e.target.value)} /></div>}
      <div>welcome to kaboot, {username || "jeff"}</div>
      <Embed source={`// enter your answer here! \n`} />
      </div>
  );
}
