import React, { createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const StepContext = createContext<{
  step: string;
  setStep: React.Dispatch<React.SetStateAction<string>>;
  changeStep: (input:string) => void;
} | null>({ step: "enterName", setStep: () => {}, changeStep: () => {} });

export default function StepProvider({ children }: Props) {
  const [step, setStep] = useState<string>("enterName");
  const changeStep = (input: string) => setStep(input);
  return (
    <StepContext.Provider value={{ step, setStep, changeStep }}>
      {children}
    </StepContext.Provider>
  );
}
