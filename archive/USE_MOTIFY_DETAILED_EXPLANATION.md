# use-motify 훅 상세 해설서

## 1. 전체 워크플로우 및 아키텍처 개요

### 1.1 핵심 개념

`use-motify`는 React Native Reanimated를 기반으로 선언적 애니메이션 API를 제공하는 커스텀 훅입니다. Framer Motion의 API 철학을 React Native 환경에 이식한 것으로, 다음과 같은 핵심 기능을 제공합니다:

1. **상태 기반 애니메이션**: `from`, `animate`, `exit` 상태를 선언하면 자동으로 애니메이션 적용
2. **애니메이션 타입 시스템**: Spring, Timing, Decay 세 가지 물리 기반 애니메이션
3. **시퀀스 & 반복**: 배열을 통한 시퀀스 애니메이션, repeat/loop 지원
4. **Transform 특별 처리**: CSS Transform과 유사하지만 React Native의 제약사항 반영
5. **Presence 시스템**: 컴포넌트 마운트/언마운트 시 애니메이션 관리

### 1.2 실행 흐름 (Execution Flow)

```
[컴포넌트 렌더링]
      ↓
[useMotify 훅 호출]
      ↓
[1단계: 초기화]
   - isMounted SharedValue 생성
   - Presence 컨텍스트 추출 (isPresent, safeToUnmount)
   - presenceContext.initial로 초기 애니메이션 활성화 여부 결정
      ↓
[2단계: useAnimatedStyle 실행] ← **핵심 로직**
   ├─ [2-1: 스타일 병합 결정]
   │   ├─ 마운트 상태 확인 (!isMounted.value)
   │   │   └─ TRUE → from 스타일 사용
   │   │   └─ FALSE → animate 스타일 사용
   │   ├─ Exiting 상태 확인 (!isPresent && hasExitStyle)
   │   │   └─ TRUE → exit 스타일 사용
   │   └─ stylePriority에 따라 state vs animate 병합 순서 결정
   │
   ├─ [2-2: Transition 설정 병합]
   │   ├─ transitionProp (SharedValue 또는 일반 객체)
   │   ├─ variantStyle.transition (state 기반)
   │   └─ exitTransitionProp (exiting 시 우선)
   │
   ├─ [2-3: 스타일 키별 처리] ← **반복 로직**
   │   │
   │   └─ 각 스타일 키에 대해:
   │       │
   │       ├─ [애니메이션 설정 계산] - animationConfig()
   │       │   ├─ 타입 결정 (spring/timing/decay/no-animation)
   │       │   │   └─ 우선순위: transition[key].type → transition.type → 기본값(색상/opacity는 timing, 나머지 spring)
   │       │   ├─ 반복 설정 (repeat, loop, repeatReverse)
   │       │   └─ 설정 객체 구성 (duration, easing, stiffness 등)
   │       │
   │       ├─ [지연 시간 계산] - animationDelay()
   │       │   └─ 우선순위: transition[key].delay → transition.delay → defaultDelay
   │       │
   │       └─ [값 타입별 분기 처리]
   │           │
   │           ├─ [CASE 1: key === 'transform']
   │           │   └─ 배열의 각 transform 객체 순회
   │           │       ├─ transformValue가 배열 → 시퀀스 (getSequenceArray)
   │           │       └─ 일반 값 → withTiming/withSpring/withDecay
   │           │
   │           ├─ [CASE 2: Array.isArray(value)] - 시퀀스 애니메이션
   │           │   ├─ getSequenceArray() 호출
   │           │   ├─ withSequence(...sequence) 생성
   │           │   ├─ shouldRepeat → withRepeat 래핑
   │           │   └─ isTransform → transform 배열에 추가
   │           │       └─ 아니면 final[key]에 직접 할당
   │           │
   │           ├─ [CASE 3: isTransform(key)] - 단일 transform 속성
   │           │   ├─ animation(value, config, callback)
   │           │   ├─ shouldRepeat → withRepeat
   │           │   ├─ delayMs → withDelay
   │           │   └─ transform 배열에 {[key]: finalValue} 추가
   │           │
   │           ├─ [CASE 4: typeof value === 'object'] - 그림자 등
   │           │   └─ 중첩 객체의 각 키에 대해 애니메이션 적용
   │           │
   │           └─ [CASE 5: 일반 속성] - opacity, width 등
   │               ├─ animation(value, config, callback)
   │               ├─ shouldRepeat → withRepeat
   │               └─ delayMs → withDelay
   │
   └─ [2-4: 최종 스타일 반환]
       └─ transform 배열이 비어있으면 삭제
       └─ final 객체 반환
      ↓
[3단계: useEffect - 마운트 후 정리]
   ├─ isMounted.value = true 설정
   └─ isPresent가 false이고 exit 스타일 없으면 즉시 safeToUnmount 호출
      ↓
[애니메이션 실행 및 콜백]
   ├─ 각 애니메이션 완료 시 callback 실행
   ├─ onDidAnimate 사용자 콜백 호출
   └─ Exit 애니메이션 완료 시 safeToUnmount 호출
```

### 1.3 주요 분기 지점 및 결정 트리

#### 분기 1: 스타일 우선순위 결정

```
스타일 병합 시작
   │
   ├─ isMounted.value === false && !disableInitialAnimation && from이 존재?
   │   └─ YES → from 스타일만 사용 (초기 상태)
   │   └─ NO → 아래 계속
   │
   ├─ isExiting (즉, !isPresent && hasExitStyle)?
   │   └─ YES → exit 스타일 사용 (언마운트 애니메이션)
   │   └─ NO → 아래 계속
   │
   └─ stylePriority === 'state'?
       └─ YES → { ...animate, ...variantStyle }
       └─ NO → { ...variantStyle, ...animate }
```

#### 분기 2: 애니메이션 타입 결정

```
animationConfig() 함수 내부
   │
   ├─ transition[key].type 존재?
   │   └─ YES → 해당 타입 사용
   │   └─ NO → 아래 계속
   │
   ├─ transition.type 존재?
   │   └─ YES → 해당 타입 사용
   │   └─ NO → 아래 계속
   │
   └─ isColor(key) || key === 'opacity'?
       └─ YES → 'timing'
       └─ NO → 'spring' (기본값)
```

