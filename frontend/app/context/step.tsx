import React, { createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const StepContext = createContext<{
  step: string;
  setStep: React.Dispatch<React.SetStateAction<string>>;
  changeStep: (input: string) => void;
  broadcast: React.Dispatch<React.SetStateAction<string>>;
  changeBroadcast: (input: string) => void;
} | null>({
  step: "enterName",
  setStep: () => {},
  changeStep: () => {},
  broadcast: "",
  changeBroadcast: () => {},
});

export default function StepProvider({ children }: Props) {
  const [step, setStep] = useState<string>("enterName");
  const [broadcast, setBroadcast] = useState("");
  const changeStep = (input: string) => setStep(input);
  const changeBroadcast = (input: string) => setBroadcast(input);
  return (
    <StepContext.Provider
      value={{ step, setStep, changeStep, broadcast, changeBroadcast }}
    >
      {children}
    </StepContext.Provider>
  );
}
