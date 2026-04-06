"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const LETTERS = "ABCDEFGHJKLMNP";
const INTERVAL_MS = 2000;

export default function NBackGame({
  duration,
  onComplete,
}: {
  duration: number;
  onComplete: (accuracy: number) => void;
}) {
  const [current, setCurrent] = useState("");
  const [previous, setPrevious] = useState("");
  const [responded, setResponded] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState(duration);
  const completedRef = useRef(false);

  const nextLetter = useCallback(() => {
    setCurrent((prev) => {
      setPrevious(prev);
      setResponded(false);
      setFeedback(null);
      const isMatch = Math.random() < 0.33;
      if (isMatch && prev) return prev;
      let next: string;
      do {
        next = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      } while (next === prev);
      return next;
    });
  }, []);

  useEffect(() => {
    nextLetter();
    const letterInterval = setInterval(nextLetter, INTERVAL_MS);
    const countdown = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1 && !completedRef.current) {
          completedRef.current = true;
          clearInterval(letterInterval);
          clearInterval(countdown);
          setStats((s) => {
            const accuracy =
              s.total === 0 ? 50 : Math.round((s.correct / s.total) * 100);
            setTimeout(() => onComplete(accuracy), 300);
            return s;
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(letterInterval);
      clearInterval(countdown);
    };
  }, [nextLetter, onComplete, duration]);

  function respond(isSame: boolean) {
    if (responded || !previous) return;
    setResponded(true);
    const actualMatch = current === previous;
    const isCorrect = isSame === actualMatch;
    setFeedback(isCorrect ? "correct" : "wrong");
    setStats((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      {/* Timer */}
      <p className="font-mono text-sm text-text-faint">{timeLeft}초</p>

      {/* Letter display */}
      <div
        className={`flex h-28 w-28 items-center justify-center rounded-2xl border-2 transition-colors ${
          feedback === "correct"
            ? "border-positive bg-positive/10"
            : feedback === "wrong"
              ? "border-negative bg-negative/10"
              : "border-teal/30 bg-surface"
        }`}
      >
        <span className="font-mono text-5xl font-bold text-teal">
          {current}
        </span>
      </div>

      {/* Instructions */}
      <p className="text-sm text-text-dim">
        이전 글자와{" "}
        <span className="text-teal">같으면</span> /
        <span className="text-text"> 다르면</span> 탭
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => respond(true)}
          disabled={responded}
          className="rounded-xl bg-teal/20 px-8 py-3 font-mono text-teal transition-all hover:bg-teal/30 disabled:opacity-40"
        >
          같음
        </button>
        <button
          onClick={() => respond(false)}
          disabled={responded}
          className="rounded-xl bg-surface-2 px-8 py-3 font-mono text-text transition-all hover:bg-surface disabled:opacity-40"
        >
          다름
        </button>
      </div>

      {/* Score */}
      <p className="font-mono text-xs text-text-faint">
        {stats.correct}/{stats.total}
      </p>
    </div>
  );
}
