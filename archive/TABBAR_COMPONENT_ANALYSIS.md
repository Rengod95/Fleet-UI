# TabBar 컴포넌트 상세 분석

## 1. 핵심 구조 개요

### 1.1 주요 기능
이 TabBar는 단순한 탭 선택기가 아니라, **Pager와 완전히 동기화되는 고급 인터랙티브 컴포넌트**입니다.

**핵심 특징:**
1. **양방향 동기화**: Pager 스와이프 → TabBar 자동 스크롤, Tab 클릭 → Pager 이동
2. **스마트 스크롤**: 선택된 탭이 항상 적절한 위치에 보이도록 자동 조정
3. **부드러운 Indicator**: 탭 간 이동 시 위치와 크기가 동시에 애니메이션
4. **수동 스크롤 처리**: 사용자가 TabBar를 직접 스크롤하면 자동 동기화를 일시 중지

### 1.2 핵심 State 값들

| State | 타입 | 역할 |
|-------|------|------|
| `dragProgress` | `SharedValue<number>` | **현재 페이지 위치** (0, 0.5, 1.0 등). 스와이프 중에는 소수점 값 |
| `dragState` | `SharedValue<'idle'\|'dragging'\|'settling'>` | Pager의 제스처 상태 |
| `syncScrollState` | `SharedValue<'synced'\|'unsynced'\|'needs-sync'>` | TabBar 스크롤 동기화 상태 |
| `layouts` | `SharedValue<{x, width}[]>` | 각 탭 아이템의 **실제 렌더링된 위치와 크기** |
| `textLayouts` | `SharedValue<{width}[]>` | 각 탭 텍스트의 너비 (indicator 크기 계산용) |
| `scrollX` | `SharedValue<number>` | TabBar ScrollView의 현재 스크롤 오프셋 |
| `containerSize` | `SharedValue<number>` | TabBar 컨테이너의 너비 (화면에 보이는 영역) |
| `contentSize` | `SharedValue<number>` | 모든 탭을 포함한 전체 콘텐츠 너비 |

### 1.3 동기화 로직의 핵심 흐름

```
[Pager 스와이프]
  ↓
dragProgress 업데이트 (0 → 0.5 → 1.0)
  ↓
useAnimatedReaction 감지
  ↓
progressToOffset() 계산
  ↓
ScrollView 자동 스크롤 (scrollTo)
  ↓
Indicator 위치/크기 애니메이션
```

```
[Tab 클릭]
  ↓
onPressUIThread 실행
  ↓
dragProgress.set(withSpring(index))
  ↓
화면 내 여부 체크
  ↓
필요 시 scrollTo + syncScrollState = 'synced'
```

```
[수동 스크롤]
  ↓
onScrollBeginDrag
  ↓
syncScrollState = 'unsynced'
  ↓
자동 스크롤 중지
  ↓
dragState가 'idle'이 되면
  ↓
syncScrollState = 'synced' (재동기화)
```

### 1.4 좌표 변환 핵심 공식

**`indexToOffset(index)`**: 탭 인덱스 → 스크롤 오프셋
- 목적: 특정 탭을 화면 중앙에 배치하기 위한 스크롤 위치 계산
- 로직: 첫 탭은 좌측 정렬, 마지막 탭은 우측 정렬, 중간은 점진적 보간

**`progressToOffset(progress)`**: 페이지 진행도 → 스크롤 오프셋
- 목적: 스와이프 중 부드러운 스크롤 추적
- 로직: floor/ceil된 인덱스 간 선형 보간

---

## 2. 인라인 주석 상세 해설

