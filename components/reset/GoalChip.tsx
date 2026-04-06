"use client";

import { goalChips } from "@/data/prompts";

export default function GoalChip({
  onSelect,
}: {
  onSelect: (chipId: string) => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-4">
      <div className="text-center">
        <p className="font-serif text-2xl text-amber">
          리셋 후 무엇을 할까요?
        </p>
        <p className="mt-2 text-sm text-text-dim">
          목표를 선택하면 뇌가 준비됩니다
        </p>
      </div>

      <div className="grid w-full max-w-sm grid-cols-2 gap-3">
        {goalChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => onSelect(chip.id)}
            className="flex items-center gap-3 rounded-xl border border-amber/20 bg-surface px-4 py-4 text-left transition-all hover:border-amber/50 hover:bg-surface-2 hover:shadow-[0_0_20px_var(--color-amber-glow)] active:scale-95"
          >
            <span className="text-2xl">{chip.icon}</span>
            <span className="font-serif text-sm text-text">{chip.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