#### 분기 3: 값 처리 분기

```
스타일 키 순회 중
   │
   ├─ value == null || value === false?
   │   └─ YES → 건너뛰기 (return)
   │
   ├─ key === 'transform'?
   │   └─ YES → Transform 특별 처리 로직
   │       └─ 각 transform 객체 순회
   │
   ├─ Array.isArray(value)?
   │   └─ YES → 시퀀스 애니메이션
   │       └─ getSequenceArray() → withSequence()
   │
   ├─ isTransform(key)?
   │   └─ YES → transform 배열에 추가
   │
   ├─ typeof value === 'object'?
   │   └─ YES → 그림자 등 중첩 객체 처리
   │
   └─ else → 일반 속성 처리
```

### 1.4 콜백 체인 및 부수효과

1. **애니메이션 완료 콜백**: 각 속성의 애니메이션이 완료될 때마다 실행

   - `onDidAnimate` 사용자 훅 호출
   - 인라인 `onDidAnimate` 호출 (값에 포함된 경우)
   - Exit 애니메이션 추적 및 `safeToUnmount` 호출

2. **Exit 애니메이션 추적 시스템**:

   ```
   exitingStyleProps = { opacity: true, transform: true, ... }

   각 속성 애니메이션 완료 시:
      exitingStyleProps[key] = false

   모든 값이 false가 되면:
      runOnJS(reanimatedSafeToUnmount)() 호출
      → 컴포넌트 DOM에서 제거 가능
   ```

### 1.5 Worklet 환경과 JS 환경 분리

Reanimated의 핵심 개념인 "worklet"(UI 스레드에서 실행되는 함수)을 이해하는 것이 중요합니다:

- **Worklet 영역** (UI 스레드):
  - `useAnimatedStyle` 내부의 모든 로직
  - `animationConfig`, `animationDelay`, `getSequenceArray` 등 헬퍼 함수
  - `'worklet'` 지시어가 있는 모든 함수
- **JS 영역** (JavaScript 스레드):
  - React 컴포넌트 로직
  - `onDidAnimate` 등 사용자 콜백
  - `runOnJS()` 래퍼를 통해 Worklet에서 JS 함수 호출

### 1.6 핵심 데이터 구조

```typescript
// 최종 스타일 객체 구조
final = {
  // 일반 속성
  opacity: WithTimingConfig,
  width: WithSpringConfig,

  // Transform (항상 배열)
  transform: [
    { translateX: WithSpringConfig },
    { scale: WithTimingConfig },
  ],

  // 그림자 (중첩 객체)
  shadowOffset: {
    width: WithTimingConfig,
    height: WithTimingConfig,
  }
}

// 애니메이션 래핑 계층
value
  → animation(value, config, callback)      // withTiming/withSpring/withDecay
  → withRepeat(...)                         // 반복이 필요한 경우
  → withDelay(delayMs, ...)                 // 지연이 필요한 경우
```

---

## 2. 코드 라인별 상세 주석

아래는 원본 코드에 상세한 인라인 주석을 추가한 버전입니다.

