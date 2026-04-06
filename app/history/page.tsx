"use client";

import Link from "next/link";
import { useAppState } from "@/lib/state-context";
import { scoreTier } from "@/lib/score";
import { Badge } from "@/components/ui";

export default function HistoryPage() {
  const { state } = useAppState();
  const sessions = [...state.sessions].reverse();

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-text">지난 기록</h1>
        <Link href="/" className="text-sm text-text-dim hover:text-teal">
          ← 대시보드
        </Link>
      </header>

      {sessions.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-text-dim">아직 완료한 세션이 없습니다</p>
          <Link
            href="/reset"
            className="mt-4 inline-block rounded-xl bg-teal px-6 py-2 text-sm font-medium text-background"
          >
            첫 리셋 시작하기
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sessions.map((session) => {
            const tier = scoreTier(session.css);
            return (
              <div
                key={session.id}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-dim">{session.date}</span>
                  <Badge
                    variant={
                      tier === "excellent" || tier === "good"
                        ? "positive"
                        : tier === "neutral"
                          ? "amber"
                          : "negative"
                    }
                  >
                    {tier}
                  </Badge>
                </div>
                <div className="mt-2 flex items-baseline gap-4">
                  <div>
                    <p className="font-mono text-xs text-text-faint">DSS</p>
                    <p className="font-serif text-xl text-amber">
                      {session.dss > 0 ? "+" : ""}
                      {session.dss}%
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-text-faint">CSS</p>
                    <p className="font-serif text-xl text-teal">
                      {session.css}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-text-faint">PRE→POST</p>
                    <p className="font-mono text-sm text-text-dim">
                      {session.pre.median_ms}ms → {session.post.median_ms}ms
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
