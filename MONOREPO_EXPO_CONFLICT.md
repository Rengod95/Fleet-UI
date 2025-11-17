# 모노레포 환경에서 Expo Doctor 사용 시 충돌 분석

## 🔍 문제 요약

모노레포(pnpm workspace) 환경에서 `expo-doctor`와 `expo install --fix`를 실행하면 **의존성 관리 충돌**이 발생할 수 있습니다.

---

## 📊 충돌 발생 원인

### 1. 의존성 관리 방식의 근본적 차이

| 항목 | pnpm Workspace | Expo CLI |
|------|----------------|----------|
| 구조 | 심볼릭 링크 + 호이스팅 | Flat node_modules |
| 내부 패키지 | `workspace:*` 프로토콜 | 일반 npm 패키지로 인식 |
| 설치 위치 | 루트 + 각 워크스페이스 | 현재 디렉터리만 |
| 버전 관리 | 워크스페이스 전체 통합 | 개별 package.json |

### 2. 구체적인 충돌 시나리오

```
프로젝트 구조:
fleet-ui/
├── node_modules/                    # 루트 (공통 의존성)
│   ├── react@18.3.1
│   ├── react-native@0.76.5
│   └── ...
├── packages/
│   └── components/
│       ├── node_modules/            # 심볼릭 링크
│       │   └── @fleet-ui/tokens -> ../../tokens
│       └── package.json
│           └── peerDependencies:
│               └── react: ">=18.0.0"
└── apps/
    └── playground/
        ├── node_modules/            # playground 전용
        │   ├── expo@54.0.23
        │   ├── @fleet-ui/components -> ../../packages/components
        │   └── react@??? (충돌 발생 지점!)
        └── package.json
```

**충돌 발생 과정:**

1. **Expo Doctor 실행**
   ```bash
   cd apps/playground
   npx expo install --fix
   ```

2. **Expo CLI의 동작**
   - Expo SDK 54에 맞는 `react@18.3.1` 설치 시도
   - `apps/playground/node_modules`에 직접 설치
   - pnpm의 심볼릭 링크 구조를 인식하지 못함

3. **충돌 발생**
   ```
   ❌ react가 루트와 playground 양쪽에 설치됨
   ❌ @fleet-ui/components의 peerDependencies 해결 실패
   ❌ Metro bundler가 어떤 react를 사용할지 혼란
   ❌ "Multiple copies of React" 에러 발생 가능
   ```

### 3. 실제 발생하는 문제들

#### A. 버전 불일치
```bash
# 루트에서 설치된 버전
node_modules/react@18.2.0

# playground에서 Expo가 설치한 버전  
apps/playground/node_modules/react@18.3.1

# 결과: 컴포넌트가 다른 React 인스턴스 참조
```

#### B. Peer Dependency 경고
```
WARN  @fleet-ui/components@0.0.1 requires a peer of react@>=18.0.0 
but none is installed. You must install peer dependencies yourself.
```

#### C. Metro Bundler 혼란
```
error: Multiple copies of React detected.
This usually happens when a dependency requires React but 
the version doesn't match the one in your project.
```

---

## ✅ 해결 방법

### 방법 1: 수동 버전 관리 (가장 안전)

**장점:**
- 완전한 제어
- 충돌 없음
- 워크스페이스 전체 일관성 유지

**단점:**
- 수동 작업 필요
- Expo SDK 업데이트 시 버전 확인 필요

**절차:**

```bash
# 1. Expo SDK 호환 버전 확인
# https://expo.dev/changelog/2024/11-12-sdk-54

# 2. apps/playground/package.json 수동 업데이트
{
  "dependencies": {
    "expo": "~54.0.23",
    "react": "18.3.1",
    "react-native": "0.76.5",
    // ... 기타 의존성
  }
}

# 3. 루트에서 재설치
cd ../../
pnpm install

# 4. 검증
pnpm --filter playground start
```

### 방법 2: 격리된 환경에서 버전 확인

**장점:**
- Expo Doctor의 자동 버전 확인 활용
- 모노레포 구조에 영향 없음

**단점:**
- 추가 단계 필요
- 버전을 수동으로 복사해야 함

**절차:**