```typescript
// ============================================
// 타입 임포트 섹션
// ============================================

// Framer Motion의 Presence 시스템 타입
// - PresenceContext: 컴포넌트의 존재 여부를 관리하는 컨텍스트
// - usePresence: 컴포넌트가 DOM에 있는지, 안전하게 제거할 수 있는지 판단하는 훅
import type {
  PresenceContext,
  usePresence as useFramerPresence,
} from "framer-motion";

import { useEffect, useMemo } from "react";

// React Native의 Transform 스타일 타입
import type { TransformsStyle } from "react-native";

// React Native Reanimated의 핵심 함수들
// - useAnimatedStyle: Animated 스타일을 생성하는 훅 (UI 스레드에서 실행)
// - useSharedValue: UI 스레드와 JS 스레드 간 공유되는 값
// - withDecay/withSpring/withTiming: 애니메이션 함수
// - withDelay: 애니메이션 지연
// - withRepeat: 애니메이션 반복
// - withSequence: 여러 애니메이션을 순차 실행
// - runOnJS: UI 스레드에서 JS 스레드의 함수를 호출
// - ReduceMotion: 접근성 설정 (시스템의 "모션 줄이기" 설정 반영)
import {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  runOnJS,
  ReduceMotion,
} from "react-native-reanimated";

// Reanimated 애니메이션 설정 타입들
import type {
  WithDecayConfig,
  WithSpringConfig,
  WithTimingConfig,
} from "react-native-reanimated";

import { PackageName } from "./constants/package-name";

// Moti의 타입 정의
import type {
  InlineOnDidAnimate, // 값에 포함된 onDidAnimate 콜백
  MotiProps, // useMotify 훅의 Props 타입
  MotiTransition, // 전환 설정
  SequenceItem, // 시퀀스 배열의 항목
  Transforms, // Transform 속성 타입
  TransitionConfig, // 개별 전환 설정
  WithTransition, // transition 속성을 포함한 타입
  SequenceItemObject, // 객체 형태의 시퀀스 항목
} from "./types";

// ============================================
// 유틸리티 함수들
// ============================================

/**
 * 디버그 로깅 함수 (Worklet)
 * - global.shouldDebugMoti가 true일 때만 로그 출력
 * - UI 스레드에서도 실행 가능 ('worklet' 지시어)
 */
const debug = (...args: any[]) => {
  "worklet"; // 이 함수가 UI 스레드에서 실행될 수 있음을 표시

  // @ts-ignore - global 객체에 동적으로 추가된 속성이므로 타입 무시
  if (!global.shouldDebugMoti) {
    return; // 디버그 모드가 아니면 조기 반환
  }

  // 실제로는 사용하지 않지만 최적화로 제거되는 것을 방지
  if (args) {
    // hi
  }

  console.log("[moti]", ...args);
};

/**
 * 색상 속성 판별 함수 (Worklet)
 * - 색상 관련 스타일 키인지 확인
 * - 색상은 일반적으로 timing 애니메이션 사용 (spring보다 자연스러움)
 *
 * @param styleKey - 스타일 속성 이름
 * @returns 색상 속성이면 true
 */
const isColor = (styleKey: string) => {
  "worklet";

  // 색상 관련 속성들을 객체로 정의 (빠른 조회를 위해)
  const keys = {
    backgroundColor: true,
    borderBottomColor: true,
    borderLeftColor: true,
    borderRightColor: true,
    borderTopColor: true,
    color: true,
    shadowColor: true,
    borderColor: true,
    borderEndColor: true,
    borderStartColor: true,
  };

  // Boolean()로 undefined를 false로 변환
  return Boolean(keys[styleKey]);
};

/**
 * Transform 속성 판별 함수 (Worklet)
 * - React Native에서 transform 배열에 들어가야 하는 속성인지 확인
 *
 * @param styleKey - 스타일 속성 이름
 * @returns Transform 속성이면 true
 */
const isTransform = (styleKey: string) => {
  "worklet";

  // Record<keyof Transforms, true>로 명시적 타입 지정
  const transforms: Record<keyof Transforms, true> = {
    perspective: true,
    rotate: true,
    rotateX: true,
    rotateY: true,
    rotateZ: true,
    scale: true,
    scaleX: true,
    scaleY: true,
    translateX: true,
    translateY: true,
    skewX: true,
    skewY: true,
  };

  return Boolean(transforms[styleKey]);
};

/**
 * 애니메이션 지연 시간 계산 함수 (Worklet)
 *
 * 우선순위:
 * 1. transition[key].delay (특정 속성의 지연)
 * 2. transition.delay (전역 지연)
 * 3. defaultDelay (훅에 전달된 기본 지연)
 *
 * @param _key - 스타일 속성 이름
 * @param transition - 전환 설정 객체
 * @param defaultDelay - 기본 지연 시간
 * @returns { delayMs } 객체
 */
function animationDelay<Animate>(
  _key: string,
  transition: MotiTransition<Animate> | undefined,
  defaultDelay?: number
) {
  "worklet";

  // _key를 Animate의 키로 타입 단언
  const key = _key as keyof Animate;

  // 기본값으로 시작
  let delayMs: TransitionConfig["delay"] = defaultDelay;

  // 1순위: 특정 키에 대한 delay
  if (transition?.[key]?.delay != null) {
    delayMs = transition?.[key]?.delay;
  }
  // 2순위: 전역 delay
  else if (transition?.delay != null) {
    delayMs = transition.delay;
  }

  return { delayMs };
}

/**
 * Spring 애니메이션 설정 키 목록
 * - 이 키들이 transition 객체에 있으면 spring 설정에 포함
 */
const withSpringConfigKeys: (keyof WithSpringConfig)[] = [
  "stiffness", // 강성 (높을수록 빠르게 반응)
  "overshootClamping", // 오버슈트 제한 (목표값 초과 방지)
  "restDisplacementThreshold", // 정지 판정 변위 임계값
  "restSpeedThreshold", // 정지 판정 속도 임계값
  "velocity", // 초기 속도
  "reduceMotion", // 모션 줄이기 설정
  "mass", // 질량 (높을수록 느림)
  "damping", // 감쇠 (높을수록 빨리 멈춤)
  "duration", // 지속 시간
  "dampingRatio", // 감쇠 비율
];

/**
 * 애니메이션 설정 계산 함수 (Worklet)
 *
 * 이 함수는 특정 스타일 속성에 대한 완전한 애니메이션 설정을 계산합니다.
 *
 * 처리 과정:
 * 1. 애니메이션 타입 결정 (spring/timing/decay/no-animation)
 * 2. 반복 설정 계산 (repeat, loop, repeatReverse)
 * 3. 타입별 config 객체 구성
 *
 * @param styleProp - 스타일 속성 이름
 * @param transition - 전환 설정 객체
 * @returns 애니메이션 함수, 설정, 반복 여부 등
 */
function animationConfig<Animate>(
  styleProp: string,
  transition: MotiTransition<Animate> | undefined
) {
  "worklet";

  // styleProp을 Animate 타입의 키로 변환
  const key = styleProp as Extract<keyof Animate, string>;

  // 반복 관련 변수 초기화
  let repeatCount = 0; // 0 = 반복 없음, -1 = 무한 반복, n = n회 반복
  let repeatReverse = true; // 반복 시 역방향으로도 재생할지 여부

  // 기본 애니메이션 타입: spring
  // Spring은 물리 기반 애니메이션으로 자연스러운 움직임 제공
  let animationType: Required<TransitionConfig>["type"] = "spring";

  // 색상과 opacity는 timing 애니메이션이 더 자연스러움
  // (Spring은 색상 보간에 적합하지 않음)
  if (isColor(key) || key === "opacity") {
    animationType = "timing";
  }

  // 이 스타일 속성에 대한 특정 전환 설정 추출
  const styleSpecificTransition = transition?.[key as any];

  // 애니메이션 타입 우선순위 결정
  // 1순위: transition.width.type (특정 속성의 타입)
  if (styleSpecificTransition?.type) {
    animationType = styleSpecificTransition.type;
  }
  // 2순위: transition.type (전역 타입)
  else if (transition?.type) {
    animationType = transition.type;
  }
  // 3순위: 위에서 설정한 기본값 사용

  // loop 설정 처리 (boolean)
  const loop = styleSpecificTransition?.loop ?? transition?.loop;
  if (loop != null) {
    // loop가 true면 무한 반복(-1), false면 반복 없음(0)
    repeatCount = loop ? -1 : 0;
  }

  // repeat 설정 처리 (숫자로 명시적 반복 횟수 지정)
  // repeat가 설정되면 loop보다 우선
  if (styleSpecificTransition?.repeat != null) {
    repeatCount = styleSpecificTransition?.repeat;
  } else if (transition?.repeat != null) {
    repeatCount = transition.repeat;
  }

  // repeatReverse 설정 (요요 효과 여부)
  if (styleSpecificTransition?.repeatReverse != null) {
    repeatReverse = styleSpecificTransition.repeatReverse;
  } else if (transition?.repeatReverse != null) {
    repeatReverse = transition.repeatReverse;
  }

  // 설정 객체 초기화
  let config = {};

  // 접근성: 시스템의 "모션 줄이기" 설정 사용
  let reduceMotion = ReduceMotion.System;

  // 애니메이션 함수 초기화 (나중에 실제 함수로 교체)
  let animation = (...props: any): any => props;

  // ============================================
  // 타입별 설정 구성
  // ============================================

  if (animationType === "timing") {
    // Timing 애니메이션: 선형 또는 easing 기반

    // duration 추출 (특정 속성 → 전역 순서)
    const duration =
      (transition?.[key] as WithTimingConfig | undefined)?.duration ??
      (transition as WithTimingConfig | undefined)?.duration;

    // easing 함수 추출 (예: Easing.bezier(...))
    const easing =
      (transition?.[key] as WithTimingConfig | undefined)?.easing ??
      (transition as WithTimingConfig | undefined)?.easing;

    // reduceMotion 설정 추출
    const timingReduceMotion =
      (transition?.[key] as WithTimingConfig | undefined)?.reduceMotion ??
      (transition as WithTimingConfig | undefined)?.reduceMotion;

    // config 객체에 존재하는 속성만 추가
    if (easing) {
      config["easing"] = easing;
    }
    if (duration != null) {
      config["duration"] = duration;
    }
    if (reduceMotion) {
      reduceMotion = timingReduceMotion ?? reduceMotion;
      config["reduceMotion"] = reduceMotion;
    }

    // withTiming 함수 사용
    animation = withTiming;
  } else if (animationType === "spring") {
    // Spring 애니메이션: 물리 기반 (질량, 강성, 감쇠)

    animation = withSpring;
    config = {} as WithSpringConfig;

    // Spring 설정 키들을 순회하며 config 구성
    for (const configKey of withSpringConfigKeys) {
      // 특정 속성에 대한 설정 (예: transition.width.stiffness)
      const styleSpecificConfig = transition?.[key]?.[configKey];

      // 전역 설정 (예: transition.stiffness)
      const transitionConfigForKey = transition?.[configKey];

      // reduceMotion은 별도로 저장
      if (configKey === "reduceMotion") {
        reduceMotion = transitionConfigForKey || styleSpecificConfig;
      }

      // 우선순위: 특정 속성 설정 → 전역 설정
      if (styleSpecificConfig != null) {
        config[configKey] = styleSpecificConfig;
      } else if (transitionConfigForKey != null) {
        config[configKey] = transitionConfigForKey;
      }
    }
  } else if (animationType === "decay") {
    // Decay 애니메이션: 관성 기반 (서서히 감속)
    // 주로 스크롤, 드래그 제스처에 사용

    animation = withDecay;
    config = {};

    // Decay 설정 키 목록
    const configKeys: (keyof WithDecayConfig)[] = [
      "clamp", // 값 범위 제한
      "velocity", // 초기 속도
      "deceleration", // 감속률
      "velocityFactor", // 속도 배율 (중복, 아마 오타)
      "reduceMotion",
      "velocityFactor", // 중복
    ];

    // Spring과 동일한 방식으로 설정 구성
    for (const configKey of configKeys) {
      const styleSpecificConfig = transition?.[key]?.[configKey];
      const transitionConfigForKey = transition?.[configKey];

      if (configKey === "reduceMotion") {
        reduceMotion = transitionConfigForKey || styleSpecificConfig;
      }

      if (styleSpecificConfig != null) {
        config[configKey] = styleSpecificConfig;
      } else if (transitionConfigForKey != null) {
        config[configKey] = transitionConfigForKey;
      }
    }
  } else if (animationType === "no-animation") {
    // 애니메이션 없이 즉시 값 변경
    animation = (value) => value;
    config = {};
    repeatCount = 0; // 반복 불가
  }

  // 최종 설정 반환
  return {
    animation, // withTiming/withSpring/withDecay 함수
    config, // 해당 애니메이션의 설정 객체
    reduceMotion, // 접근성 설정
    repeatReverse, // 역방향 반복 여부
    repeatCount, // 반복 횟수
    shouldRepeat: !!repeatCount, // 반복 필요 여부 (boolean)
  };
}

/**
 * 시퀀스 배열 생성 함수 (Worklet)
 *
 * 배열 형태의 애니메이션 값을 순차적으로 실행할 수 있는 형태로 변환
 * 예: opacity: [0, 1, 0.5] → withTiming(0) → withTiming(1) → withTiming(0.5)
 *
 * @param sequenceKey - 스타일 속성 이름
 * @param sequenceArray - 값의 배열 또는 설정 객체 배열
 * @param delayMs - 기본 지연 시간
 * @param config - 기본 애니메이션 설정
 * @param animation - 애니메이션 함수
 * @param callback - 각 단계 완료 시 호출될 콜백
 * @returns Reanimated의 withDelay/withTiming 등으로 구성된 배열
 */
const getSequenceArray = (
  sequenceKey: string,
  sequenceArray: SequenceItem<any>[],
  delayMs: number | undefined,
  config: object,
  animation: (...props: any) => any,
  callback: (
    completed: boolean | undefined,
    value: any | undefined,
    info: {
      attemptedSequenceValue: any;
    }
  ) => void
) => {
  "worklet";

  const sequence: any[] = [];

  // 배열의 각 단계를 순회
  for (const step of sequenceArray) {
    // 유효한 값인지 확인
    // null, undefined, false는 건너뜀
    const shouldPush =
      typeof step === "object"
        ? step && step?.value != null && step?.value !== false
        : step != null && step !== false;

    // 이 단계의 onDidAnimate 콜백 (객체 형태인 경우만)
    let stepOnDidAnimate: SequenceItemObject<any>["onDidAnimate"];

    if (shouldPush) {
      // 단계별 설정 초기화 (기본값으로 시작)
      let stepDelay = delayMs;
      let stepValue = step;
      let stepReduceMotion = ReduceMotion.System;
      let stepConfig = Object.assign({}, config); // 얕은 복사
      let stepAnimation = animation as
        | typeof withTiming
        | typeof withSpring
        | typeof withDecay;

      // step이 객체인 경우: { value: 100, delay: 200, type: 'spring', ... }
      if (typeof step === "object") {
        // Reanimated에서는 객체 구조 분해 사용 불가 (Hermes 엔진 제약)
        // 대신 수동으로 프로퍼티 추출

        // transition 속성만 추출 (value, delay 제외)
        const stepTransition = Object.assign({}, step);
        delete stepTransition.delay;
        delete stepTransition.value;

        // 이 단계만의 애니메이션 설정 계산
        const {
          config: inlineStepConfig,
          animation,
          reduceMotion,
        } = animationConfig(sequenceKey, stepTransition);

        // 기본 config에 단계별 config 병합
        stepConfig = Object.assign({}, stepConfig, inlineStepConfig);
        stepAnimation = animation;
        stepReduceMotion = reduceMotion;

        // 단계별 지연 시간
        if (step.delay != null) {
          stepDelay = step.delay;
        }

        // 실제 애니메이션할 값
        stepValue = step.value;

        // 단계별 onDidAnimate 콜백
        stepOnDidAnimate = step.onDidAnimate;
      }

      // 애니메이션 값 생성 (with 콜백)
      const sequenceValue = stepAnimation(
        stepValue,
        stepConfig as any,
        (completed = false, maybeValue) => {
          "worklet";

          // 전체 시퀀스의 콜백 호출
          callback(completed, maybeValue, {
            attemptedSequenceValue: stepValue,
          });

          // 단계별 콜백이 있으면 호출 (JS 스레드에서)
          if (stepOnDidAnimate) {
            runOnJS(stepOnDidAnimate)(completed, maybeValue, {
              attemptedSequenceItemValue: stepValue,
              attemptedSequenceArray: maybeValue,
            });
          }
        }
      );

      // 지연이 있으면 withDelay로 래핑
      if (stepDelay != null) {
        sequence.push(withDelay(stepDelay, sequenceValue, stepReduceMotion));
      } else {
        sequence.push(sequenceValue);
      }
    }
  }

  return sequence;
};

// ============================================
// 메인 훅: useMotify
// ============================================

/**
 * useMotify: Moti의 핵심 훅
 *
 * Props를 받아서 Reanimated의 animated style을 생성합니다.
 * Framer Motion과 유사한 선언적 API를 제공합니다.
 *
 * @template Animate - 애니메이션할 스타일 타입
 */
export function useMotify<Animate>({
  animate: animateProp, // 목표 스타일 상태
  from: fromProp = false, // 초기 스타일 상태
  transition: transitionProp, // 애니메이션 전환 설정
  exitTransition: exitTransitionProp, // Exit 시 전환 설정
  delay: defaultDelay, // 기본 지연 시간
  state, // 외부 variant 상태 (SharedValue)
  stylePriority = "animate", // 스타일 병합 우선순위
  onDidAnimate, // 애니메이션 완료 콜백
  exit: exitProp, // Exit 스타일
  animateInitialState = false, // 초기 마운트 시에도 애니메이션 실행 여부
  usePresenceValue, // usePresence 훅의 반환값
  presenceContext, // Framer Motion의 PresenceContext
}: MotiProps<Animate> & {
  presenceContext?: Pick<
    NonNullable<React.ContextType<typeof PresenceContext>>,
    "custom" | "initial"
  > | null;
  usePresenceValue?: ReturnType<typeof useFramerPresence>;
}) {
  // ============================================
  // 1단계: 초기화
  // ============================================

  // 마운트 여부 추적 (UI 스레드와 공유)
  // false → 초기 렌더링 (from 스타일 사용)
  // true → 이후 렌더링 (animate 스타일로 전환)
  const isMounted = useSharedValue(false);

  // Presence 시스템 값 추출
  // isPresent: 컴포넌트가 존재하는지 (false면 언마운트 중)
  // safeToUnmount: 애니메이션 완료 후 호출하여 실제 DOM 제거 허용
  const [isPresent, safeToUnmount] = usePresenceValue ?? [];

  // 초기 애니메이션 비활성화 여부
  // presenceContext.initial === false면 첫 마운트 시 애니메이션 건너뜀
  // animateInitialState === true면 강제로 초기 애니메이션 실행
  const disableInitialAnimation =
    presenceContext?.initial === false && !animateInitialState;

  // ============================================
  // Worklet에서 사용할 함수들 메모이제이션
  // ============================================

  // useMemo로 함수들을 캡처하여 의존성 변경 시에만 재생성
  const { custom, reanimatedSafeToUnmount, reanimatedOnDidAnimate } = useMemo(
    () => ({
      // custom 값 반환 함수 (Worklet에서 사용)
      // presenceContext.custom은 AnimatePresence의 custom prop
      custom: () => {
        "worklet";
        return presenceContext?.custom;
      },

      // safeToUnmount을 Worklet이 아닌 일반 함수로 래핑
      // (runOnJS를 통해 호출하기 위함)
      reanimatedSafeToUnmount: () => {
        safeToUnmount?.();
      },

      // onDidAnimate 콜백 래핑
      reanimatedOnDidAnimate: (
        ...args: Parameters<NonNullable<typeof onDidAnimate>>
      ) => {
        onDidAnimate?.(...args);
      },
    }),
    [onDidAnimate, presenceContext, safeToUnmount]
  );

  // Exit 스타일이 있는지 확인
  // - 함수 형태 또는 비어있지 않은 객체
  const hasExitStyle = Boolean(
    typeof exitProp === "function" ||
      (typeof exitProp === "object" &&
        exitProp &&
        Object.keys(exitProp).length > 0)
  );

  // ============================================
  // 2단계: useAnimatedStyle - 핵심 로직
  // ============================================

  const style = useAnimatedStyle(() => {
    // 최종 반환할 스타일 객체
    const final = {
      // transform 배열 초기화 (Reanimated의 버그 회피용)
      transform: [] as TransformsStyle["transform"],
    };

    // ============================================
    // 2-1: 스타일 소스 추출
    // ============================================

    // variant 상태 (외부에서 제어되는 SharedValue)
    const variantStyle: Animate & WithTransition = state?.__state?.value || {};

    // animate prop 처리 (SharedValue 또는 일반 객체)
    let animateStyle: Animate;
    if (animateProp && "value" in animateProp) {
      // SharedValue인 경우 .value로 접근
      animateStyle = (animateProp.value || {}) as Animate;
    } else {
      // 일반 객체
      animateStyle = (animateProp || {}) as Animate;
    }

    debug("style", animateStyle);

    // 초기 스타일
    const initialStyle = fromProp || {};

    // Exit 스타일 (함수인 경우 custom 값을 인자로 호출)
    let exitStyle = exitProp || {};
    if (typeof exitStyle === "function") {
      exitStyle = exitStyle(custom());
    }

    // 현재 Exit 중인지 확인
    const isExiting = !isPresent && hasExitStyle;

    // ============================================
    // 2-2: 스타일 병합 우선순위 결정
    // ============================================

    let mergedStyles: Animate = {} as Animate;

    // stylePriority에 따라 병합 순서 결정
    if (stylePriority === "state") {
      // state가 animate보다 우선
      mergedStyles = Object.assign({}, animateStyle, variantStyle);
    } else {
      // animate가 state보다 우선 (기본값)
      mergedStyles = Object.assign({}, variantStyle, animateStyle);
    }

    // 초기 마운트 시 from 스타일 사용
    if (
      !isMounted.value && // 아직 마운트되지 않음
      !disableInitialAnimation && // 초기 애니메이션 비활성화 안됨
      Object.keys(initialStyle).length // from prop이 존재함
    ) {
      // from 스타일만 사용 (애니메이션 시작점)
      mergedStyles = initialStyle as Animate;
    } else {
      // from을 기본값으로, 위의 병합된 스타일로 덮어씀
      mergedStyles = Object.assign({}, initialStyle, mergedStyles);
    }

    // Exit 중이면 exit 스타일 사용
    if (isExiting && exitStyle) {
      mergedStyles = Object.assign({}, exitStyle) as any;
    }

    // ============================================
    // Exit 애니메이션 추적 시스템 초기화
    // ============================================

    // 각 Exit 스타일 속성이 애니메이션 완료되었는지 추적
    const exitingStyleProps: Record<string, boolean> = {};

    // Exit 애니메이션에서 제외할 속성들 (애니메이션 불필요)
    const disabledExitStyles = new Set([
      "position",
      "zIndex",
      "borderTopStyle",
      "borderBottomStyle",
      "borderLeftStyle",
      "borderRightStyle",
      "borderStyle",
      "pointerEvents",
      "outline",
    ]);

    // Exit 스타일의 각 키를 true로 초기화 (애니메이션 대기 중)
    Object.keys(exitStyle || {}).forEach((key) => {
      if (!disabledExitStyles.has(key)) {
        exitingStyleProps[key] = true;
      }
    });

    // ============================================
    // 2-3: Transition 설정 병합
    // ============================================

    // transitionProp 처리 (SharedValue 또는 일반 객체)
    let transition: MotiTransition<Animate> | undefined;
    if (transitionProp && "value" in transitionProp) {
      transition = transitionProp.value;
    } else {
      transition = transitionProp;
    }

    // variant 스타일에 transition이 있으면 병합
    if (variantStyle.transition) {
      transition = Object.assign({}, transition, variantStyle.transition);
    }

    // Exit 중이면 exitTransition 사용
    if (isExiting && exitTransitionProp) {
      let exitTransition: MotiTransition<Animate> | undefined;

      if (exitTransitionProp && "value" in exitTransitionProp) {
        // SharedValue
        exitTransition = exitTransitionProp.value;
      } else if (typeof exitTransitionProp == "function") {
        // 함수 (custom 값 전달)
        exitTransition = exitTransitionProp(custom());
      } else {
        // 일반 객체
        exitTransition = exitTransitionProp;
      }

      // 기존 transition에 exitTransition 병합
      transition = Object.assign({}, transition, exitTransition);
    }

    // ============================================
    // 2-4: 스타일 키별 애니메이션 적용
    // ============================================

    // Hermes 엔진 호환성을 위해 forEach 사용
    // (for...in은 일부 환경에서 문제 발생)
    // https://github.com/nandorojo/moti/issues/214#issuecomment-1399055535
    Object.keys(mergedStyles as any).forEach((key) => {
      let value = mergedStyles[key];

      // 인라인 onDidAnimate 콜백 추출
      // 값이 { value: 100, onDidAnimate: () => {} } 형태인 경우
      let inlineOnDidAnimate: InlineOnDidAnimate<any> | undefined;
      if (typeof value === "object" && value && "onDidAnimate" in value) {
        inlineOnDidAnimate = value.onDidAnimate;
        value = value.value; // 실제 값 추출
      }

      // 이 속성의 애니메이션 설정 계산
      const {
        animation, // withTiming/withSpring/withDecay
        config, // duration, easing 등
        reduceMotion, // 접근성 설정
        shouldRepeat, // 반복 필요 여부
        repeatCount, // 반복 횟수
        repeatReverse, // 요요 효과
      } = animationConfig(key, transition);

      // ============================================
      // 애니메이션 완료 콜백 정의
      // ============================================

      const callback: (
        completed: boolean | undefined,
        value: any | undefined,
        info?: {
          attemptedSequenceValue?: any;
          transformKey?: string;
        }
      ) => void = (completed = false, recentValue, info) => {
        // 사용자 onDidAnimate 콜백 호출 (JS 스레드)
        if (onDidAnimate) {
          runOnJS(reanimatedOnDidAnimate as any)(
            key as any,
            completed,
            recentValue,
            {
              attemptedValue: value,
              attemptedSequenceItemValue: info?.attemptedSequenceValue,
            }
          );
        }

        // 인라인 콜백 호출 (JS 스레드)
        if (inlineOnDidAnimate) {
          runOnJS(inlineOnDidAnimate)(completed, recentValue, {
            attemptedValue: value,
          });
        }

        // Exit 애니메이션 추적
        if (isExiting) {
          // 이 속성의 애니메이션 완료 표시
          exitingStyleProps[key] = false;

          // 모든 Exit 속성이 완료되었는지 확인
          const areStylesExiting =
            Object.values(exitingStyleProps).some(Boolean);

          // 모두 완료되면 DOM에서 제거 허용
          if (!areStylesExiting) {
            runOnJS(reanimatedSafeToUnmount)();
          }
        }
      };

      // 지연 시간 계산
      let { delayMs } = animationDelay(key, transition, defaultDelay);

      // ============================================
      // 값 검증
      // ============================================

      // null 또는 false 값은 건너뜀
      // 이를 통해 조건부 애니메이션 가능: { opacity: loading && 1 }
      if (value == null || value === false) {
        return; // 이 속성 건너뛰기
      }

      // ============================================
      // CASE 1: transform 속성 (특별 처리)
      // ============================================

      if (key === "transform") {
        // transform은 항상 배열이어야 함
        if (!Array.isArray(value)) {
          console.error(
            `[${PackageName}]: Invalid transform value. Needs to be an array.`
          );
        } else {
          // transform 배열의 각 객체 처리
          // 예: [{ translateX: 100 }, { scale: 1.5 }]
          value.forEach((transformObject) => {
            final["transform"] = final["transform"] || [];

            // transform 객체의 키 (translateX, scale 등)
            const transformKey = Object.keys(transformObject)[0];
            // transform 객체의 값
            const transformValue = transformObject[transformKey];

            const transform = {} as any;

            // ----------------------------------------
            // CASE 1-A: Transform 시퀀스
            // ----------------------------------------
            if (Array.isArray(transformValue)) {
              // 예: { translateX: [0, 100, 50] }

              const sequence = getSequenceArray(
                transformKey,
                transformValue,
                delayMs,
                config,
                animation,
                callback
              );

              if (sequence.length) {
                // withSequence로 순차 실행
                let finalValue = withSequence(
                  sequence[0],
                  ...sequence.slice(1)
                );

                // 반복 필요 시 withRepeat으로 래핑
                if (shouldRepeat) {
                  finalValue = withRepeat(
                    finalValue,
                    repeatCount,
                    repeatReverse,
                    callback,
                    reduceMotion
                  );
                }

                transform[transformKey] = finalValue;
              }
            }
            // ----------------------------------------
            // CASE 1-B: Transform 단일 값
            // ----------------------------------------
            else {
              // 이 transform의 delay 확인
              if (transition?.[transformKey]?.delay != null) {
                delayMs = transition?.[transformKey]?.delay;
              }

              // 설정 키 결정
              // transition.translateX가 없으면 transition.transform 사용
              let configKey = transformKey;
              if (
                transition &&
                "transform" in transition &&
                !(configKey in transition)
              ) {
                configKey = "transform";
              }

              // 이 transform의 애니메이션 설정 계산
              const {
                animation,
                config,
                shouldRepeat,
                repeatCount,
                repeatReverse,
              } = animationConfig(configKey, transition);

              // 애니메이션 적용
              let finalValue = animation(transformValue, config, callback);

              // 반복 처리
              if (shouldRepeat) {
                finalValue = withRepeat(
                  finalValue,
                  repeatCount,
                  repeatReverse,
                  undefined,
                  reduceMotion
                );
              }

              // 지연 처리
              if (delayMs != null) {
                transform[transformKey] = withDelay(
                  delayMs,
                  finalValue,
                  reduceMotion
                );
              } else {
                transform[transformKey] = finalValue;
              }
            }

            // transform 객체를 배열에 추가
            if (
              Object.keys(transform).length &&
              Array.isArray(final["transform"])
            ) {
              final["transform"].push(transform);
            }
          });
        }
      }
      // ============================================
      // CASE 2: 배열 값 (시퀀스 애니메이션)
      // ============================================
      else if (Array.isArray(value)) {
        // 예: opacity: [0, 1, 0.5]

        const sequence = getSequenceArray(
          key,
          value,
          delayMs,
          config,
          animation,
          callback
        );

        // withSequence로 순차 실행
        let finalValue = withSequence(...sequence);

        // 반복 처리
        if (shouldRepeat) {
          finalValue = withRepeat(
            finalValue,
            repeatCount,
            repeatReverse,
            undefined,
            reduceMotion
          );
        }

        // ----------------------------------------
        // CASE 2-A: Transform 속성의 시퀀스
        // ----------------------------------------
        if (isTransform(key)) {
          // 예: translateX: [0, 100, 50]
          final["transform"] = final["transform"] || [];

          if (sequence.length) {
            const transform = {};
            transform[key] = finalValue;
            // @ts-expect-error transform had the wrong type
            final["transform"].push(transform);
          }
        }
        // ----------------------------------------
        // CASE 2-B: 일반 속성의 시퀀스
        // ----------------------------------------
        else {
          // 예: opacity: [0, 1, 0.5]
          if (sequence.length) {
            final[key] = finalValue;
          }
        }
      }
      // ============================================
      // CASE 3: Transform 속성 (단일 값)
      // ============================================
      else if (isTransform(key)) {
        // 예: translateX: 100

        final["transform"] = final["transform"] || [];

        // 이 transform의 delay 확인
        if (transition?.[key]?.delay != null) {
          delayMs = transition?.[key]?.delay;
        }

        const transform = {};

        // 애니메이션 적용
        let finalValue = animation(value, config, callback);

        // 반복 처리
        if (shouldRepeat) {
          finalValue = withRepeat(
            finalValue,
            repeatCount,
            repeatReverse,
            undefined,
            reduceMotion
          );
        }

        // 지연 처리
        if (delayMs != null) {
          transform[key] = withDelay(delayMs, finalValue, reduceMotion);
        } else {
          transform[key] = finalValue;
        }

        // transform 배열에 추가
        // @ts-expect-error transform had the wrong type
        final["transform"].push(transform);
      }
      // ============================================
      // CASE 4: 객체 값 (그림자 등)
      // ============================================
      else if (typeof value === "object") {
        // 예: shadowOffset: { width: 10, height: 10 }

        final[key] = {};

        // 중첩 객체의 각 속성에 애니메이션 적용
        for (const innerStyleKey in value || {}) {
          let finalValue = animation(value, config, callback);

          // 반복 처리
          if (shouldRepeat) {
            finalValue = withRepeat(
              finalValue,
              repeatCount,
              repeatReverse,
              undefined,
              reduceMotion
            );
          }

          // 지연 처리
          if (delayMs != null) {
            final[key][innerStyleKey] = withDelay(
              delayMs,
              finalValue,
              reduceMotion
            );
          } else {
            final[key][innerStyleKey] = finalValue;
          }
        }
      }
      // ============================================
      // CASE 5: 일반 속성 (단일 값)
      // ============================================
      else {
        // 예: opacity: 1, width: 100

        // 애니메이션 적용
        let finalValue = animation(value, config, callback);

        // 반복 처리
        if (shouldRepeat) {
          finalValue = withRepeat(
            finalValue,
            repeatCount,
            repeatReverse,
            undefined,
            reduceMotion
          );
        }

        // 지연 처리
        if (delayMs != null && typeof delayMs === "number") {
          final[key] = withDelay(delayMs, finalValue, reduceMotion);
        } else {
          final[key] = finalValue;
        }
      }
    }); // forEach 종료

    // ============================================
    // 2-5: 최종 정리
    // ============================================

    // transform 배열이 비어있으면 삭제
    if (!final.transform?.length) {
      delete final.transform;
    }

    return final;

    // @ts-ignore complex union lol...
  }, [
    // useAnimatedStyle 의존성 배열
    // 이 값들이 변경되면 스타일 재계산
    animateProp,
    custom,
    defaultDelay,
    disableInitialAnimation,
    exitProp,
    exitTransitionProp,
    fromProp,
    hasExitStyle,
    isMounted,
    isPresent,
    onDidAnimate,
    reanimatedOnDidAnimate,
    reanimatedSafeToUnmount,
    state,
    stylePriority,
    transitionProp,
  ]);

  // ============================================
  // 3단계: useEffect - 마운트 후 정리
  // ============================================

  useEffect(
    function allowUnMountIfMissingExit() {
      // from prop이 있고 아직 마운트되지 않았으면
      if (fromProp && isMounted.value === false) {
        // 마운트 완료 표시
        // 다음 렌더링부터 animate 스타일로 전환됨
        isMounted.value = true;
      }

      // Exit 스타일 없이 언마운트되는 경우
      // 즉시 DOM 제거 허용
      if (!isPresent && !hasExitStyle) {
        reanimatedSafeToUnmount();
      }
    },
    [hasExitStyle, isPresent, reanimatedSafeToUnmount]
  );

  // ============================================
  // 최종 반환
  // ============================================

  return {
    style, // Reanimated Animated Style
  };
}
```

