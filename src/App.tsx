import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Features } from "./components/Features";
import { Principles } from "./components/Principles";
import { TargetAudience } from "./components/TargetAudience";
import { UniqueValue } from "./components/UniqueValue";
import { MoneyMoneyApp } from "./components/MoneyMoneyApp";
import { CTA } from "./components/CTA";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Hero />
      <HowItWorks />
      <MoneyMoneyApp />
      <TargetAudience />
      <Principles />
      <UniqueValue />
      <Features />
      <CTA />
    </div>
  );
}