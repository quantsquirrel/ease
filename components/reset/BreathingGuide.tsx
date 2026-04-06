"use client";

import { useState, useEffect, useRef } from "react";
import { breathingPattern } from "@/data/prompts";

type BreathPhase = "inhale" | "exhale";

export default function BreathingGuide({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState<BreathPhase>("inhale");
  const [seconds, setSeconds] = useState<number>(breathingPattern.inhale_sec);
  const completed = useRef(false);

  useEffect(() => {
    const tick = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setPhase((currentPhase) => {
            if (currentPhase === "inhale") {
              return "exhale";
            } else {
              setCycle((c) => {
                const nextCycle = c + 1;
                if (nextCycle >= breathingPattern.cycles && !completed.current) {
                  completed.current = true;
                  setTimeout(() => onComplete(), 400);
                }
                return nextCycle;
              });
              return "inhale";
            }
          });

          return phase === "inhale"
            ? breathingPattern.exhale_sec
            : breathingPattern.inhale_sec;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(tick);
  }, [phase, onComplete]);

  const totalCycles = breathingPattern.cycles;
  const isInhale = phase === "inhale";

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8">
      {/* Cycle indicator */}
      <div className="flex gap-2">
        {Array.from({ length: totalCycles }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-6 rounded-full transition-colors ${
              i < cycle
                ? "bg-amber"
                : i === cycle
                  ? "bg-amber/60"
                  : "bg-surface-2"
            }`}
          />
        ))}
      </div>

      {/* Breathing circle */}
      <div className="relative flex items-center justify-center">
        <div
          className={`h-40 w-40 rounded-full border-2 border-amber/40 ${
            isInhale ? "animate-breathe-in" : "animate-breathe-out"
          }`}
          style={{
            background:
              "radial-gradient(circle, var(--color-amber-glow) 0%, transparent 70%)",
          }}
        />
        <span className="absolute font-serif text-lg text-amber">
          {seconds}
        </span>
      </div>

      {/* Phase text */}
      <p className="font-serif text-xl text-amber">
        {isInhale ? "들이쉬세요..." : "내쉬세요..."}
      </p>
    </div>
  );
}
