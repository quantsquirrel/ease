/** 90초 Brain Reset 루프 단계 */
export type ResetStep =
  | "idle"
  | "countdown"
  | "pre_rt"
  | "sprint"
  | "breathe"
  | "goal"
  | "post_rt"
  | "result";

/** 반응속도 측정 결과 */
export interface RTSnapshot {
  trials: number[];
  median_ms: number;
  mean_ms: number;
}

/** 단일 세션 기록 */
export interface Session {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  pre: RTSnapshot;
  post: RTSnapshot;
  sprint_score: number; // N-Back 정답률 (0-100)
  css: number; // 인지 스프린트 점수 (0-100)
  dss: number; // Reset Lift % (양수 = 개선)
  goal_chip: string;
}

/** 앱 전역 상태 */
export interface AppState {
  sessions: Session[];
  streak: number;
  last_reset_date: string | null;
  onboarded: boolean;
  version: number;
}

/** 점수 표시 등급 */
export type ScoreTier = "excellent" | "good" | "neutral" | "low";
