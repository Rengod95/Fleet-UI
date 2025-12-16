# Fleet UI - 의존성 관리 가이드

## 📦 의존성 구조 개요

Fleet UI는 모노레포 구조로, 공통 의존성은 루트에서 관리하고 각 워크스페이스는 최소한의 의존성만 유지합니다.

---

## 🎯 루트 의존성 (Root Dependencies)

### Production Dependencies

```json
{
  "react": "19.0.0-rc.1",
  "react-dom": "19.0.0-rc.1",
  "react-native": "0.76.5"
}
```

**설명:**
- 모든 워크스페이스에서 공통으로 사용
- React 19 RC 버전 사용 (최신 기능 활용)
- React Native 0.76.5 (Expo SDK 54 호환)

### Development Dependencies

#### 빌드 도구
- `tsup`: ^8.0.2 - TypeScript 번들러
- `typescript`: ^5.4.5 - TypeScript 컴파일러
- `turbo`: ^2.0.0 - 모노레포 빌드 시스템

#### 테스팅
- `jest`: ^29.7.0 - 테스트 프레임워크
- `@testing-library/react-hooks`: ^8.0.1 - React Hooks 테스트
- `@testing-library/react-native`: ^12.4.5 - React Native 컴포넌트 테스트
- `react-test-renderer`: 18.3.1 - React 렌더러 (테스트용)

#### 린팅 & 포맷팅
- `eslint`: ^8.57.0 - JavaScript/TypeScript 린터
- `@typescript-eslint/eslint-plugin`: ^7.7.0 - TypeScript ESLint 플러그인
- `@typescript-eslint/parser`: ^7.7.0 - TypeScript ESLint 파서
- `prettier`: ^3.2.5 - 코드 포맷터

#### 타입 정의
- `@types/react`: ^18.3.11 - React 타입 정의
- `@types/react-dom`: ^18.3.5 - React DOM 타입 정의
- `@types/react-native`: ^0.73.0 - React Native 타입 정의

#### React Native 라이브러리
- `react-native-web`: ^0.19.13 - 웹 지원
- `react-native-gesture-handler`: ~2.20.2 - 제스처 처리
- `react-native-reanimated`: ~4.1.1 - 애니메이션
- `react-native-unistyles`: ^3.0.16 - 스타일링

#### 기타
- `@babel/core`: ^7.24.0 - Babel 컴파일러
- `@changesets/cli`: ^2.27.1 - 버전 관리

---

## 📦 워크스페이스별 의존성

### 1. packages/tokens

**devDependencies:**
- `@fleet-ui/eslint-config`: workspace:*
- `@fleet-ui/typescript-config`: workspace:*

**특징:**
- 의존성 없음 (순수 토큰 정의)
- 빌드 도구만 필요

---

### 2. packages/shared

**dependencies:**
- `@fleet-ui/tokens`: workspace:*

**peerDependencies:**
- `react`: >=18.0.0 || ^19.0.0
- `react-native`: >=0.76.0

**devDependencies:**
- `@fleet-ui/eslint-config`: workspace:*
- `@fleet-ui/typescript-config`: workspace:*

**특징:**
- tokens에 의존
- React/React Native는 peer dependency

---

### 3. packages/components

**dependencies:**
- `@fleet-ui/tokens`: workspace:*
- `@fleet-ui/shared`: workspace:*

**peerDependencies:**
- `react`: >=18.0.0 || ^19.0.0
- `react-native`: >=0.76.0
- `react-native-unistyles`: >=2.0.0

**devDependencies:**
- `@fleet-ui/eslint-config`: workspace:*
- `@fleet-ui/typescript-config`: workspace:*

**특징:**
- tokens와 shared에 의존
- Unistyles는 peer dependency

---

### 4. packages/animations

**dependencies:**
- `@fleet-ui/tokens`: workspace:*
- `@fleet-ui/shared`: workspace:*

**peerDependencies:**
- `react`: >=18.0.0 || ^19.0.0
- `react-native`: >=0.76.0
- `react-native-reanimated`: >=3.0.0

**devDependencies:**
- `@fleet-ui/eslint-config`: workspace:*
- `@fleet-ui/typescript-config`: workspace:*

**특징:**
- tokens와 shared에 의존
- Reanimated는 peer dependency

---

### 5. apps/storybook

Storybook app has been removed.

---

### 6. apps/playground

**dependencies:**
- `@fleet-ui/components`: workspace:*
- `@fleet-ui/animations`: workspace:*
- `@fleet-ui/tokens`: workspace:*
- `@fleet-ui/shared`: workspace:*
- `expo`: ~54.0.23
- `expo-router`: ~4.0.0
- `expo-status-bar`: ~2.0.0
- `react-native-safe-area-context`: 4.12.0
- `react-native-screens`: ~4.4.0

**devDependencies:**
- (없음 - 모두 루트에서 관리)

