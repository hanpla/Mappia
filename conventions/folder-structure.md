# 폴더 구조

```
mappia/
├── .github/                  # GitHub Actions 및 워크플로우 설정
├── .husky/                   # Git Hooks (Pre-commit 등) 설정
├── public/                   # 정적 에셋 (이미지, 폰트 등)
└── src/                      # 소스 코드 메인 디렉토리
    ├── app/                  # Next.js App Router 페이지 및 레이아웃
    │   ├── (auth)/           # 인증 관련 라우트 그룹
    │   │   ├── login/        # 로그인 페이지 (/login)
    │   │   └── signup/       # 회원가입 페이지 (/signup)
    │   ├── (main)/           # 메인 서비스 라우트 그룹
    │   │   ├── activities/   # 체험/액티비티 페이지 (/activities)
    │   │   ├── profile/      # 마이페이지 (/profile)
    │   │   └── reservations/ # 예약 페이지 (/reservations)
    │   ├── error.tsx         # 전역 에러 핸들링 컴포넌트
    │   ├── layout.tsx        # Root 레이아웃 컴포넌트
    │   ├── not-found.tsx     # 404 Not Found 컴포넌트
    │   └── page.tsx          # 홈 페이지 (/)
    ├── assets/               # 로컬 미디어 자원
    │   ├── icons/            # SVG 등 아이콘 파일
    │   ├── images/           # 이미지 자원
    │   └── logo/             # 로고 자원
    ├── components/           # 재사용 가능한 UI 컴포넌트
    │   └── common/           # 공통 UI 컴포넌트
    │       ├── icon/         # 개별 SVG 아이콘 컴포넌트
    │       └── logo/         # 로고 컴포넌트
    ├── constants/            # 공통 상수 정의
    ├── hooks/                # 커스텀 리액트 훅
    ├── lib/                  # 유틸리티 및 외부 라이브러리 설정
    │   ├── api/              # API 요청 클라이언트 및 통신 함수
    │   └── utils/            # 헬퍼/유틸리티 함수
    ├── stores/               # 전역 상태 관리 스토어
    ├── styles/               # 전역 CSS 스타일 (Tailwind v4 설정 포함)
    │   └── globals.css       # 메인 스타일시트
    └── types/                # TypeScript 공통 타입 정의
```
