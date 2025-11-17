#!/bin/bash

# Fleet UI - Expo Doctor 안전 실행 스크립트
# 모노레포 환경에서 Expo Doctor를 안전하게 실행합니다

set -e

echo "🔍 Fleet UI - Expo Doctor 검사 시작..."
echo ""

# 현재 디렉터리 확인
if [ ! -f "apps/playground/package.json" ]; then
  echo "❌ 에러: 루트 디렉터리에서 실행해주세요"
  exit 1
fi

# playground로 이동
cd apps/playground

echo "📦 현재 설치된 Expo 버전:"
node -e "console.log(require('./package.json').dependencies.expo)"
echo ""

echo "🔍 Expo Doctor 검사 중..."
echo "   (자동 수정 없이 검사만 수행합니다)"
echo ""

# expo-doctor 실행 (검사만)
npx expo-doctor@latest

echo ""
echo "✅ 검사 완료!"
echo ""
echo "📝 권장 사항:"
echo "   1. 위에서 제안된 버전을 확인하세요"
echo "   2. apps/playground/package.json을 수동으로 업데이트하세요"
echo "   3. 루트에서 'pnpm install'을 실행하세요"
echo ""
echo "⚠️  주의: 'expo install --fix'는 모노레포에서 충돌을 일으킬 수 있습니다"
echo "   수동으로 버전을 관리하는 것을 권장합니다"

