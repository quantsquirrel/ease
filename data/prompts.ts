/** 목표 프라이밍 칩 옵션 */
export const goalChips = [
  { id: "focus", label: "집중하기", icon: "🎯" },
  { id: "create", label: "만들기", icon: "🛠" },
  { id: "learn", label: "배우기", icon: "📖" },
  { id: "exercise", label: "운동하기", icon: "💪" },
  { id: "connect", label: "소통하기", icon: "💬" },
  { id: "rest", label: "제대로 쉬기", icon: "🌿" },
] as const;

/** 호흡 가이드 설정 */
export const breathingPattern = {
  inhale_sec: 4,
  hold_sec: 0,
  exhale_sec: 4,
  cycles: 3, // 24초 (20초 Phase에 근접)
} as const;

/** 결과 화면 메시지 */
export const resultMessages = {
  excellent: "뛰어난 집중력이에요! 도파민 시스템이 잘 반응하고 있습니다.",
  good: "좋은 상태예요. 오늘의 리셋이 효과적이었습니다.",
  neutral: "평균적인 상태입니다. 꾸준한 리셋이 도움이 됩니다.",
  low: "오늘은 좀 둔한 날이네요. 괜찮아요, 내일 다시 해봐요.",
} as const;

/** 카운트다운 텍스트 */
export const countdownSequence = ["숨을 들이쉬고", "내쉬고", "Go"] as const;
