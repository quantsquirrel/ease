import type { AppState, Session } from "./types";

const STORAGE_KEY = "dopa-ease-state";
const STATE_VERSION = 1;

export function defaultState(): AppState {
  return {
    sessions: [],
    streak: 0,
    last_reset_date: null,
    onboarded: false,
    version: STATE_VERSION,
  };
}

/** localStorage에서 상태 로드 */
export function loadState(): AppState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as AppState;
    if (parsed.version !== STATE_VERSION) return defaultState();
    return parsed;
  } catch {
    return defaultState();
  }
}

/** localStorage에 상태 저장 */
export function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/** 세션 추가 */
export function addSession(state: AppState, session: Session): AppState {
  return {
    ...state,
    sessions: [...state.sessions, session],
  };
}

/** 오늘 날짜 (로컬 타임존, YYYY-MM-DD) */
export function today(): string {
  return toLocalDate(new Date());
}

function toLocalDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
