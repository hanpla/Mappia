# 네이밍 규칙

## 변수

- 기본적으로 camelCase 사용 / 상수는 대문자 SNAKE_CASE 사용
- boolean 타입의 경우, 앞에 `is`, `has`, `should` 중 하나 붙이기
  - `is` 가 기본, `has`, `should` 는 변수명에 따라 유동적으로
- 배열과 같이 여러 값이 들어가는 경우, 변수명에 `s` 붙이기
- 축약형 사용하지 않기 → `button` O / `btn` X

## 함수

- 기본적으로 camelCase 사용 / 컴포넌트의 경우 PascalCase 사용
- 컴포넌트는 `export default function` 형태로 작성

  ```tsx
  export default function Component() {
    // Component
  }
  ```

- 컴포넌트 외의 모든 함수는 화살표 함수
- 함수 이름은 명령문 형태로 작성 (ex. `closeModal`)
- custom hook의 경우 앞에 `use` 붙이기
- 이벤트를 다룰 경우에는 `handle` + `요소` + `event` 형태로 작성 (ex. `handleCloseButtonClick`)
- 하나만 export 시킬 경우 아래와 같이 `export default` 작성

  ```tsx
  const 함수이름 = () => {
    // code
  };

  export default 함수이름;
  ```

## 파일

- 컴포넌트 파일은 PascalCase 사용
- Next.js URL 파일을 제외한 일반 파일은 camelCase 사용
- 이미지 파일은 언더바(`_`) 사용

## 폴더

- 폴더는 kebab-case 사용
