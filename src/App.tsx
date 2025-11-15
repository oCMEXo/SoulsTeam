import { useState } from "react";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Features } from "./components/Features";
import { Principles } from "./components/Principles";
import { TargetAudience } from "./components/TargetAudience";
import { UniqueValue } from "./components/UniqueValue";
import { MoneyMoneyApp } from "./components/MoneyMoneyApp";
import { CTA } from "./components/CTA";
import { Demo } from "./components/Demo";

export default function App() {
  const [showDemo, setShowDemo] = useState(false);

  if (showDemo) {
    return <Demo onBackToHome={() => setShowDemo(false)} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Hero onTryDemo={() => setShowDemo(true)} />
      <HowItWorks />
      <MoneyMoneyApp />
      <TargetAudience />
      <Principles />
      <UniqueValue />
      <Features />
      <CTA onTryDemo={() => setShowDemo(true)}/>

    </div>
  );
}