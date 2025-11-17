# Fleet UI Theming Guide

Fleet UI는 `react-native-unistyles`를 사용하여 강력하고 타입 안전한 테마 시스템을 제공합니다.

## 빠른 시작

### 1. 설치

```bash
# SDK 사용자는 다음 패키지들을 설치해야 합니다
pnpm add @fleet-ui/core react-native-unistyles react-native-reanimated react-native-gesture-handler
```

### 2. 초기화

앱의 진입점(예: `App.tsx` 또는 `_layout.tsx`)에서 unistyles를 import하세요:

```tsx
// app/_layout.tsx
import '@fleet-ui/core/unistyles';

export default function RootLayout() {
  return (
    // 앱 컴포넌트
  );
}
```

### 3. 컴포넌트에서 사용

```tsx
import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

function MyComponent() {
  const { styles, theme } = useStyles(stylesheet);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Fleet UI!</Text>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.bg['1'],
    padding: theme.space.lg,
    borderRadius: theme.borderRadius.md,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight['600'],
    color: theme.colors.text['1'],
  },
}));
```

## 디자인 토큰

### 색상 (Colors)

Fleet UI는 라이트/다크 테마를 지원하며, 시맨틱 컬러 시스템을 제공합니다.

#### 중립 색상 (Neutral)
```tsx
theme.colors['1']  // 가장 밝은 중립색
theme.colors['2']
// ...
theme.colors['10'] // 가장 어두운 중립색
```

#### 배경 색상 (Background)
```tsx
theme.colors.bg['1']  // 기본 배경
theme.colors.bg['2']  // 보조 배경
theme.colors.bg['3']  // 3차 배경
theme.colors.bg['4']  // 4차 배경
```

#### 테두리 색상 (Border)
```tsx
theme.colors.bd['1']  // 기본 테두리
theme.colors.bd['2']  // 강조 테두리
```

#### 텍스트 색상 (Text)
```tsx
theme.colors.text['1']  // 주요 텍스트 (가장 진함)
theme.colors.text['2']  // 보조 텍스트
theme.colors.text['3']  // 3차 텍스트 (가장 연함)
```

#### 시맨틱 색상 (Semantic)
각 시맨틱 색상은 1-10까지의 스케일을 가집니다:

```tsx
theme.colors.accent['1']   // 가장 연한 액센트
theme.colors.accent['5']   // 중간 액센트
theme.colors.accent['10']  // 가장 진한 액센트

theme.colors.success['5']  // 성공 색상
theme.colors.warning['5']  // 경고 색상
theme.colors.info['5']     // 정보 색상
theme.colors.error['5']    // 에러 색상
```

#### 특수 색상
```tsx
theme.colors.white
theme.colors.black
theme.colors.transparent
```

### 간격 (Spacing)

```tsx
theme.space._3xs  // 2px
theme.space._2xs  // 4px
theme.space.xs    // 8px
theme.space.sm    // 12px
theme.space.md    // 16px
theme.space.lg    // 20px
theme.space.xl    // 24px
theme.space._2xl  // 28px
theme.space._3xl  // 32px
theme.space._4xl  // 36px
theme.space._5xl  // 40px
```

### 타이포그래피 (Typography)

#### 폰트 크기
```tsx
theme.fontSize._2xs  // 10px
theme.fontSize.xs    // 12px
theme.fontSize.sm    // 14px
theme.fontSize.md    // 16px
theme.fontSize.lg    // 18px
theme.fontSize.xl    // 20px
theme.fontSize._2xl  // 22px
theme.fontSize._3xl  // 26px
theme.fontSize._4xl  // 32px
theme.fontSize._5xl  // 40px
```

#### 줄 높이
```tsx
theme.lineHeight._2xs  // 16px
theme.lineHeight.xs    // 18px
theme.lineHeight.sm    // 20px
theme.lineHeight.md    // 22px
theme.lineHeight.lg    // 24px
theme.lineHeight.xl    // 26px
theme.lineHeight._2xl  // 28px
theme.lineHeight._3xl  // 32px
theme.lineHeight._4xl  // 38px
theme.lineHeight._5xl  // 46px
```