```typescript
import { useCallback } from "react";
import {
  type LayoutChangeEvent,
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
} from "react-native";
import Animated, {
  interpolate,
  scrollTo,
  type SharedValue,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";
import { runOnJS, runOnUI } from "react-native-worklets";
import { View } from "tamagui";

export interface TabBarProps {
  selectedPage: number;          // 초기 선택된 페이지 인덱스
  items: string[];               // 탭 아이템 레이블 배열
  onSelect?: (index: number) => void;  // 탭 선택 시 콜백 (Pager에게 알림)
}

// 각 탭 아이템의 좌우 패딩
const ITEM_PADDING = 10;
// ScrollView contentContainer의 좌우 패딩
const CONTENT_PADDING = 6;
// 탭 클릭 시 "화면에 보이는가" 판단 시 여유 공간
// 이 값만큼 이전/다음 탭이 잘려있어도 스크롤하지 않음
const OFFSCREEN_ITEM_WIDTH = 20;

export function TabBar({ selectedPage, items, onSelect }: TabBarProps) {
  // ============================================================================
  // 1. 핵심 SharedValues
  // ============================================================================
  
  /**
   * dragProgress: 현재 페이지의 "연속적인" 위치
   * - 정수: 페이지가 완전히 정지된 상태 (0, 1, 2...)
   * - 소수: 페이지 전환 중 (0.5 = 페이지 0과 1의 중간)
   * - Pager가 제스처를 통해 실시간으로 업데이트
   * - 이 값을 기반으로 Indicator 위치/크기, TabBar 스크롤 위치가 계산됨
   */
  const dragProgress = useSharedValue(selectedPage);
  
  /**
   * dragState: Pager의 제스처 상태
   * - 'idle': 아무 제스처도 없는 정지 상태
   * - 'dragging': 사용자가 손가락으로 드래그 중
   * - 'settling': 손을 떼었지만 스크롤이 감속 중
   * 
   * 이 값은 "자동 스크롤을 해도 되는가"를 판단하는 데 사용됨
   * idle이 아닐 때만 pager 스와이프에 따라 TabBar를 자동 스크롤
   */
  const dragState = useSharedValue<"idle" | "dragging" | "settling">("idle");
  
  /**
   * ScrollView에 대한 Animated Ref
   * UI 쓰레드에서 직접 scrollTo() 호출 가능
   */
  const scrollElRef = useAnimatedRef<ScrollView>();
  
  /**
   * syncScrollState: TabBar 스크롤의 동기화 상태
   * - 'synced': Pager와 완전히 동기화됨. 자동 스크롤 활성화
   * - 'unsynced': 사용자가 TabBar를 수동으로 스크롤함. 자동 스크롤 비활성화
   * - 'needs-sync': 다음 기회에 재동기화 필요 (다음 스와이프나 탭 클릭 시)
   * 
   * 왜 필요한가?
   * - 사용자가 TabBar를 직접 스크롤하는 도중 Pager 스와이프로 인해
   *   TabBar가 갑자기 튀는 것을 방지
   * - 대신 제스처가 끝난 후(idle) 부드럽게 재동기화
   */
  const syncScrollState = useSharedValue<"synced" | "unsynced" | "needs-sync">(
    "unsynced" // 초기에는 비동기 상태로 시작 (첫 레이아웃 후 동기화)
  );
  
  /**
   * didInitialScroll: 컴포넌트 마운트 후 최초 1회 스크롤 완료 여부
   * 모든 탭의 레이아웃이 측정된 직후, selectedPage 위치로 초기 스크롤을 수행
   * 이후에는 더 이상 이 초기화 로직을 실행하지 않음
   */
  const didInitialScroll = useSharedValue(false);
  
  /**
   * contentSize: ScrollView 내부 콘텐츠의 전체 너비
   * 모든 탭 아이템을 포함한 <Animated.View>의 width
   */
  const contentSize = useSharedValue(0);
  
  /**
   * containerSize: ScrollView 컨테이너(viewport)의 너비
   * 화면에 실제로 보이는 영역의 크기
   */
  const containerSize = useSharedValue(0);
  
  /**
   * scrollX: 현재 ScrollView의 스크롤 오프셋 (X축)
   * onScroll 이벤트를 통해 업데이트됨
   * "현재 어느 탭이 화면에 보이는가"를 판단하는 데 사용
   */
  const scrollX = useSharedValue(0);
  
  /**
   * layouts: 각 탭 아이템의 실제 렌더링된 위치와 크기
   * - x: 탭의 좌측 끝 X 좌표 (ScrollView 콘텐츠 기준)
   * - width: 탭의 너비
   * 
   * 왜 필요한가?
   * - 탭의 크기가 동적임 (텍스트 길이에 따라 다름)
   * - "특정 탭을 중앙에 배치"하려면 정확한 위치/크기 정보가 필수
   * - Indicator의 위치 계산에도 사용
   */
  const layouts = useSharedValue<{ x: number; width: number }[]>([]);
  
  /**
   * textLayouts: 각 탭 텍스트의 실제 너비
   * Indicator의 너비를 계산하는 데 사용
   * (Indicator는 텍스트보다 약간 넓거나, 최소/최대 제한이 있음)
   */
  const textLayouts = useSharedValue<{ width: number }[]>([]);
  
  const itemsLength = items.length;

  // ============================================================================
  // 2. 좌표 변환 함수들
  // ============================================================================
  
  /**
   * scrollToOffsetJS: JS 쓰레드에서 ScrollView를 스크롤하는 함수
   * iOS에서 일부 케이스에 runOnJS를 통해 호출해야 정상 동작함
   */
  const scrollToOffsetJS = useCallback(
    (x: number) => {
      scrollElRef.current?.scrollTo({
        x,
        y: 0,
        animated: true,
      });
    },
    [scrollElRef]
  );

  /**
   * indexToOffset: 특정 탭 인덱스를 "중앙에 배치"하기 위한 스크롤 오프셋 계산
   * 
   * 전략:
   * - 첫 번째 탭(index=0): 좌측 정렬 (offset = 0)
   * - 마지막 탭(index=itemsLength-1): 우측 정렬 (offset = max)
   * - 중간 탭들: 점진적으로 보간하여 배치
   * 
   * 왜 이렇게?
   * - 첫 탭과 마지막 탭은 스크롤 끝이므로 더 이상 이동할 수 없음
   * - 중간 탭들은 화면 중앙에 가깝게 배치하되, 양 끝으로 갈수록 자연스럽게 조정
   * 
   * 계산 과정:
   * 1. availableSize = 화면에 보이는 너비 - 양쪽 패딩
   * 2. freeSpace = availableSize - 현재 탭의 너비
   *    (탭을 중앙에 놓았을 때 남는 좌우 공간)
   * 3. accumulatingOffset = 인덱스 진행에 따라 0 → freeSpace로 보간
   *    (첫 탭은 0, 마지막 탭은 freeSpace만큼 왼쪽으로 shift)
   * 4. offset = 탭의 x 좌표 - accumulatingOffset
   */
  const indexToOffset = useCallback(
    (index: number) => {
      "worklet";
      const layout = layouts.get()[index];
      const availableSize = containerSize.get() - 2 * CONTENT_PADDING;
      
      if (!layout) {
        // 레이아웃이 아직 측정되지 않은 경우 fallback
        // 모든 탭이 동일한 크기라고 가정하고 선형 보간
        const offsetPerPage = contentSize.get() - availableSize;
        return (index / (itemsLength - 1)) * offsetPerPage;
      }
      
      const freeSpace = availableSize - layout.width;
      
      // 핵심: 첫 탭은 좌측 정렬(0), 마지막 탭은 우측 정렬(freeSpace)
      const accumulatingOffset = interpolate(
        index,
        [0, itemsLength - 1],
        [0, freeSpace],
        "clamp"
      );
      
      return layout.x - accumulatingOffset;
    },
    [itemsLength, contentSize, containerSize, layouts]
  );

  /**
   * progressToOffset: 연속적인 페이지 진행도(0.5 등)를 스크롤 오프셋으로 변환
   * 
   * 사용 시점:
   * - Pager를 스와이프하는 도중 dragProgress가 0.5 같은 소수 값일 때
   * - TabBar도 해당 중간 위치로 부드럽게 스크롤되어야 함
   * 
   * 로직:
   * - progress의 floor와 ceil 인덱스 사이를 선형 보간
   * - 예: progress=1.3 → floor=1, ceil=2
   *   → offset = indexToOffset(1)과 indexToOffset(2) 사이를 0.3 비율로 보간
   */
  const progressToOffset = useCallback(
    (progress: number) => {
      "worklet";
      return interpolate(
        progress,
        [Math.floor(progress), Math.ceil(progress)],
        [
          indexToOffset(Math.floor(progress)),
          indexToOffset(Math.ceil(progress)),
        ],
        "clamp"
      );
    },
    [indexToOffset]
  );

  // ============================================================================
  // 3. useAnimatedReaction들 - 자동 동기화 로직
  // ============================================================================
  
  /**
   * Reaction 1: 모든 탭의 레이아웃이 측정되면 최초 1회 스크롤
   * 
   * 타이밍:
   * - 컴포넌트 마운트 직후, 각 탭이 렌더링되며 onLayout 이벤트 발생
   * - layouts 배열의 길이가 itemsLength와 같아지면 모든 측정 완료
   * 
   * 동작:
   * - selectedPage 위치로 스크롤 (초기 선택된 탭이 보이도록)
   * - didInitialScroll을 true로 설정하여 이후 재실행 방지
   * 
   * 왜 runOnJS?
   * - iOS에서 초기 scrollTo가 UI 쓰레드에서 동작하지 않는 경우가 있음
   */
  useAnimatedReaction(
    () => layouts.get().length,
    (nextLayoutsLength, prevLayoutsLength) => {
      if (nextLayoutsLength !== prevLayoutsLength) {
        if (
          nextLayoutsLength === itemsLength &&
          didInitialScroll.get() === false
        ) {
          didInitialScroll.set(true);
          const progress = dragProgress.get();
          const offset = progressToOffset(progress);
          runOnJS(scrollToOffsetJS)(offset);
        }
      }
    }
  );

  /**
   * Reaction 2: Pager 스와이프 시 TabBar 자동 스크롤
   * 
   * 트리거:
   * - dragProgress가 변경될 때 (Pager 스와이프 중 또는 settling 중)
   * 
   * 조건:
   * - dragState가 'idle'이 아님 (dragging 또는 settling)
   * - syncScrollState가 'synced' (동기화된 상태)
   * 
   * 동작:
   * - 현재 progress에 대응하는 offset을 계산
   * - ScrollView를 해당 위치로 즉시 스크롤 (animated: false)
   * 
   * 왜 animated=false?
   * - Pager의 제스처와 실시간으로 동기화되어야 하므로
   *   애니메이션을 사용하면 딜레이/불일치가 발생
   * 
   * 왜 synced 체크?
   * - 사용자가 TabBar를 수동으로 스크롤한 경우 (unsynced)
   *   자동 스크롤이 갑자기 발동하면 UX가 나쁨
   *   대신 idle 상태가 되면 재동기화
   */
  useAnimatedReaction(
    () => dragProgress.get(),
    (nextProgress, prevProgress) => {
      if (
        nextProgress !== prevProgress &&
        dragState.value !== "idle" &&
        syncScrollState.get() === "synced"
      ) {
        const offset = progressToOffset(nextProgress);
        scrollTo(scrollElRef, offset, 0, false); // animated: false
      }
    }
  );

  /**
   * Reaction 3: Pager 제스처가 끝났을 때 (idle) 재동기화
   * 
   * 트리거:
   * - dragState가 변경될 때
   * 
   * 조건:
   * - dragState가 'idle'로 변경됨 (제스처 종료)
   * - syncScrollState가 'unsynced' 또는 'needs-sync' (재동기화 필요)
   * 
   * 동작:
   * - 현재 progress에 대응하는 offset으로 부드럽게 스크롤 (animated: true)
   * - syncScrollState를 'synced'로 변경
   * 
   * 왜 필요한가?
   * - 사용자가 TabBar를 수동 스크롤한 후 (unsynced)
   *   Pager를 스와이프하면 TabBar는 움직이지 않음 (Reaction 2의 조건 불충족)
   * - 스와이프가 끝나면 (idle) 이제 안전하게 재동기화 가능
   *   (사용자가 TabBar를 직접 터치하지 않는 순간)
   */
  useAnimatedReaction(
    () => dragState.value,
    (nextDragState, prevDragState) => {
      if (
        nextDragState !== prevDragState &&
        nextDragState === "idle" &&
        (syncScrollState.get() === "unsynced" ||
          syncScrollState.get() === "needs-sync")
      ) {
        const progress = dragProgress.get();
        const offset = progressToOffset(progress);
        scrollTo(scrollElRef, offset, 0, true); // animated: true
        syncScrollState.set("synced");
      }
    }
  );

  // ============================================================================
  // 4. 탭 클릭 처리
  // ============================================================================
  
  /**
   * onPressUIThread: 탭을 클릭했을 때의 UI 쓰레드 로직
   * 
   * 목표:
   * 1. dragProgress를 클릭한 탭의 인덱스로 애니메이션
   * 2. 클릭한 탭이 화면에 완전히 보이도록 스크롤 (필요 시)
   * 3. 동기화 상태 갱신
   * 
   * 스크롤 여부 판단:
   * - 탭의 좌측 끝에서 OFFSCREEN_ITEM_WIDTH만큼 뺀 위치 (leftEdge)
   * - 탭의 우측 끝에서 OFFSCREEN_ITEM_WIDTH만큼 더한 위치 (rightEdge)
   * - 현재 스크롤 영역 (scrollLeft ~ scrollRight)
   * - leftEdge < scrollLeft 또는 rightEdge > scrollRight면 스크롤 필요
   * 
   * 동기화 상태 전략:
   * - 이미 synced이거나 needs-sync인 경우: 즉시 스크롤 + synced로 변경
   * - unsynced인 경우:
   *   - 탭이 이미 화면에 보이면: 스크롤하지 않고 needs-sync로 설정
   *     (다음 기회에 재동기화)
   *   - 탭이 화면 밖이면: 강제로 스크롤 + synced로 변경
   *     (탭이 안 보이는데 스크롤하지 않으면 UX가 나쁨)
   */
  const onPressUIThread = useCallback(
    (index: number) => {
      "worklet";
      
      // dragProgress를 클릭한 인덱스로 spring 애니메이션
      // 이는 Pager에게 전달되어 페이지 전환을 트리거함
      dragProgress.set(withSpring(index));
      
      const itemLayout = layouts.get()[index];
      if (!itemLayout) {
        return; // 레이아웃이 아직 측정되지 않음
      }
      
      // 탭이 화면에 충분히 보이는지 체크
      const leftEdge = itemLayout.x - OFFSCREEN_ITEM_WIDTH;
      const rightEdge = itemLayout.x + itemLayout.width + OFFSCREEN_ITEM_WIDTH;
      const scrollLeft = scrollX.get();
      const scrollRight = scrollLeft + containerSize.get();
      const scrollIntoView = leftEdge < scrollLeft || rightEdge > scrollRight;
      
      if (
        syncScrollState.get() === "synced" ||
        syncScrollState.get() === "needs-sync" ||
        scrollIntoView
      ) {
        // 스크롤 필요: 탭을 화면에 보이도록 조정
        const offset = progressToOffset(index);
        scrollTo(scrollElRef, offset, 0, true);
        syncScrollState.set("synced");
      } else {
        // 탭이 이미 보이고 unsynced 상태: 다음에 재동기화
        syncScrollState.set("needs-sync");
      }
    },
    [
      syncScrollState,
      scrollElRef,
      scrollX,
      progressToOffset,
      containerSize,
      layouts,
    ]
  );

  /**
   * Layout 콜백들
   * 각 탭이 렌더링될 때 실제 위치/크기를 측정하여 SharedValue 배열에 저장
   */
  const onItemLayout = useCallback(
    (i: number, layout: { x: number; width: number }) => {
      "worklet";
      layouts.modify((ls) => {
        ls[i] = layout;
        return ls;
      });
    },
    [layouts]
  );

  const onTextLayout = useCallback(
    (i: number, layout: { width: number }) => {
      "worklet";
      textLayouts.modify((ls) => {
        ls[i] = layout;
        return ls;
      });
    },
    [textLayouts]
  );

  // ============================================================================
  // 5. Indicator 스타일 계산
  // ============================================================================
  
  /**
   * indicatorStyle: 선택된 탭 아래의 밑줄 표시
   * 
   * 위치 애니메이션:
   * - dragProgress에 따라 translateX를 보간
   * - 각 탭의 중앙 위치로 이동하도록 계산
   *   (layout.x + layout.width/2 - contentSize/2)
   * 
   * 크기 애니메이션:
   * - scaleX를 사용하여 너비 조정
   * - getScaleX(index): 각 탭에 대한 indicator 너비 계산
   *   - 기본값: 텍스트 너비와 유사
   *   - 최소값: 45px (너무 짧으면 보기 어려움)
   *   - 최대값: 탭 너비의 CONTENT_PADDING 배
   * 
   * opacity:
   * - 모든 레이아웃이 측정되기 전에는 0 (깜빡임 방지)
   * - 측정 완료 후 1
   */
  const indicatorStyle = useAnimatedStyle(() => {
    const layoutsValue = layouts.get();
    const textLayoutsValue = textLayouts.get();
    
    // 모든 레이아웃이 측정될 때까지 숨김
    if (
      layoutsValue.length !== itemsLength ||
      textLayoutsValue.length !== itemsLength
    ) {
      return {
        opacity: 0,
      };
    }

    /**
     * getScaleX: 특정 인덱스에 대한 indicator의 scaleX 값 계산
     * 
     * 왜 scaleX?
     * - indicator는 contentSize만큼의 너비로 렌더링되고
     *   scaleX를 통해 실제 표시 너비를 조절
     * - transform 애니메이션이 width 애니메이션보다 성능이 좋음
     */
    function getScaleX(index: number) {
      const textWidth = textLayoutsValue[index].width;
      const itemWidth = layoutsValue[index].width;
      const minIndicatorWidth = 45;
      const maxIndicatorWidth = itemWidth * CONTENT_PADDING;
      
      // 텍스트 너비를 기준으로 하되 최소/최대 제한
      const indicatorWidth = Math.min(
        Math.max(minIndicatorWidth, textWidth),
        maxIndicatorWidth
      );
      
      // contentSize 대비 비율로 scaleX 계산
      return indicatorWidth / contentSize.get();
    }

    // 단일 탭인 경우 (보간 불필요)
    if (textLayoutsValue.length === 1) {
      return {
        opacity: 1,
        transform: [
          {
            scaleX: getScaleX(0),
          },
        ],
      };
    }

    // 복수 탭: dragProgress에 따라 위치/크기 보간
    return {
      opacity: 1,
      transform: [
        {
          // 위치: 각 탭의 중앙으로 이동
          translateX: interpolate(
            dragProgress.get(),
            layoutsValue.map((l, i) => i), // [0, 1, 2, ...]
            layoutsValue.map((l) => {
              // 각 탭의 중앙 X 좌표 - indicator 중앙
              return l.x + l.width / 2 - contentSize.get() / 2;
            })
          ),
        },
        {
          // 크기: 각 탭의 텍스트 너비에 맞춤
          scaleX: interpolate(
            dragProgress.get(),
            textLayoutsValue.map((l, i) => i),
            textLayoutsValue.map((l, i) => getScaleX(i))
          ),
        },
      ],
    };
  });

  // ============================================================================
  // 6. JS 쓰레드 이벤트 핸들러
  // ============================================================================
  
  /**
   * onPressItem: 탭 클릭 시 JS 쓰레드에서 호출
   * 
   * 역할:
   * 1. UI 쓰레드에서 onPressUIThread 실행 (스크롤 처리)
   * 2. 부모 컴포넌트에 onSelect 콜백 호출 (Pager 업데이트)
   */
  const onPressItem = useCallback(
    (index: number) => {
      runOnUI(onPressUIThread)(index);
      onSelect?.(index);
    },
    [onSelect, selectedPage, onPressUIThread]
  );

  // ============================================================================
  // 7. 렌더링
  // ============================================================================
  
  return (
    <View style={styles.rootContainer}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={scrollElRef}
        contentContainerStyle={styles.contentContainer}
        
        // ScrollView 컨테이너 크기 측정
        onLayout={(e) => {
          containerSize.set(e.nativeEvent.layout.width);
        }}
        
        /**
         * onScrollBeginDrag: 사용자가 TabBar를 직접 스크롤하기 시작
         * 
         * 동작:
         * - syncScrollState를 'unsynced'로 설정
         * - 이제 Pager 스와이프에 따른 자동 스크롤이 비활성화됨
         * - 다음 idle 상태 또는 탭 클릭 시 재동기화
         * 
         * 왜 필요한가?
         * - 사용자가 TabBar를 스크롤하는 도중
         *   Pager 스와이프로 인해 TabBar가 갑자기 튀면 혼란스러움
         */
        onScrollBeginDrag={() => {
          syncScrollState.set("unsynced");
        }}
        
        /**
         * onScroll: 스크롤 위치 추적
         * scrollX SharedValue를 업데이트하여
         * "현재 어느 부분이 화면에 보이는가"를 파악
         */
        onScroll={(e) => {
          scrollX.value = Math.round(e.nativeEvent.contentOffset.x);
        }}
      >
        {/* 콘텐츠 컨테이너: 모든 탭 포함 */}
        <Animated.View
          onLayout={(e) => {
            contentSize.set(e.nativeEvent.layout.width);
          }}
          style={{ flexDirection: "row", flexGrow: 1 }}
        >
          {/* 각 탭 아이템 렌더링 */}
          {items.map((item, i) => {
            return (
              <TabBarItem
                key={i}
                index={i}
                dragProgress={dragProgress}
                item={item}
                onPressItem={onPressItem}
                onItemLayout={onItemLayout}
                onTextLayout={onTextLayout}
              />
            );
          })}
          
          {/* Indicator: 선택된 탭 아래 밑줄 */}
          <Animated.View
            style={[
              indicatorStyle,
              {
                position: "absolute",
                left: 0,
                bottom: 0,
                right: 0,
                borderBottomWidth: 3,
                borderRadius: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderColor: "#ff42a7",
              },
            ]}
          />
        </Animated.View>
      </ScrollView>
      
      {/* 하단 경계선 */}
      <View style={[styles.outerBottomBorder]} />
    </View>
  );
}

// ============================================================================
// TabBarItem 컴포넌트
// ============================================================================

/**
 * 개별 탭 아이템
 * 
 * 역할:
 * 1. 탭 레이블 표시
 * 2. dragProgress에 따라 opacity 애니메이션 (선택된 탭 강조)
 * 3. 레이아웃 측정 후 부모에게 전달
 */
function TabBarItem({
  index,
  dragProgress,
  item,
  onPressItem,
  onItemLayout,
  onTextLayout,
}: {
  index: number;
  dragProgress: SharedValue<number>;
  item: string;
  onPressItem: (index: number) => void;
  onItemLayout: (index: number, layout: { x: number; width: number }) => void;
  onTextLayout: (index: number, layout: { width: number }) => void;
}) {
  const colorScheme = useColorScheme();
  
  /**
   * opacity 애니메이션:
   * - 현재 선택된 탭(index = dragProgress): opacity 1.0
   * - 인접 탭(index ± 1): opacity 0.7
   * - 기타: 0.7
   * 
   * 보간 구간: [index-1, index, index+1] → [0.7, 1, 0.7]
   */
  const style = useAnimatedStyle(() => {
    if (!_WORKLET) {
      // 초기 렌더링 시 기본값
      return { opacity: 0.7 };
    }
    
    return {
      opacity: interpolate(
        dragProgress.get(),
        [index - 1, index, index + 1],
        [0.7, 1, 0.7],
        "clamp"
      ),
    };
  });

  /**
   * handleLayout: 탭 아이템의 레이아웃 측정
   * UI 쓰레드에서 onItemLayout 호출하여 SharedValue 배열에 저장
   */
  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      runOnUI(onItemLayout)(index, e.nativeEvent.layout);
    },
    [index, onItemLayout]
  );

  /**
   * handleTextLayout: 탭 텍스트의 레이아웃 측정
   * Indicator 크기 계산에 사용
   */
  const handleTextLayout = useCallback(
    (e: LayoutChangeEvent) => {
      runOnUI(onTextLayout)(index, e.nativeEvent.layout);
    },
    [index, onTextLayout]
  );

  return (
    <View flexGrow={1} onLayout={handleLayout}>
      <Pressable
        testID={`selector-${index}`}
        style={styles.item}
        onPress={() => onPressItem(index)}
        accessibilityRole="tab"
      >
        <Animated.View style={[style, styles.itemInner]}>
          <Text
            testID={`${item}`}
            style={[styles.itemText]}
            onLayout={handleTextLayout}
          >
            {item}
          </Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

// ============================================================================
// 스타일
// ============================================================================

const styles = StyleSheet.create((theme) => ({
  rootContainer: {
    pos
    ...theme.atoms.flex,
    ...theme.atoms.flex_row,
    backgroundColor: theme.color.transparent,
  },
  blurContainer: {
    ...theme.atoms.absolute,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 1,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: "transparent",
    paddingHorizontal: CONTENT_PADDING,
  },
  item: {
    flexGrow: 1,
    paddingTop: theme.space.sm,
    paddingHorizontal: theme.space.xs,
    justifyContent: "center",
  },
  itemInner: {
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: theme.space.sm,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  itemText: {
    lineHeight: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: theme.color.text[1],
  },
  outerBottomBorder: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "100%",
    borderBottomWidth: 1,
    borderBottomColor: theme.color.bd[1],
  },
}));
```

