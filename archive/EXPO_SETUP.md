# Expo Doctor 사용 가이드 (모노레포)

## 문제점

모노레포 환경에서 `expo-doctor`와 `expo install --fix`를 실행하면 다음과 같은 충돌이 발생할 수 있습니다:

### 1. 의존성 관리 충돌
- **pnpm 워크스페이스**: `workspace:*` 프로토콜과 심볼릭 링크 사용
- **Expo CLI**: npm/yarn의 flat 구조를 가정하고 직접 설치 시도
- **결과**: 버전 불일치, 중복 설치, peer dependency 경고

### 2. 호이스팅 문제
```
루트 node_modules/
├── react@18.3.1 (공통)
└── react-native@0.76.5 (공통)

apps/playground/node_modules/
├── @fleet-ui/components -> ../../packages/components (심볼릭 링크)
└── expo@54.0.23 (Expo가 설치하려는 버전)
```

## 해결 방법

### 방법 1: 수동으로 버전 관리 (권장)

1. **Expo SDK 호환 버전 확인**
   ```bash
   # Expo 54 호환 버전 확인
   npx expo-doctor@latest --check
   ```

2. **package.json 수동 업데이트**
   - Expo 공식 문서에서 SDK 54 호환 버전 확인
   - `apps/playground/package.json`을 직접 수정
   - 루트에서 `pnpm install` 실행

3. **현재 설정 (Expo SDK 54 기준)**
   ```json
   {
     "dependencies": {
       "expo": "~54.0.23",
       "expo-router": "~4.0.0",
       "expo-status-bar": "~2.0.0",
       "react": "18.3.1",
       "react-dom": "18.3.1",
       "react-native": "0.76.5",
       "react-native-safe-area-context": "4.12.0",
       "react-native-screens": "~4.4.0",
       "react-native-web": "~0.19.13",
       "react-native-gesture-handler": "~2.20.2",
       "react-native-reanimated": "~3.16.1",
       "react-native-unistyles": "^2.9.0"
     }
   }
   ```

### 방법 2: Expo Doctor 안전하게 사용

1. **playground 워크스페이스에 진입**
   ```bash
   cd apps/playground
   ```

2. **Expo Doctor 설치 및 실행**
   ```bash
   # 로컬에 expo-doctor 설치
   pnpm add -D expo-doctor@latest
   
   # 검사만 실행 (자동 수정 없이)
   pnpm exec expo-doctor
   ```

3. **문제 확인 후 수동 수정**
   - expo-doctor가 제안하는 버전을 확인
   - `package.json`을 수동으로 업데이트
   - 루트로 돌아가서 `pnpm install` 실행

4. **자동 수정이 필요한 경우**
   ```bash
   # playground 디렉터리에서
   pnpm exec expo install --fix
   
   # 그 후 루트에서 재설치
   cd ../..
   pnpm install
   ```

### 방법 3: 격리된 환경에서 테스트

```bash
# 임시 디렉터리 생성
mkdir temp-expo-check
cd temp-expo-check

# package.json 복사
cp ../apps/playground/package.json .

# npm으로 expo-doctor 실행 (pnpm 충돌 회피)
npm install
npx expo-doctor --fix

# 업데이트된 버전 확인
cat package.json

# 원본에 반영
# (수동으로 버전 복사)
```

## 모노레포에서의 베스트 프랙티스

### 1. 공통 의존성 버전 통일

루트 `package.json`에 공통 버전 명시:

```json
{
  "devDependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-native": "0.76.5"
  }
}
```

### 2. Workspace 패키지의 peerDependencies 설정

```json
{
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-native": ">=0.76.0"
  }
}
```

### 3. .npmrc 설정 최적화

**루트 `.npmrc`:**
```ini
shamefully-hoist=true
auto-install-peers=true
strict-peer-dependencies=false
```

**`apps/playground/.npmrc`:**
```ini
node-linker=hoisted
shamefully-hoist=true
public-hoist-pattern[]=*expo*
public-hoist-pattern[]=*react-native*
```

## 검증 방법

### 1. 의존성 트리 확인
```bash
pnpm list react react-native expo
```

### 2. 중복 확인
```bash
pnpm why react
pnpm why react-native
```

### 3. Expo 프로젝트 실행 테스트
```bash
cd apps/playground
pnpm start
```

## 주의사항

1. **절대 playground 디렉터리에서 직접 npm/yarn 사용 금지**
   - 항상 pnpm 사용
   - 루트에서 `pnpm --filter playground` 사용

2. **expo install 사용 시 주의**
   - 가능하면 수동으로 버전 관리
   - 자동 설치 후 반드시 루트에서 `pnpm install` 재실행

3. **버전 충돌 발생 시**
   ```bash
   # 전체 재설치
   rm -rf node_modules
   rm -rf apps/*/node_modules
   rm -rf packages/*/node_modules
   pnpm install
   ```

## Expo SDK 54 호환 버전 (참고)

| 패키지 | 버전 |
|--------|------|
| expo | ~54.0.0 |
| react | 18.3.1 |
| react-native | 0.76.5 |
| expo-router | ~4.0.0 |
| expo-status-bar | ~2.0.0 |
| react-native-screens | ~4.4.0 |
| react-native-safe-area-context | 4.12.0 |
| react-native-gesture-handler | ~2.20.2 |
| react-native-reanimated | ~3.16.1 |

## 참고 링크

- [Expo SDK 54 Release Notes](https://expo.dev/changelog/2024/11-12-sdk-54)
- [pnpm Workspace](https://pnpm.io/workspaces)
- [React Native 0.76 Release](https://reactnative.dev/blog/2024/11/22/release-0.76)

