"use client";

import { scoreTier } from "@/lib/score";
import { resultMessages, goalChips } from "@/data/prompts";

export default function ResultView({
  css,
  dss,
  goalChip,
  onDone,
}: {
  css: number;
  dss: number;
  goalChip: string;
  onDone: () => void;
}) {
  const tier = scoreTier(css);
  const message = resultMessages[tier];
  const selectedGoal = goalChips.find((c) => c.id === goalChip);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-4">
      {/* DSS Hero */}
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-text-faint">
          Dopamine Sensitivity Shift
        </p>
        <p className="mt-2 animate-score-reveal font-serif text-6xl text-amber">
          {dss > 0 ? "+" : ""}
          {dss}%
        </p>
      </div>

      {/* CSS Score */}
      <div className="w-full max-w-xs rounded-2xl border border-amber/20 bg-surface p-5 text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-text-faint">
          Cognitive Sprint Score
        </p>
        <p className="mt-1 font-serif text-3xl text-amber">{css}</p>
        <p className="mt-2 text-sm text-text-dim">{message}</p>
      </div>

      {/* Selected goal */}
      {selectedGoal && (
        <div className="flex items-center gap-2 rounded-xl border border-amber/10 bg-surface-2 px-4 py-2">
          <span className="text-lg">{selectedGoal.icon}</span>
          <span className="text-sm text-text-dim">
            목표: <span className="text-amber">{selectedGoal.label}</span>
          </span>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={onDone}
        className="mt-4 rounded-2xl bg-amber px-10 py-4 text-lg font-medium text-background transition-shadow hover:shadow-[0_0_30px_var(--color-amber-glow)]"
      >
        대시보드로 돌아가기
      </button>
    </div>
  );
}
