# TabBar SharedValue 추적 Best Practices

React Native Reanimated에서 부모 컴포넌트의 `SharedValue`를 자식 컴포넌트에서 추적하고 사이드 이펙트를 발생시키는 최적의 패턴들을 정리합니다.

## 목차

1. [현재 구조 분석](#1-현재-구조-분석)
2. [핵심 패턴들](#2-핵심-패턴들)
3. [useDerivedValue vs useAnimatedReaction](#3-usederivedvalue-vs-useanimatedreaction)
4. [구체적인 구현 예시](#4-구체적인-구현-예시)
5. [성능 최적화](#5-성능-최적화)
6. [안티패턴 및 주의사항](#6-안티패턴-및-주의사항)

---

## 1. 현재 구조 분석

### TabBar.tsx (부모)
```typescript
const dragProgress = useSharedValue(selectedPage);
// ... 다른 SharedValues들

// 자식에게 전달
<TabBarItem
  dragProgress={dragProgress}  // SharedValue 전달
  textStyle={textStyle}        // useAnimatedStyle 결과 전달
  // ...
/>
```

### TabBarItem.tsx (자식)
```typescript
interface TabBarItemProps {
  index: number;
  dragProgress: SharedValue<number>;  // 부모의 SharedValue
  // ...
}

// 현재 구현: useAnimatedStyle에서 직접 읽기
const style = useAnimatedStyle(() => {
  return {
    opacity: interpolate(
      dragProgress.value,  // 부모 SharedValue 직접 접근
      [index - 1, index, index + 1],
      [0.7, 1, 0.7],
      'clamp',
    ),
  };
});

// Text 스타일에서 JS 스레드 값 사용 (문제 가능성)
<Animated.Text
  style={[styles.itemText(dragProgress.value === index)]}
/>
```

### 현재 구조의 문제점
1. **`dragProgress.value === index`를 JS 스레드에서 체크**: Animated.Text의 스타일이 매 렌더마다 재계산됨
2. **파생된 isActive 상태 없음**: 각 아이템이 활성 상태인지 판단하는 독립적인 값이 없음
3. **사이드 이펙트 없음**: 탭 활성화 시 추가 동작(햅틱, 로깅 등)을 트리거하기 어려움

---

## 2. 핵심 패턴들

### Pattern 1: useDerivedValue로 isActive 생성 ⭐️ **권장**

**언제 사용**: 활성 상태를 기반으로 **스타일만** 변경할 때

```typescript
import { useDerivedValue } from 'react-native-reanimated';

export function TabBarItem({ index, dragProgress, ... }: TabBarItemProps) {
  // dragProgress로부터 isActive 파생
  const isActive = useDerivedValue(() => {
    'worklet';
    // 정확한 인덱스 비교
    return Math.round(dragProgress.value) === index ? 1 : 0;
  }, [index]);

  // 부드러운 전환을 위한 interpolation 버전
  const activeProgress = useDerivedValue(() => {
    'worklet';
    return interpolate(
      dragProgress.value,
      [index - 1, index, index + 1],
      [0, 1, 0],
      'clamp'
    );
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.5 + activeProgress.value * 0.5,
      transform: [{ scale: 0.95 + activeProgress.value * 0.05 }],
    };
  });

  return <Animated.View style={animatedStyle}>...</Animated.View>;
}
```

**장점**:
- UI 스레드에서만 동작 (60fps 보장)
- 의존성이 명확함
- 메모이제이션 자동 처리

**단점**:
- 사이드 이펙트 트리거 불가

---

### Pattern 2: useAnimatedReaction으로 사이드 이펙트 ⭐️

**언제 사용**: 활성 상태 변경 시 **사이드 이펙트**(햅틱, 로깅, JS 콜백 등)가 필요할 때

```typescript
import { useAnimatedReaction, useDerivedValue } from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';
import * as Haptics from 'expo-haptics';

export function TabBarItem({ 
  index, 
  dragProgress, 
  onActivate,
  ...
}: TabBarItemProps) {
  
  const isActive = useDerivedValue(() => {
    return Math.round(dragProgress.value) === index;
  }, [index]);

  // 방법 1: JS 함수 호출 (햅틱, 로깅 등)
  useAnimatedReaction(
    () => isActive.value,
    (current, previous) => {
      if (current && !previous) {
        // 활성화될 때만
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        runOnJS(onActivate)(index);
      }
    },
    [index]
  );

  // 방법 2: UI 스레드 내 로직 (다른 SharedValue 업데이트)
  const localScale = useSharedValue(1);

  useAnimatedReaction(
    () => isActive.value,
    (current) => {
      // UI 스레드에서 애니메이션 트리거
      localScale.value = withSpring(current ? 1.05 : 1);
    }
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: localScale.value }],
  }));

  return <Animated.View style={animatedStyle}>...</Animated.View>;
}
```

**장점**:
- 상태 변화 시점을 정확히 감지
- JS 스레드 함수 호출 가능 (`runOnJS`)
- 다른 애니메이션 트리거 가능

**단점**:
- useDerivedValue보다 약간 더 복잡
- 과도하게 사용하면 성능 저하 가능

---

### Pattern 3: useAnimatedStyle에서 직접 계산

**언제 사용**: 간단한 스타일 변경만 필요하고 재사용이 없을 때

```typescript
export function TabBarItem({ index, dragProgress }: TabBarItemProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = Math.round(dragProgress.value) === index;
    
    return {
      opacity: isActive ? 1 : 0.6,
      backgroundColor: isActive 
        ? theme.colors.primary.solid 
        : 'transparent',
    };
  });

  return <Animated.View style={animatedStyle}>...</Animated.View>;
}
```

**장점**:
- 가장 간결함
- 추가 훅 불필요

**단점**:
- isActive 값을 다른 곳에서 재사용 불가
- 사이드 이펙트 트리거 불가

---

### Pattern 4: SharedValue를 여러 자식에서 공유

**언제 사용**: 한 자식의 상태를 다른 자식들에게 알려야 할 때

```typescript
// TabBar.tsx
export function TabBar({ items, ... }) {
  const dragProgress = useSharedValue(0);
  const activeIndex = useDerivedValue(() => Math.round(dragProgress.value));
  
  // 모든 자식에게 동일한 SharedValue 전달
  return items.map((item, i) => (
    <TabBarItem
      key={i}
      index={i}
      dragProgress={dragProgress}
      activeIndex={activeIndex}  // 추가 파생 값
    />
  ));
}

// TabBarItem.tsx
export function TabBarItem({ index, activeIndex }: TabBarItemProps) {
  const isActive = useDerivedValue(() => activeIndex.value === index);
  
  // ...
}
```

**장점**:
- 중앙 집중식 상태 관리
- 복잡한 계산을 부모에서 1번만 수행

**단점**:
- Props 증가
- 부모-자식 결합도 증가

---

## 3. useDerivedValue vs useAnimatedReaction

| 특성 | useDerivedValue | useAnimatedReaction |
|------|-----------------|---------------------|
| **목적** | 파생 값 생성 | 사이드 이펙트 실행 |
| **반환값** | SharedValue | void |
| **재렌더 트리거** | ❌ 없음 | ❌ 없음 |
| **useAnimatedStyle 사용** | ✅ 가능 | ❌ 불가능 |
| **runOnJS 호출** | ❌ 불가능 | ✅ 가능 |
| **다른 SharedValue 업데이트** | ❌ 안티패턴 | ✅ 가능 |
| **성능** | 더 빠름 (메모이제이션) | 약간 느림 (콜백 실행) |
| **사용 빈도** | 매우 높음 | 필요시에만 |

### 의사결정 트리

```
값이 필요한가?
├─ YES → useDerivedValue
│   ├─ 스타일에 사용? → useAnimatedStyle과 함께 사용
│   └─ 다른 계산에 사용? → 다른 useDerivedValue의 입력으로 사용
│
└─ NO, 사이드 이펙트만 필요 → useAnimatedReaction
    ├─ JS 함수 호출? → runOnJS 사용
    └─ 다른 애니메이션 트리거? → SharedValue 업데이트
```

---

## 4. 구체적인 구현 예시

### 예시 1: TabBarItem에 isActive 추가 (추천)

```typescript
// TabBarItem.tsx
import { useDerivedValue, useAnimatedStyle } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

interface TabBarItemProps {
  index: number;
  dragProgress: SharedValue<number>;
  item: string;
  size: TabBarSize;
  colorScheme: TabBarColorScheme;
  onPressItem: (index: number) => void;
  onItemLayout: (index: number, layout: { x: number; width: number }) => void;
  onTextLayout: (index: number, layout: { width: number }) => void;
}

export function TabBarItem({
  index,
  dragProgress,
  item,
  size,
  colorScheme,
  onPressItem,
  onItemLayout,
  onTextLayout,
}: TabBarItemProps) {
  
  styles.useVariants({ size, colorScheme });

  // ✅ Pattern 1: isActive 파생
  const isActive = useDerivedValue(() => {
    'worklet';
    // 반올림으로 정확한 활성 상태 판단
    return Math.round(dragProgress.value) === index;
  }, [index]);

  // ✅ Pattern 2: activeProgress로 부드러운 전환
  const activeProgress = useDerivedValue(() => {
    'worklet';
    return interpolate(
      dragProgress.value,
      [index - 1, index, index + 1],
      [0, 1, 0],
      'clamp'
    );
  }, [index]);

  // 아이템 opacity 애니메이션
  const itemStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.5 + activeProgress.value * 0.5,
    };
  });

  // 텍스트 스타일 (이제 isActive SharedValue 사용)
  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      fontWeight: isActive.value ? '700' : '600',
      // Unistyles의 variants는 정적이므로 동적 색상은 여기서
      color: isActive.value 
        ? theme.colors[colorScheme].solid
        : theme.colors.neutral.text_2,
    };
  });

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      runOnUI(onItemLayout)(index, e.nativeEvent.layout);
    },
    [index, onItemLayout],
  );

  const handleTextLayout = useCallback(
    (e: LayoutChangeEvent) => {
      runOnUI(onTextLayout)(index, e.nativeEvent.layout);
    },
    [index, onTextLayout],
  );

  return (
    <Animated.View style={{ flexGrow: 1 }} onLayout={handleLayout}>
      <Pressable
        testID={`selector-${index}`}
        style={styles.item}
        onPress={() => onPressItem(index)}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive.value }}
      >
        <Animated.View style={[styles.itemInner, itemStyle]}>
          <Animated.Text
            testID={item}
            style={[styles.itemText, textAnimatedStyle]}
            onLayout={handleTextLayout}
          >
            {item}
          </Animated.Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}
```

### 예시 2: 햅틱 피드백 추가

```typescript
export function TabBarItem({ index, dragProgress, ... }: TabBarItemProps) {
  const isActive = useDerivedValue(() => {
    return Math.round(dragProgress.value) === index;
  }, [index]);

  // ✅ 활성화될 때만 햅틱 피드백
  useAnimatedReaction(
    () => isActive.value,
    (current, previous) => {
      if (current && !previous) {
        // 0 → 1 전환 시에만 실행
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
      }
    },
    [index]
  );

  // ... rest
}
```

### 예시 3: 탭 변경 분석 로깅

```typescript
export function TabBarItem({ 
  index, 
  dragProgress, 
  item,
  onTabActivate,
  ...
}: TabBarItemProps) {
  
  const isActive = useDerivedValue(() => {
    return Math.round(dragProgress.value) === index;
  }, [index]);

  // ✅ 분석 이벤트 전송
  useAnimatedReaction(
    () => isActive.value,
    (current, previous) => {
      if (current && !previous) {
        runOnJS(onTabActivate)({
          index,
          label: item,
          timestamp: Date.now(),
        });
      }
    },
    [index, item]
  );

  // ...
}
```

### 예시 4: Indicator 동기화 개선

```typescript
// TabBar.tsx
export function TabBar({ ... }) {
  const dragProgress = useSharedValue(selectedPage);
  
  // ✅ 활성 인덱스 파생 (모든 자식이 공유)
  const activeIndex = useDerivedValue(() => {
    return Math.round(dragProgress.value);
  });

  // Indicator 스타일
  const indicatorStyle = useAnimatedStyle(() => {
    const layoutsValue = layouts.value;
    
    if (layoutsValue.length !== itemsLength) {
      return { opacity: 0 };
    }

    // activeIndex 활용 가능
    const currentIndex = activeIndex.value;
    const currentLayout = layoutsValue[currentIndex];

    return {
      opacity: 1,
      left: interpolate(
        dragProgress.value,
        layoutsValue.map((_, i) => i),
        layoutsValue.map((l) => l.x),
      ),
      width: interpolate(
        dragProgress.value,
        layoutsValue.map((_, i) => i),
        layoutsValue.map((l) => l.width),
      ),
    };
  });

  return (
    <Animated.View>
      {/* ... */}
      {items.map((item, i) => (
        <TabBarItem
          key={i}
          index={i}
          dragProgress={dragProgress}
          activeIndex={activeIndex}  // 추가 전달
          // ...
        />
      ))}
    </Animated.View>
  );
}
```

---

## 5. 성능 최적화

### Tip 1: 의존성 배열을 정확히 지정

```typescript
// ❌ 나쁨: 매번 재생성
const isActive = useDerivedValue(() => {
  return Math.round(dragProgress.value) === index;
});

// ✅ 좋음: index 변경 시에만 재생성
const isActive = useDerivedValue(() => {
  return Math.round(dragProgress.value) === index;
}, [index]);
```

### Tip 2: 불필요한 useAnimatedReaction 피하기

```typescript
// ❌ 나쁨: 매 프레임마다 실행
useAnimatedReaction(
  () => dragProgress.value,
  (current) => {
    // 너무 자주 실행됨
    console.log(current);
  }
);

// ✅ 좋음: 활성 상태 변경 시만 실행
useAnimatedReaction(
  () => Math.round(dragProgress.value) === index,
  (isActive, wasActive) => {
    if (isActive !== wasActive) {
      // 상태 변화 시에만 실행
      runOnJS(console.log)('Active changed:', isActive);
    }
  }
);
```

### Tip 3: 복잡한 계산은 useDerivedValue로 메모이제이션

```typescript
// ❌ 나쁨: 매 스타일 계산마다 복잡한 로직 실행
const animatedStyle = useAnimatedStyle(() => {
  const distance = Math.abs(dragProgress.value - index);
  const scale = distance < 1 ? 1 - distance * 0.1 : 0.9;
  const opacity = distance < 2 ? 1 - distance * 0.2 : 0.6;
  
  return { transform: [{ scale }], opacity };
});

// ✅ 좋음: 중간 값을 메모이제이션
const distance = useDerivedValue(() => {
  return Math.abs(dragProgress.value - index);
}, [index]);

const animatedStyle = useAnimatedStyle(() => {
  const dist = distance.value;
  return {
    transform: [{ scale: dist < 1 ? 1 - dist * 0.1 : 0.9 }],
    opacity: dist < 2 ? 1 - dist * 0.2 : 0.6,
  };
});
```

### Tip 4: runOnJS 호출 최소화

```typescript
// ❌ 나쁨: 매번 runOnJS로 함수 실행
useAnimatedReaction(
  () => isActive.value,
  (current) => {
    runOnJS(doSomething1)();
    runOnJS(doSomething2)();
    runOnJS(doSomething3)();
  }
);

// ✅ 좋음: 하나의 함수로 묶어서 실행
const handleActivation = useCallback(() => {
  doSomething1();
  doSomething2();
  doSomething3();
}, []);

useAnimatedReaction(
  () => isActive.value,
  (current, previous) => {
    if (current && !previous) {
      runOnJS(handleActivation)();
    }
  }
);
```

---

## 6. 안티패턴 및 주의사항

### ❌ 안티패턴 1: JS 스레드에서 .value 직접 읽기

```typescript
// ❌ 매우 나쁨: 컴포넌트 렌더마다 실행
export function TabBarItem({ dragProgress, index }) {
  const isActive = dragProgress.value === index;  // 🚨 재렌더 안됨!
  
  return (
    <View style={{ opacity: isActive ? 1 : 0.5 }}>
      <Text>{isActive ? 'Active' : 'Inactive'}</Text>
    </View>
  );
}

// ✅ 올바름: useDerivedValue 또는 useAnimatedStyle
export function TabBarItem({ dragProgress, index }) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: dragProgress.value === index ? 1 : 0.5,
  }));
  
  return <Animated.View style={animatedStyle}>...</Animated.View>;
}
```

**이유**: `dragProgress.value`는 SharedValue의 현재 값을 읽지만, React의 상태가 아니므로 재렌더를 트리거하지 않습니다.

---

### ❌ 안티패턴 2: useDerivedValue 안에서 다른 SharedValue 업데이트

```typescript
// ❌ 나쁨: 사이드 이펙트를 useDerivedValue에 넣음
const isActive = useDerivedValue(() => {
  const active = Math.round(dragProgress.value) === index;
  
  // 🚨 다른 SharedValue를 업데이트하면 안됨!
  scale.value = active ? 1.1 : 1;
  
  return active;
});

// ✅ 올바름: useAnimatedReaction 사용
const isActive = useDerivedValue(() => {
  return Math.round(dragProgress.value) === index;
});

useAnimatedReaction(
  () => isActive.value,
  (current) => {
    scale.value = withSpring(current ? 1.1 : 1);
  }
);
```

**이유**: `useDerivedValue`는 순수 함수여야 하며, 사이드 이펙트가 없어야 최적화됩니다.

---

### ❌ 안티패턴 3: useAnimatedReaction에서 값 반환

```typescript
// ❌ 나쁨: useAnimatedReaction은 값을 반환하지 않음
const isActive = useAnimatedReaction(
  () => dragProgress.value,
  (current) => {
    return current === index;  // 🚨 무시됨!
  }
);

// ✅ 올바름: useDerivedValue 사용
const isActive = useDerivedValue(() => {
  return Math.round(dragProgress.value) === index;
});
```

---

### ❌ 안티패턴 4: 과도한 useAnimatedReaction

```typescript
// ❌ 나쁨: 각 탭마다 로그 출력 (10개면 10번 실행)
export function TabBarItem({ dragProgress, index }) {
  useAnimatedReaction(
    () => dragProgress.value,
    (current) => {
      runOnJS(console.log)('Progress:', current, 'Index:', index);
    }
  );
}

// ✅ 올바름: 부모에서 1번만 실행
export function TabBar({ items }) {
  const dragProgress = useSharedValue(0);
  
  useAnimatedReaction(
    () => dragProgress.value,
    (current) => {
      runOnJS(console.log)('Active tab:', Math.round(current));
    }
  );
  
  return items.map((item, i) => (
    <TabBarItem key={i} dragProgress={dragProgress} index={i} />
  ));
}
```

---

### ⚠️ 주의사항 1: Pressable의 accessibilityState

```typescript
// ⚠️ 주의: accessibilityState는 JS 스레드 props
<Pressable
  accessibilityState={{ selected: dragProgress.value === index }}  
  // 🚨 dragProgress 변경 시 재렌더 안됨!
>
```

**해결책**: 
- 방법 1: `useDerivedValue` 결과를 `useAnimatedReaction`으로 감지 → `runOnJS`로 state 업데이트
- 방법 2: `selectedPage` prop을 JS 상태로 관리하고 동시에 사용

```typescript
// 방법 2 (권장)
export function TabBarItem({ 
  index, 
  dragProgress, 
  selectedPage,  // JS 스레드 상태
  ...
}) {
  return (
    <Pressable
      accessibilityState={{ selected: selectedPage === index }}
    >
      {/* Animated 스타일은 dragProgress 사용 */}
    </Pressable>
  );
}
```

---

### ⚠️ 주의사항 2: interpolate의 clamp

```typescript
// ⚠️ 주의: 범위를 벗어나면 예상치 못한 값
const activeProgress = useDerivedValue(() => {
  return interpolate(
    dragProgress.value,
    [index - 1, index, index + 1],
    [0, 1, 0],
    // 'clamp' 없으면 음수나 1 초과 값 가능
  );
});

// ✅ 권장: 항상 Extrapolation 명시
const activeProgress = useDerivedValue(() => {
  return interpolate(
    dragProgress.value,
    [index - 1, index, index + 1],
    [0, 1, 0],
    'clamp'  // 또는 Extrapolation.CLAMP
  );
});
```

---

## 7. 요약 및 추천 패턴

### TabBarItem에 적용할 최종 패턴

```typescript
import { useDerivedValue, useAnimatedStyle, useAnimatedReaction } from 'react-native-reanimated';
import { interpolate } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

interface TabBarItemProps {
  index: number;
  dragProgress: SharedValue<number>;
  item: string;
  // ... 기타 props
}

export function TabBarItem({ index, dragProgress, ... }: TabBarItemProps) {
  
  // 1️⃣ 부드러운 활성 진행도 (0 ~ 1)
  const activeProgress = useDerivedValue(() => {
    return interpolate(
      dragProgress.value,
      [index - 1, index, index + 1],
      [0, 1, 0],
      'clamp'
    );
  }, [index]);

  // 2️⃣ 정확한 활성 상태 (boolean)
  const isActive = useDerivedValue(() => {
    return Math.round(dragProgress.value) === index;
  }, [index]);

  // 3️⃣ 활성화 시 사이드 이펙트 (선택사항)
  useAnimatedReaction(
    () => isActive.value,
    (current, previous) => {
      if (current && !previous) {
        // 햅틱, 로깅 등
        runOnJS(onActivate)?.(index);
      }
    },
    [index]
  );

  // 4️⃣ 애니메이션 스타일
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.5 + activeProgress.value * 0.5,
    transform: [{ scale: 0.98 + activeProgress.value * 0.02 }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    color: isActive.value 
      ? theme.colors.primary.solid
      : theme.colors.neutral.text_2,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Animated.Text style={textAnimatedStyle}>
        {item}
      </Animated.Text>
    </Animated.View>
  );
}
```

### 의사결정 가이드

| 요구사항 | 추천 패턴 |
|---------|----------|
| 스타일만 변경 | `useAnimatedStyle`에서 직접 계산 |
| 파생 값이 여러 곳에서 사용 | `useDerivedValue` |
| 활성화 시 햅틱/로깅 | `useAnimatedReaction` + `runOnJS` |
| 다른 애니메이션 트리거 | `useAnimatedReaction` + SharedValue 업데이트 |
| 복잡한 계산 메모이제이션 | `useDerivedValue` 체인 |
| 여러 자식에 공유 | 부모에서 `useDerivedValue` → props 전달 |

---

## 참고 자료

- [Reanimated 공식 문서](https://docs.swmansion.com/react-native-reanimated/)
- [useDerivedValue API](https://docs.swmansion.com/react-native-reanimated/docs/core/useDerivedValue)
- [useAnimatedReaction API](https://docs.swmansion.com/react-native-reanimated/docs/advanced/useAnimatedReaction)
- [Worklets 개념](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/glossary#worklet)
- [UI vs JS Thread](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/glossary#ui-thread-vs-js-thread)

---

## 다음 단계

이 패턴들을 현재 `TabBarItem.tsx`에 적용하려면:

1. `useDerivedValue`로 `isActive`와 `activeProgress` 생성
2. `styles.itemText(dragProgress.value === index)` → `useAnimatedStyle`로 변경
3. 필요시 `useAnimatedReaction`으로 햅틱 피드백 추가
4. 성능 프로파일링으로 검증

각 단계를 진행하며 테스트하고, 필요시 이 문서를 참고하세요.