---

## 3. 핵심 개념 요약

### 3.1 동기화 상태 머신

```
초기 상태: unsynced
    ↓
[모든 레이아웃 측정 완료] → 초기 스크롤 → synced
    ↓
[사용자가 TabBar 수동 스크롤] → unsynced
    ↓
[Pager 스와이프 발생] → 자동 스크롤 비활성화 (unsynced 유지)
    ↓
[Pager 제스처 종료 (idle)] → 재동기화 스크롤 → synced
    ↓
[탭 클릭] → 필요 시 스크롤 → synced
```

### 3.2 성능 최적화 포인트

1. **UI 쓰레드 활용**: 대부분의 계산을 worklet으로 UI 쓰레드에서 처리
2. **Transform 사용**: Indicator 크기 조절에 `scaleX` 사용 (width 애니메이션보다 성능 우수)
3. **선택적 애니메이션**: Pager 스와이프 중에는 `animated: false`, 탭 클릭 시에는 `animated: true`
4. **레이아웃 캐싱**: 한 번 측정된 레이아웃은 SharedValue에 저장하여 재사용

### 3.3 UX 고려사항

1. **부드러운 전환**: dragProgress의 소수 값을 활용하여 중간 상태까지 부드럽게 애니메이션
2. **스마트 스크롤**: 탭 클릭 시 이미 화면에 보이면 불필요한 스크롤 방지
3. **수동 스크롤 존중**: 사용자가 TabBar를 직접 스크롤하면 자동 동기화 일시 중지
4. **깜빡임 방지**: 레이아웃 측정 전까지 Indicator를 숨김 (opacity: 0)