#### 자간
```tsx
theme.letterSpacing.tighter  // -0.4
theme.letterSpacing.tight    // -0.25
theme.letterSpacing.normal   // -0.15
theme.letterSpacing.wide     // 0.2
theme.letterSpacing.wider    // 0.3
```

#### 폰트 굵기
```tsx
theme.fontWeight['200']  // Extra Light
theme.fontWeight['300']  // Light
theme.fontWeight['400']  // Regular
theme.fontWeight['500']  // Medium
theme.fontWeight['600']  // Semi Bold
theme.fontWeight['700']  // Bold
theme.fontWeight['800']  // Extra Bold
```

### 테두리 반경 (Border Radius)

```tsx
theme.borderRadius._2xs  // 4px
theme.borderRadius.xs    // 8px
theme.borderRadius.sm    // 12px
theme.borderRadius.md    // 16px
theme.borderRadius.lg    // 20px
theme.borderRadius.xl    // 24px
theme.borderRadius._2xl  // 32px
theme.borderRadius.full  // 999px (완전한 원형)
```

## 반응형 디자인

Unistyles는 breakpoint 기반 반응형 디자인을 지원합니다:

```tsx
const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: {
      xs: theme.space.sm,
      md: theme.space.lg,
      xl: theme.space._2xl,
    },
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
  },
}));
```

### 사용 가능한 Breakpoints

```tsx
xs: 0px      // 모바일
sm: 576px    // 큰 모바일
md: 768px    // 태블릿
lg: 992px    // 데스크톱
xl: 1200px   // 큰 데스크톱
_2xl: 1400px // 매우 큰 화면
```

## 테마 전환

### 프로그래밍 방식으로 테마 변경

```tsx
import { UnistylesRuntime } from 'react-native-unistyles';

function ThemeToggle() {
  const toggleTheme = () => {
    UnistylesRuntime.setTheme(
      UnistylesRuntime.themeName === 'light' ? 'dark' : 'light'
    );
  };
  
  return (
    <Button onPress={toggleTheme} title="Toggle Theme" />
  );
}
```

### 현재 테마 확인

```tsx
import { UnistylesRuntime } from 'react-native-unistyles';

function MyComponent() {
  const currentTheme = UnistylesRuntime.themeName; // 'light' or 'dark'
  
  return <Text>Current theme: {currentTheme}</Text>;
}
```

### 시스템 테마 자동 적응

Unistyles는 기본적으로 시스템 테마 변경을 자동으로 감지합니다 (`adaptiveThemes: true`).

## 고급 사용법

### 동적 스타일

```tsx
const stylesheet = createStyleSheet((theme) => ({
  button: (variant: 'primary' | 'secondary') => ({
    backgroundColor: variant === 'primary' 
      ? theme.colors.accent['5'] 
      : theme.colors.bg['3'],
    padding: theme.space.md,
    borderRadius: theme.borderRadius.md,
  }),
}));

function MyButton({ variant }: { variant: 'primary' | 'secondary' }) {
  const { styles } = useStyles(stylesheet);
  
  return <Pressable style={styles.button(variant)} />;
}
```

### 미디어 쿼리

```tsx
const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: theme.space.md,
  },
}));

function MyComponent() {
  const { styles, breakpoint } = useStyles(stylesheet);
  
  return (
    <View style={styles.container}>
      <Text>Current breakpoint: {breakpoint}</Text>
    </View>
  );
}
```

## 예제

전체 예제는 playground 앱의 Theme Demo를 참고하세요:

```bash
pnpm --filter playground start
# 앱에서 "🎨 Theme Demo"로 이동
```

## 타입 안전성

Fleet UI의 테마 시스템은 완전한 TypeScript 지원을 제공합니다:

- 자동 완성
- 타입 체크
- IntelliSense 지원

모든 디자인 토큰은 타입이 정의되어 있어 안전하게 사용할 수 있습니다.

## 참고 자료

- [react-native-unistyles 공식 문서](https://reactnativeunistyles.vercel.app/)
- [Fleet UI 디자인 토큰](./src/tokens/)
- [Playground 예제](../../apps/playground/)

