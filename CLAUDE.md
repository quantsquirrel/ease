# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

DOPA(도파) — 도파민 역치 개선을 위한 90초 Brain Reset 웹 서비스. 신경과학 기반 인지 과제 + 호흡 리셋 + 목표 프라이밍으로 도파민 민감도를 측정/회복. AI Camp 과제로 product-junhyeok(dopamine-rush)과 병렬 진행.

## Commands

```bash
npm run dev      # 개발 서버 (Turbopack, localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint
```

테스트 러너 미설정. 빌드 성공 여부로 타입 검증.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**, TypeScript strict
- **Tailwind CSS v4** (`@theme inline` in globals.css + tailwind.config.ts)
- **localStorage** — 클라이언트 상태 (점수, 스트릭, 세션)
- **Vercel** 배포
- Path alias: `@/*` = 프로젝트 루트

## Architecture

### 90초 Brain Reset 루프
단일 `app/reset/page.tsx`에서 step-machine으로 구현:
```
PRE(RT 5회, 10초) → Sprint(1-Back, 25초) → Breathe(호흡 가이드, 20초)
→ Goal(칩 선택, 15초) → POST(RT 5회, 10초) → Result
```

### 점수 체계
- `CSS` — 인지 스프린트 z-score 정규화 (0-100)
- `DSS` — PRE/POST Reset Lift % (양수 = 민감도 개선)
- `Shadow Baseline` — 7일 rolling 평균

### 상태 관리 패턴
`lib/state.ts` (localStorage CRUD) → `lib/state-context.tsx` (React Context + `useAppState()` hook). 모든 `"use client"` 컴포넌트에서 `useAppState()`로 접근.

### 핵심 파일
- `app/page.tsx` — 대시보드 (오늘 점수, 7일 스파크라인, 시작 CTA)
- `app/reset/page.tsx` — 90초 루프 ("use client", step-machine FSM)
- `app/history/page.tsx` — 과거 세션 목록
- `lib/score.ts` — CSS, DSS, Shadow Baseline 계산
- `lib/types.ts` — 중앙 타입 정의
- `data/prompts.ts` — 목표 칩 옵션, 호흡 패턴

## Design Tokens

OLED Dark 기반, 세션 단계별 톤 전환.

### 컬러
- `bg` (`#12110F`) — OLED dark background
- `surface` (`#1A1D23`) — 카드, 패널
- `teal` (`#4A9B8E`) — 인지 도전 Phase (차갑고 집중적)
- `amber` (`#C4956A`) — 결과/보상 Phase (따뜻하고 유기적)
- `positive` (`#5B9A6F`) — 개선 표시
- `negative` (`#B85C5C`) — 하락 표시 (최소 사용)
- `text` (`#E8E6E3`) — 본문
- `text-dim` (`#9B9A97`) — 보조 텍스트

### 톤 전환 규칙
- 인지 과제 중: Teal 80%, monospace, 기하학적
- 결과/보상: Amber 60%, serif, 유기적

### 디자인 규칙
- NEVER use raw Tailwind colors. 반드시 디자인 토큰 사용.
- NEVER use HEX literals in className. CSS 변수 또는 토큰 클래스 사용.
- `bg-background`이 canonical dark background.

## Scientific Research

`research/` 디렉토리에 과학적 근거 문서 4개 포함. 도파민 수용체 하향조절, 측정 방법론, 급성 인지 리셋 근거 등. 제품 결정의 참고 자료로 활용하되, 코드에는 영향 없음.

## Conventions

- 한국어 UI (모든 사용자 대면 문자열)
- 모든 페이지/인터랙티브 컴포넌트는 `"use client"`
- API key는 서버사이드(API Routes)에서만 접근
- Conventional Commits: `feat:`, `fix:`, `docs:`
