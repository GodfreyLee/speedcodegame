"use client";

import PageCom from "@/app/components/PageCom";
import StepProvider from "@/app/context/step";

export default function Home({ params }) {
  return (
    <StepProvider>
      <PageCom params={params} />
    </StepProvider>
  );
}