---

## 3. 주요 최적화 및 제약사항

### 3.1 Worklet 제약사항

1. **객체 구조 분해 불가**: Hermes 엔진에서 `const { a, b } = obj` 형태가 일부 제한됨
2. **외부 함수 접근 불가**: Worklet 내에서는 `runOnJS`를 통해서만 JS 함수 호출 가능
3. **디버깅 어려움**: UI 스레드에서 실행되므로 일반적인 디버거 사용 불가

### 3.2 성능 최적화

1. **useMemo로 함수 래핑**: 콜백 함수들이 매 렌더링마다 재생성되지 않도록 방지
2. **SharedValue 활용**: 값 변경 시 React 렌더링 트리거 없이 애니메이션만 실행
3. **useAnimatedStyle 의존성 관리**: 불필요한 재계산 방지

### 3.3 사용 시 주의사항

1. **Transform 순서**: 배열 순서대로 적용되므로 순서가 중요
2. **Exit 애니메이션**: `hasExitStyle`이 false면 즉시 언마운트됨
3. **초기 애니메이션**: `animateInitialState={true}`로 명시적 활성화 필요
4. **SharedValue vs 일반 값**: `{ value }` 형태로 구분하여 처리

---

## 4. 커스터마이징 가이드

### 4.1 새로운 애니메이션 타입 추가

