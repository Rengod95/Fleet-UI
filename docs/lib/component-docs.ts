export type ComponentDoc = {
  slug: string;
  name: string;
  oneLiner: string;
  structure?: string[];
  directory?: string[];
  internalState?: string[];
  usageSections?: Array<{
    title: string;
    bullets: string[];
  }>;
  accessibility?: string[];
  propsNote?: string;
};

export const componentDocs: Record<string, ComponentDoc> = {
  button: {
    slug: 'button',
    name: 'Button',
    oneLiner: '',
    directory: [
      'packages/components/src/Button/',
      '├── Button.tsx',
      '├── Button.types.ts',
      '└── index.ts',
    ],
    internalState: [
      'Pressable 기반: pressed/disabled 상태는 RN 이벤트/props로 처리',
      'Reanimated 기반 인터랙션(스타일 전환/애니메이션)을 사용',
    ],
    usageSections: [
      {
        title: '기본 사용',
        bullets: [
          '텍스트 children 제공',
          'onPress 핸들러 연결',
          'variant/size/colorScheme로 스타일 선택',
        ],
      },
      {
        title: '상태',
        bullets: ['disabled 처리', '로딩 상태(있는 경우) 처리', '아이콘 슬롯(있는 경우) 활용'],
      },
    ],
    accessibility: [
      '기본 role: button',
      '필요 시 accessibilityLabel 제공',
      'disabled일 때 상태 전달(스크린리더가 인지 가능하도록)',
    ],
    propsNote:
      'Props 표는 다음 세션에서 수동/자동/혼합 전략을 확정한 뒤 반영합니다.',
  },
};

