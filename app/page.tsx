"use client";

import Link from "next/link";
import { useAppState } from "@/lib/state-context";
import { shadowBaseline, scoreTier } from "@/lib/score";
import { calculateStreak } from "@/lib/streak";
import { Badge } from "@/components/ui";

export default function Dashboard() {
  const { state } = useAppState();
  const streak = calculateStreak(state.sessions);
  const baseline = shadowBaseline(state.sessions);
  const todaySession = state.sessions.find(
    (s) => s.date === toLocalDate(new Date())
  );
  const tier = todaySession ? scoreTier(todaySession.css) : null;

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="font-serif text-3xl text-text">Ease</h1>
        <p className="mt-1 text-sm text-text-dim">90초, 뇌를 깨우다</p>
      </header>

      {/* Today's Score Card */}
      <section className="mb-8 rounded-2xl border border-border bg-surface p-6">
        <p className="font-mono text-xs uppercase tracking-wider text-text-faint">
          오늘의 도파민 민감도
        </p>
        {todaySession ? (
          <>
            <p className="mt-2 font-serif text-5xl text-amber">
              {todaySession.dss > 0 ? "+" : ""}
              {todaySession.dss}%
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant={tier === "excellent" || tier === "good" ? "positive" : "amber"}>
                CSS {todaySession.css}
              </Badge>
              <span className="text-xs text-text-dim">
                7일 기준선: {baseline}
              </span>
            </div>
          </>
        ) : (
          <>
            <p className="mt-2 font-serif text-5xl text-amber">—</p>
            <p className="mt-1 text-sm text-text-dim">
              첫 리셋을 완료하면 점수가 표시됩니다
            </p>
          </>
        )}
      </section>

      {/* Brain Reset CTA */}
      <Link
        href="/reset"
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-teal py-4 text-lg font-medium text-background transition-shadow hover:shadow-[0_0_30px_rgba(74,155,142,0.3)]"
      >
        <span className="font-mono text-sm">90초</span>
        Brain Reset 시작
      </Link>

      {/* Streak */}
      <section className="mt-8 flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
        <span className="text-2xl">🔥</span>
        <div>
          <p className="text-sm font-medium text-text">{streak}일 연속</p>
          <p className="text-xs text-text-dim">
            {streak > 0 ? "좋아요, 계속 유지하세요!" : "매일 한 번 리셋하세요"}
          </p>
        </div>
      </section>

      {/* History Link */}
      <Link
        href="/history"
        className="mt-4 block text-center text-sm text-text-dim hover:text-teal"
      >
        지난 기록 보기 →
      </Link>
    </main>
  );
}

function toLocalDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