`animationConfig` 함수에 새로운 분기 추가:

```typescript
else if (animationType === 'custom') {
  animation = withCustomAnimation
  config = { /* custom config */ }
}
```

### 4.2 추가 스타일 속성 처리

특정 속성에 대한 커스텀 로직이 필요하면 `Object.keys(mergedStyles).forEach` 내부에 분기 추가:

```typescript
if (key === "customProperty") {
  // 커스텀 처리 로직
}
```

### 4.3 콜백 확장

`callback` 함수 내부에 추가 로직 삽입 가능:

```typescript
const callback = (completed, recentValue, info) => {
  // 기존 로직

  // 커스텀 로직 추가
  if (completed && key === "opacity") {
    // opacity 애니메이션 완료 시 특별 처리
  }
};
```

---

## 5. 트러블슈팅

### 5.1 애니메이션이 실행되지 않을 때

1. `unistyles.ts` import 확인 (`import '@fleet-ui/core/unistyles'`)
2. `from` prop 설정 확인
3. `animateInitialState` 플래그 확인

### 5.2 Exit 애니메이션이 동작하지 않을 때

1. `AnimatePresence` 컴포넌트로 감싸져 있는지 확인
2. `exit` prop이 올바르게 설정되었는지 확인
3. `exitingStyleProps`에 제외된 속성인지 확인

### 5.3 성능 이슈

1. 불필요한 의존성으로 인한 재계산 확인
2. 복잡한 transform 체인 단순화
3. `shouldRepeat` 무한 반복 시 CPU 사용량 확인

---

이 해설서를 통해 `use-motify` 훅의 내부 동작을 완전히 이해하고,
프로젝트 요구사항에 맞게 커스터마이징할 수 있을 것입니다.
