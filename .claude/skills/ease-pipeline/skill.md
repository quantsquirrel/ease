---
name: ease-pipeline
description: "DOPA(도파) ~/ease/ 프로젝트의 4단계 구현 파이프라인을 실행한다. 코드 리뷰에서 발견된 CRITICAL/MAJOR 이슈를 순차적으로 수정하고 각 단계마다 QA 검증 게이트를 통과한다. 'ease 구현', 'ease 수정', 'ease 파이프라인', '4단계 실행' 등의 요청에 사용."
---

# DOPA Ease 구현 파이프라인

~/ease/ 프로젝트의 4단계 순차 구현을 조율한다. 각 단계는 executor가 구현하고 qa가 검증한다.

## 실행 모드
에이전트 팀 (2인: ease-executor + ease-qa)

## 파이프라인 개요

```
Stage 1 (인프라) → QA Gate → Stage 2 (디자인) → QA Gate → Stage 3 (핵심) → QA Gate → Stage 4 (연결) → QA Gate → 완료
```

## Stage 1: 인프라 수정

**목표:** StateProvider 연결 + hydration 안전화
**변경 파일:**

1. `app/providers.tsx` (신규)
```tsx
"use client";
import { StateProvider } from "@/lib/state-context";
export function Providers({ children }: { children: React.ReactNode }) {
  return <StateProvider>{children}</StateProvider>;
}
```

2. `app/layout.tsx` — Providers로 children 감싸기
3. `lib/state-context.tsx` — 3가지 수정:
   - `useState(defaultState)` (loadState → defaultState)
   - mounted 플래그 추가
   - `useEffect(() => { if (mounted) saveState(state); }, [state, mounted]);`

**QA 게이트:** npm run build 성공 + useAppState() 호출 가능

## Stage 2: 디자인 시스템

**목표:** Camp 패턴 기반 공통 UI 컴포넌트 생성
**변경 파일:**

1. `components/ui/Card.tsx` — Camp 카드 패턴
2. `components/ui/Button.tsx` — 기본 + CTA 변형
3. `components/ui/ProgressBar.tsx` — 세션 진행률 표시
4. `components/ui/Badge.tsx` — 스트릭/점수 뱃지

**디자인 규칙:**
- 카드: `bg-surface border border-border rounded-xl` (Camp 패턴)
- CTA 버튼: `bg-teal text-background rounded-2xl`
- 톤 전환: 인지 과제=Teal 계열, 결과=Amber 계열
- 애니메이션: globals.css에 정의된 keyframe만 사용

**QA 게이트:** 빌드 성공 + 토큰 일관성 검증

## Stage 3: 핵심 기능 구현

**목표:** 90초 Brain Reset step-machine + 5개 리셋 컴포넌트
**변경 파일:**

1. `app/reset/page.tsx` — step-machine FSM 완전 구현
   - `const [step, setStep] = useState<ResetStep>("idle")`
   - useEffect 타이머로 자동 전환
   - 각 step에 해당 컴포넌트 렌더링

2. `components/reset/ReactionTime.tsx`
   - 화면 탭/클릭 시 RT 기록 (5회)
   - medianRT 계산 후 콜백

3. `components/reset/NBackGame.tsx`
   - 1-Back: 이전 자극과 현재 자극 비교
   - 25초 타이머, 정답률 계산

4. `components/reset/BreathingGuide.tsx`
   - 4초 들숨/4초 날숨 × 3 사이클
   - CSS 애니메이션 (breathe-in/breathe-out)

5. `components/reset/GoalChip.tsx`
   - data/prompts.ts의 goalChips 6개 렌더링
   - 칩 선택 시 콜백

6. `components/reset/ResultView.tsx`
   - CSS, DSS 점수 표시
   - scoreTier 기반 메시지
   - 대시보드 복귀 CTA

**QA 게이트:** 빌드 성공 + idle→result 전이 검증 + 각 컴포넌트 존재

## Stage 4: 데이터 연결

**목표:** 대시보드와 히스토리에 실제 데이터 반영
**변경 파일:**

1. `app/page.tsx` — useAppState()로 동적 데이터
2. `app/history/page.tsx` — 세션 목록 렌더링
3. `app/reset/page.tsx` — 세션 완료 시 recordSession() 호출
4. `lib/state-context.tsx` / `lib/state.ts` — today()/yesterday() 로컬 타임존 수정
5. `app/reset/page.tsx`에서 `<a>` → `<Link>` 수정

**QA 게이트:** 빌드 성공 + 타임존 수정 확인 + dead code 해소 확인

## 에러 핸들링

| 에러 유형 | 전략 |
|----------|------|
| 빌드 실패 | executor가 1회 재시도, 재실패 시 qa에게 보고 |
| 타입 에러 | tsc 출력 분석 → 타입 수정 |
| QA FAIL | executor에게 구체적 수정 지시 → 재구현 → 재검증 (최대 2회) |
| 2회 연속 QA FAIL | 해당 단계 스킵 불가, 사용자에게 에스컬레이션 |

## 데이터 전달

- **태스크 기반:** TaskCreate로 각 단계 작업 할당
- **메시지 기반:** SendMessage로 검증 결과/수정 요청 실시간 전달
- **파일 기반:** 코드 파일 자체가 산출물 (별도 _workspace 불필요)

## 테스트 시나리오

**정상 흐름:**
1. Stage 1 시작 → providers.tsx 생성 + layout 수정 + state-context 수정 → 빌드 성공 → QA PASS
2. Stage 2 → UI 컴포넌트 4개 생성 → 빌드 성공 → QA PASS
3. Stage 3 → step-machine + 5개 컴포넌트 → 빌드 성공 → QA PASS
4. Stage 4 → 데이터 연결 → 빌드 성공 → QA PASS → 완료

**에러 흐름:**
1. Stage 3에서 NBackGame 타입 에러 → executor가 수정 → 재빌드 성공 → QA에서 step 전이 누락 발견 → FAIL → executor가 useEffect 타이머 수정 → 재검증 → PASS
