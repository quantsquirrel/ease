# DOPA (도파) — 90초 Brain Reset

> 도파민 과잉 자극 시대, 90초로 뇌를 리셋하다.

스마트폰 중독, 숏폼 과소비, 끊임없는 알림 — 현대인의 도파민 시스템은 만성적으로 둔감해지고 있습니다. DOPA는 신경과학에 기반한 **90초 Brain Reset 루프**를 통해 도파민 민감도를 측정하고 회복을 돕는 웹 서비스입니다.

## 핵심 가치

```
[PRE 측정] → [인지 스프린트] → [뉴로 리셋] → [목표 프라이밍] → [POST 측정] → [결과]
   10초          25초              20초            15초             10초         ~10초
                              총 90초
```

하루 한 번, 90초. 그것만으로 오늘의 뇌 상태를 객관적으로 확인하고, 도파민 민감도 변화를 추적할 수 있습니다.

## 주요 기능

- **90초 Brain Reset** — PRE/POST 반응속도 비교로 즉각적인 인지 회복 피드백
- **인지 스프린트 (N-Back)** — 작업기억 과제를 통한 전전두엽 재활성화
- **호흡 가이드 리셋** — DMN→TPN 네트워크 전환을 유도하는 구조화된 휴식
- **도파민 민감도 점수** — CSS(인지 스프린트 점수) + DSS(리셋 전후 변화량) + Shadow Baseline(7일 추세)
- **일일 스트릭** — 매일의 리셋 습관을 시각적으로 추적

## 과학적 근거

DOPA의 90초 Brain Reset은 "느낌"이 아니라 측정 가능한 신경과학적 매커니즘에 기반합니다. 프로젝트에 포함된 연구 문서들이 각 단계의 근거를 뒷받침합니다.

### 연구 문서 (`research/`)

| 문서 | 크기 | 핵심 내용 |
|------|------|----------|
| `dopamine_scientific_research_2024_2026.md` | 12KB | 2024-2026 도파민 과학 연구 종합 — 도파민 수용체 가소성, 행동 중독과 보상 회로의 최신 연구 동향 |
| `dopamine_receptor_downregulation_revised.md` | 40KB | 도파민 수용체 하향조절(downregulation) 메커니즘 — 과잉 자극이 D2 수용체 밀도를 감소시키는 과정과 회복 경로에 대한 체계적 분석 |
| `dopamine_measurement_research_synthesis.md` | 20KB | 도파민 민감도 측정 방법론 — 반응속도(SRT), 핑거 탭핑(IBI-CV), 인지 과제 수행 점수를 도파민 시스템 상태의 행동적 프록시로 활용하는 근거 |
| `acute_cognitive_reset_evidence.md` | — | 급성 인지 리셋 근거 — 60-90초 능동적 인지 과제가 DMN→TPN 네트워크 전환 + 전전두엽 재활성화를 유발하며, 이 전환에 도파민 시스템(VTA-D1 경로)이 매개한다는 신경과학적 근거 |

### 각 단계의 신경과학적 근거

**PRE/POST 반응속도 측정** — 단순반응시간(SRT)은 도파민계 각성 수준의 행동적 프록시로 널리 사용됩니다. 수동적 미디어 소비 후 둔화된 SRT가 인지 과제 수행 후 개선되는 정도(Reset Lift)가 도파민 민감도 회복의 지표가 됩니다.

**인지 스프린트 (N-Back)** — 작업기억 과제는 전전두엽 피질의 D1 수용체를 활성화하고, DMN(디폴트 모드 네트워크)에서 TPN(과제 양성 네트워크)으로의 전환을 트리거합니다. 이는 "멍때리기" 상태에서 "집중" 상태로의 신경 회로 전환입니다.

**뉴로 리셋 (호흡 가이드)** — 구조화된 호흡은 미주신경을 자극하여 부교감 신경계를 활성화하고, 코르티솔 수준을 낮추어 도파민 신호 전달의 신호대잡음비(SNR)를 개선합니다. 인지 스프린트 직후 배치되어 "각성 후 안정화" 효과를 극대화합니다.

**목표 프라이밍** — 복측피개영역(VTA)의 도파민 뉴런은 목표 지향적 행동의 개시에 핵심적 역할을 합니다. 리셋 직후 목표를 명시적으로 설정하면, 회복된 도파민 민감도가 구체적 행동 의도와 결합되어 실제 행동 전환 확률을 높입니다.

> 이 연구 근거들은 원본 프로젝트(dopamine-ease)의 PRD v2.7 §23 "부록: 과학적 근거 요약"에서 제품 요구사항과 직접 연결되어 있습니다.

## 기술 스택

- **Next.js 16** (App Router, Turbopack)
- **React 19**, TypeScript strict
- **Tailwind CSS v4** — OLED Dark 테마, Teal/Amber 톤 시스템
- **localStorage** — 클라이언트 상태 (점수, 스트릭, 세션 히스토리)
- **Vercel** 배포

## 시작하기

```bash
git clone <repo-url>
cd ease
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 명령어

```bash
npm run dev      # 개발 서버 (Turbopack, localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint
```

## 디자인 시스템

OLED Dark 기반, 세션 단계별 톤 전환:

| 토큰 | 값 | 용도 |
|------|-----|------|
| Background | `#12110F` | OLED 최적화 다크 배경 |
| Teal | `#4A9B8E` | Phase A (인지 도전) — 차갑고 집중적 |
| Amber | `#C4956A` | Result (결과) — 따뜻하고 보상적 |
| Surface | `#1A1D23` | 카드, 패널 |
| Text Primary | `#E8E6E3` | 본문 |
| Text Secondary | `#9B9A97` | 보조 텍스트 |

## 프로젝트 구조

```
ease/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # 다크 테마, 폰트, 메타
│   ├── page.tsx             # 대시보드 (점수, 스트릭, 시작 CTA)
│   ├── reset/page.tsx       # 90초 Brain Reset 루프
│   ├── history/page.tsx     # 과거 세션 목록
│   └── globals.css          # 디자인 토큰 + 애니메이션
├── components/
│   ├── ui/                  # Card, Button, ProgressBar, Badge
│   ├── reset/               # NBackGame, BreathingGuide, ReactionTime, GoalChip
│   └── dashboard/           # ScoreCard, Sparkline, StreakCounter
├── lib/
│   ├── types.ts             # Session, Score, ResetStep 타입
│   ├── score.ts             # CSS, DSS, Shadow Baseline 계산
│   ├── state.ts             # localStorage CRUD
│   ├── state-context.tsx    # React Context + useAppState()
│   └── streak.ts            # 스트릭 계산
├── data/
│   └── prompts.ts           # 목표 칩 옵션, 호흡 패턴
└── research/                # 과학적 근거 문서
    ├── dopamine_scientific_research_2024_2026.md
    ├── dopamine_receptor_downregulation_revised.md
    ├── dopamine_measurement_research_synthesis.md
    └── acute_cognitive_reset_evidence.md
```

## 관련 프로젝트

- **dopamine-ease** — 원본 기획 프로젝트 (PRD v2.7, SDD v1.7, React Native/Expo 설계 문서)
- **product-junhyeok** — dopamine-rush 컨셉, AI Camp 병렬 진행 프로젝트

## ADHD-Friendly 설계 원칙

- **90초 완결** — 보상 없이 90초 이상 지속되는 구간 없음
- **즉각 피드백** — 리셋 직후 점수 변화를 시각적으로 확인
- **최소 마찰** — 앱 실행 → 1탭으로 리셋 시작
- **중도 이탈 허용** — 미완료 세션은 기록에서 제외, 패널티 없음
