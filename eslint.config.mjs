import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  // 1. Next.js 기본 권장 설정 및 TypeScript 설정 포함
  ...nextVitals,
  ...nextTs,

  // 2. 사용자 정의 규칙
  {
    rules: {
      // 콘솔 로그 사용 시 경고 (배포 전 확인용)
      "no-console": ["warn", {allow: ["warn", "error"]}],

      // 정의되었지만 사용하지 않는 변수 에러 처리
      "no-unused-vars": "off", // TS 규칙과 충돌 방지를 위해 off
      "@typescript-eslint/no-unused-vars": ["error"],

      // React 컴포넌트 만들 때 React 임포트 생략 허용 (Next.js는 자동임)
      "react/react-in-jsx-scope": "off",

      // <img> 태그 대신 Next.js의 <Image /> 컴포넌트 사용 권장
      "@next/next/no-img-element": "warn",
    },
  },
];

export default eslintConfig;