**특징:**
- Expo 전용 패키지만 포함
- React/React Native는 루트에서 호이스팅

---

## 🔄 의존성 호이스팅 전략

### 루트로 호이스팅된 의존성

```
루트 node_modules/
├── react@19.0.0-rc.1
├── react-dom@19.0.0-rc.1
├── react-native@0.76.5
├── react-native-web@0.19.13
├── react-native-gesture-handler@2.20.2
├── react-native-reanimated@3.16.1
├── react-native-unistyles@2.9.0
├── typescript@5.4.5
├── jest@29.7.0
└── ... (기타 공통 도구)
```

### 워크스페이스별 node_modules

```
packages/components/node_modules/
└── @fleet-ui/tokens -> ../../tokens (심볼릭 링크)

apps/playground/node_modules/
├── expo@54.0.23 (Expo 전용)
├── expo-router@4.0.0 (Expo 전용)
└── @fleet-ui/* -> ../../packages/* (심볼릭 링크)
```

---

## 📋 버전 호환성 매트릭스

### Expo SDK 54 호환성

| 패키지 | 버전 | 호환성 |
|--------|------|--------|
| expo | ~54.0.23 | ✅ 필수 |
| react | 19.0.0-rc.1 | ⚠️ RC (18.3.1 권장) |
| react-native | 0.76.5 | ✅ 필수 |
| expo-router | ~4.0.0 | ✅ 필수 |

### React Native 0.76 호환성

| 패키지 | 최소 버전 | 권장 버전 |
|--------|-----------|-----------|
| react | 18.3.0 | 19.0.0-rc.1 |
| react-native-reanimated | 3.0.0 | 3.16.1 |
| react-native-gesture-handler | 2.0.0 | 2.20.2 |
| react-native-unistyles | 2.0.0 | 2.9.0 |

---

## 🛠️ 의존성 관리 명령어

### 설치

```bash
# 전체 의존성 설치
pnpm install

# 특정 워크스페이스만
pnpm --filter @fleet-ui/components install
```

### 추가

```bash
# 루트에 추가 (공통 의존성)
pnpm add -w <package>

# 특정 워크스페이스에 추가
pnpm --filter @fleet-ui/components add <package>
```

### 업데이트

```bash
# 전체 업데이트
pnpm update

# 특정 패키지 업데이트
pnpm update react react-dom react-native

# 최신 버전으로 업데이트
pnpm update --latest
```

### 확인

```bash
# 의존성 트리 확인
pnpm list

# 특정 패키지 확인
pnpm list react

# 중복 확인
pnpm why react

# Outdated 확인
pnpm outdated
```

---

## ⚠️ 주의사항

### 1. React 19 RC 사용 시

React 19는 아직 RC 버전입니다. 프로덕션 환경에서는 주의가 필요합니다.

**안정 버전으로 다운그레이드:**
```json
{
  "react": "18.3.1",
  "react-dom": "18.3.1"
}
```

### 2. Peer Dependencies

각 패키지의 peerDependencies는 자동으로 설치되지 않습니다.

```bash
# pnpm은 자동으로 peer dependencies 경고를 표시
# .npmrc에 auto-install-peers=true 설정 권장
```

### 3. Expo 의존성

Expo 관련 패키지는 반드시 playground에만 설치:

```bash
# ❌ 잘못된 예
pnpm add -w expo

# ✅ 올바른 예
pnpm --filter playground add expo
```

### 4. 버전 충돌 해결

```bash
# 전체 재설치
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
pnpm install

# 캐시 정리
pnpm store prune
```

---

## 📊 의존성 그래프

```
루트 (Fleet UI)
├── react@19.0.0-rc.1
├── react-native@0.76.5
└── 공통 도구들
    │
    ├── packages/tokens
    │   └── (의존성 없음)
    │
    ├── packages/shared
    │   └── @fleet-ui/tokens
    │
    ├── packages/components
    │   ├── @fleet-ui/tokens
    │   └── @fleet-ui/shared
    │
    ├── packages/animations
    │   ├── @fleet-ui/tokens
    │   └── @fleet-ui/shared
    │
    ├── (removed) apps/storybook
    │   ├── Storybook removed
    │   ├── @fleet-ui/animations
    │   ├── @fleet-ui/tokens
    │   ├── @fleet-ui/shared
    │   └── Storybook 도구들
    │
    └── apps/playground
        ├── @fleet-ui/components
        ├── @fleet-ui/animations
        ├── @fleet-ui/tokens
        ├── @fleet-ui/shared
        └── Expo 패키지들
```

---

## 🔗 참고 자료

- [pnpm Workspace](https://pnpm.io/workspaces)
- [Expo SDK 54](https://expo.dev/changelog/2024/11-12-sdk-54)
- [React 19 RC](https://react.dev/blog/2024/04/25/react-19)
- [React Native 0.76](https://reactnative.dev/blog/2024/11/22/release-0.76)

