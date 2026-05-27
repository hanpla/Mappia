# 작업 프로세스

기능 개발부터 배포까지의 표준 흐름입니다. 모든 작업은 **GitHub Issues**와 **GitHub Projects**를 기반으로 관리됩니다.

## 1. 이슈 생성 및 할당

- 새로운 기능 개발이나 버그 수정이 필요할 때 GitHub Issue를 생성합니다. (ex: `[Feature] 로그인 기능 구현`)
- 생성된 이슈를 GitHub Projects(칸반 보드)의 **Todo** 또는 **In Progress** 열로 이동시키고, 담당자(Assignee)와 마일스톤을 지정합니다.

## 2. 이슈 기반 브랜치 생성

작업 시작 전 로컬의 `develop` 브랜치를 최신화한 후 이슈 번호를 포함한 작업 브랜치를 생성합니다.

```bash
git checkout develop
git pull origin develop

git checkout -b feat/#이슈번호-기능이름
# 예시: git checkout -b feat/12-login
```

## 3. 기능 구현 및 커밋

의미 있는 단위로 커밋을 남깁니다. 커밋 메시지 규칙은 [commit.md](./commit.md)를 참고하세요.

## 4. Pull Request 생성 및 코드 리뷰

작업이 완료되면 원격 저장소에 푸시합니다.

```bash
git push origin feat/이슈번호-기능이름
```

- GitHub에서 `develop` 브랜치를 대상으로 PR을 생성합니다.
- PR 우측 사이드바의 **Development** 항목에 해당 이슈를 연결합니다.
- 최소 **2명 이상의 리뷰어 승인(Approve)** 이 있어야 머지할 수 있습니다.
