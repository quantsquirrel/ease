import type { Session } from "./types";

/**
 * 세션 배열에서 연속 일수 계산
 * 날짜 기준 연속성 체크 (시간 무관)
 */
export function calculateStreak(sessions: Session[]): number {
  if (sessions.length === 0) return 0;

  const dates = [
    ...new Set(sessions.map((s) => s.date)),
  ].sort((a, b) => b.localeCompare(a)); // 최신순

  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diffDays = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
    if (Math.round(diffDays) === 1) {
      streak++;
    } else {
      break;
    }
  }

  // 오늘 세션이 없으면 스트릭 리셋 확인
  const todayStr = new Date().toISOString().split("T")[0];
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = yesterdayDate.toISOString().split("T")[0];

  if (dates[0] !== todayStr && dates[0] !== yesterdayStr) {
    return 0;
  }

  return streak;
}