```bash
# 1. 임시 디렉터리 생성
mkdir /tmp/expo-check
cd /tmp/expo-check

# 2. package.json 복사
cp /path/to/fleet-ui/apps/playground/package.json .

# 3. npm으로 expo-doctor 실행 (pnpm 회피)
npm install
npx expo-doctor --fix

# 4. 업데이트된 버전 확인
cat package.json

# 5. 원본에 수동 반영
# (버전 정보를 복사하여 원본 package.json 업데이트)

# 6. 정리
cd /path/to/fleet-ui
pnpm install
```

### 방법 3: 제공된 스크립트 사용

```bash
# 루트에서 실행
pnpm expo-check

# 또는 직접 실행
./scripts/expo-doctor-check.sh
```

이 스크립트는:
- ✅ 검사만 수행 (자동 수정 없음)
- ✅ 현재 버전 표시
- ✅ 권장 사항 출력
- ✅ 모노레포 안전

### 방법 4: .npmrc 최적화 (보조 방법)

**`apps/playground/.npmrc` 생성:**

```ini
# Expo와 React Native 패키지를 호이스팅
node-linker=hoisted
shamefully-hoist=true
public-hoist-pattern[]=*expo*
public-hoist-pattern[]=*react-native*
public-hoist-pattern[]=@react-native/*
```

이렇게 하면:
- Expo 관련 패키지가 더 잘 호이스팅됨
- 심볼릭 링크 문제 완화
- 하지만 여전히 수동 관리 권장

---

## 🎯 권장 워크플로우

### 초기 설정 시

1. Expo 공식 문서에서 SDK 버전별 호환 패키지 확인
2. `apps/playground/package.json`에 정확한 버전 명시
3. 루트에서 `pnpm install`

### SDK 업데이트 시

1. 새 SDK 릴리스 노트 확인
2. 호환 버전 목록 확인
3. `apps/playground/package.json` 업데이트
4. 루트에서 `pnpm install`
5. 테스트 실행

### 문제 발생 시

```bash
# 1. 의존성 트리 확인
pnpm list react react-native expo

# 2. 중복 확인
pnpm why react

# 3. 전체 재설치
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
pnpm install

# 4. 캐시 정리
pnpm store prune
```

---

## 📋 체크리스트

### ✅ 안전한 작업

- [ ] Expo 공식 문서에서 버전 확인
- [ ] `package.json` 수동 업데이트
- [ ] 루트에서 `pnpm install`
- [ ] `pnpm list`로 버전 확인
- [ ] 앱 실행 테스트

### ❌ 피해야 할 작업

- [ ] playground에서 직접 `npm install` 실행
- [ ] playground에서 직접 `yarn add` 실행
- [ ] `expo install --fix` 무분별하게 실행
- [ ] 루트 재설치 없이 워크스페이스만 설치

---

## 🔗 참고 자료

### Expo SDK 54 호환 버전

| 패키지 | 버전 | 비고 |
|--------|------|------|
| expo | ~54.0.23 | 최신 패치 |
| react | 18.3.1 | 필수 |
| react-native | 0.76.5 | 필수 |
| expo-router | ~4.0.0 | 파일 기반 라우팅 |
| expo-status-bar | ~2.0.0 | 상태바 |
| react-native-screens | ~4.4.0 | 네비게이션 |
| react-native-safe-area-context | 4.12.0 | Safe Area |
| react-native-gesture-handler | ~2.20.2 | 제스처 |
| react-native-reanimated | ~3.16.1 | 애니메이션 |
| react-native-unistyles | ^2.9.0 | 스타일링 |

### 공식 문서

- [Expo SDK 54 Release](https://expo.dev/changelog/2024/11-12-sdk-54)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [React Native 0.76](https://reactnative.dev/blog/2024/11/22/release-0.76)

---

## 💡 핵심 요약

1. **모노레포 + Expo = 주의 필요**
   - pnpm의 심볼릭 링크 구조와 Expo CLI의 flat 구조 충돌
   
2. **자동 도구보다 수동 관리**
   - `expo install --fix`는 모노레포에서 위험
   - 버전을 수동으로 관리하는 것이 안전
   
3. **항상 루트에서 재설치**
   - 워크스페이스 변경 후 `pnpm install` 필수
   - 심볼릭 링크와 호이스팅 재구성

4. **검증 필수**
   - `pnpm list`로 버전 확인
   - `pnpm why`로 중복 확인
   - 앱 실행으로 동작 확인

