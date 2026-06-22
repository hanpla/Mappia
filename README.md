# <img src="./public/favicon.svg" width="30"/> MAPPIA

![MAPPIA 미리보기](./public/landing.png)

캘린더와 지도 기능을 활용해 체험 상품을 쉽고 편리하게 예약할 수 있는 웹 서비스  
체험 상품 탐색부터 예약은 물론, 등록한 체험 및 예약 현황 관리까지 사용자와 판매자 기능을 모두 제공한다.

🔗 배포 링크  
https://mappia23.vercel.app/

---

## ✨ 주요 기능

🔐 **회원·인증** : 이메일·카카오(OAuth) 로그인, JWT 액세스/리프레시 토큰 자동 갱신

🔍 **체험 탐색** : 카테고리 필터·검색·정렬, 페이지네이션, 최근 본 체험

📅 **체험 상세·예약** : 이미지·리뷰·카카오 지도, 날짜·시간대·인원 선택 예약

🏠 **호스트 기능** : 체험 등록·수정, 일정 관리, 받은 예약 승인·거절

☀️ **날씨 예보** : 기상청 단기+중기 API로 체험일 기준 5일 예보

🤖 **AI 리뷰 분석** : Gemini가 후기를 1~2줄 요약 + 핵심 키워드 3개로 자동 정리

---

## 🛠 기술 스택

### Frontend

![My Skills](https://skillicons.dev/icons?i=ts,next,react,tailwind)

**Libraries** : Zustand, TanStack Query, Axios

### Tools

![My Skills](https://skillicons.dev/icons?i=git,github,vscode)

### Deployment

![My Skills](https://skillicons.dev/icons?i=vercel)

### Communication

![My Skills](https://skillicons.dev/icons?i=discord,figma,notion)

---

## 📁 프로젝트 구조

```
mappia/
├── .github/                         # GitHub Action 및 워크플로우 설정
├── .husky/                          # Git Hooks (Pre-commit 등) 설정
├── public/                          # 정적 에셋 (이미지, 폰트 등)
└── src/                             # 소스 코드 메인 디렉토리
    ├── app/                         # Next.js App Router 페이지 및 레이아웃
    │   ├── (auth)/                  # 인증 관련 라우트 그룹 (login, signup)
    │   ├── (main)/                  # 메인 서비스 라우트 그룹 (about, activities, my-activities, profile, help)
    │   ├── error.tsx                # 전역 에러 핸들링 컴포넌트
    │   ├── layout.tsx               # Root 레이아웃 컴포넌트
    │   ├── not-found.tsx            # 404 Not Found 컴포넌트
    │   └── page.tsx                 # 홈 페이지 (/) 및 컴포넌트 데모
    ├── assets/                      # 로컬 미디어 자원
    │   ├── icons/                   # SVG 등 아이콘 파일
    │   └── logo/                    # 로고 자원
    ├── components/                  # 재사용 가능한 UI 컴포넌트
    │   ├── common/                  # 공통 컴포넌트 모음
    │   └── 각 페이지 컴포넌트/          # 각 페이지에서 사용할 컴포넌트 모음
    ├── constants/                   # 공통 상수 정의
    ├── hooks/                       # 커스텀 리액트 훅 모음
    ├── lib/                         # 유틸리티 및 외부 라이브러리 설정
    │   ├── api/                     # API 요청 클라이언트 및 통신 함수
    │   └── utils/                   # 헬퍼/유틸리티 함수
    ├── stores/                      # 전역 상태 관리 스토어 (Zustand 등)
    ├── styles/                      # 전역 CSS 스타일 정의 (Tailwind v4 설정 포함)
    └── types/                       # TypeScript 공통 타입 정의
```

---

## 🚀 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/hanpla/Mappia.git

# 2. 프로젝트 폴더 이동
cd Mappia

# 3. 패키지 설치
npm install

# 4. 환경 변수 설정
touch .env.local

# 5. 개발 서버 실행
npm run dev
```

<br />

**`.env.local` 파일 내용**

```bash
NEXT_PUBLIC_SITE_URL=서비스_도메인
NEXT_PUBLIC_API_BASE_URL=API_서버_주소

NEXT_PUBLIC_KAKAO_REST_API_KEY=카카오_REST_API_키
NEXT_PUBLIC_KAKAO_REDIRECT_URI=서비스_도메인/카카오_리다이렉트_경로
NEXT_PUBLIC_KAKAO_JS_KEY=카카오_JavaScript_키

WEATHER_API_KEY=기상청_API_키
GEMINI_API_KEY=Gemini_API_키
```

---

## 👥 팀원 및 역할

<table>
  <tr>
    <td width="150" height="150" align="center">
      <a href="https://github.com/hanpla">
        <img src="https://github.com/hanpla.png" width="80" />
      </a><br/>
      박승현(팀장)
    </td>
    <td width="600">
      <ul>
        <li>내 체험 관리, 예약 현황, 팀 소개, 고객센터 페이지, 날씨 예보</li>
        <li>공통컴포넌트 input, svgr</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="150" height="150" align="center">
      <a href="https://github.com/KuJiHye">
        <img src="https://github.com/KuJiHye.png" width="80" />
      </a><br/>
      구지혜
    </td>
    <td width="600">
      <ul>
        <li>체험 상세, 랜딩 페이지</li>
        <li>공통컴포넌트 chips/tag, pagination, modal, layout</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="150" height="150" align="center">
      <a href="https://github.com/gnath12">
        <img src="https://github.com/gnath12.png" width="80" />
      </a><br/>
      박진아
    </td>
    <td width="600">
      <ul>
        <li>메인, 체험 등록 및 수정 페이지, 리디자인</li>
        <li>공통컴포넌트 dropdown, toast</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="150" height="150" align="center">
      <a href="https://github.com/jiwonll">
        <img src="https://github.com/jiwonll.png" width="80" />
      </a><br/>
      윤지원
    </td>
    <td width="600">
      <ul>
        <li>예약내역 페이지, 디자인 토큰, AI 후기 분석</li>
        <li>공통컴포넌트 button, calendar</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="150" height="150" align="center">
      <a href="https://github.com/Useung0830">
        <img src="https://github.com/Useung0830.png" width="80" />
      </a><br/>
      성유승
    </td>
    <td width="600">
      <ul>
        <li>로그인(카카오 로그인), 회원가입, 내 정보 페이지</li>
        <li>공통컴포넌트 gnb, footer</li>
      </ul>
    </td>
  </tr>
</table>
