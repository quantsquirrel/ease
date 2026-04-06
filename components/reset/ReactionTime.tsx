"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { RTSnapshot } from "@/lib/types";
import { medianRT } from "@/lib/score";

type Phase = "waiting" | "ready" | "go" | "done";

export default function ReactionTime({
  onComplete,
}: {
  onComplete: (snapshot: RTSnapshot) => void;
}) {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [trials, setTrials] = useState<number[]>([]);
  const [goTime, setGoTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const trialCount = 5;

  const startTrial = useCallback(() => {
    setPhase("ready");
    const delay = 1000 + Math.random() * 2000;
    timerRef.current = setTimeout(() => {
      setGoTime(performance.now());
      setPhase("go");
    }, delay);
  }, []);

  useEffect(() => {
    const t = setTimeout(startTrial, 500);
    return () => {
      clearTimeout(t);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startTrial]);

  function handleTap() {
    if (phase === "ready") {
      if (timerRef.current) clearTimeout(timerRef.current);
      setPhase("waiting");
      setTimeout(startTrial, 800);
      return;
    }

    if (phase === "go") {
      const rt = Math.round(performance.now() - goTime);
      const updated = [...trials, rt];
      setTrials(updated);

      if (updated.length >= trialCount) {
        setPhase("done");
        const median = medianRT(updated);
        const mean = Math.round(
          updated.reduce((a, b) => a + b, 0) / updated.length
        );
        onComplete({ trials: updated, median_ms: median, mean_ms: mean });
      } else {
        setPhase("waiting");
        setTimeout(startTrial, 600);
      }
    }
  }

  if (phase === "done") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <p className="font-mono text-lg text-teal">측정 완료</p>
      </div>
    );
  }

  return (
    <button
      onClick={handleTap}
      className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4"
    >
      <p className="font-mono text-xs uppercase tracking-wider text-text-faint">
        {trials.length} / {trialCount}
      </p>

      {phase === "waiting" && (
        <p className="text-lg text-text-dim">준비 중...</p>
      )}
      {phase === "ready" && (
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-surface-2">
          <p className="font-mono text-sm text-text-dim">기다리세요</p>
        </div>
      )}
      {phase === "go" && (
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-teal animate-pulse-glow">
          <p className="font-mono text-xl font-bold text-background">탭!</p>
        </div>
      )}

      {trials.length > 0 && (
        <p className="font-mono text-sm text-text-faint">
          마지막: {trials[trials.length - 1]}ms
        </p>
      )}
    </button>
  );
}
