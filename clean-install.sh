#!/bin/bash

echo "🧹 Cleaning all node_modules..."

# Remove root node_modules
rm -rf node_modules

# Remove all package node_modules
rm -rf packages/*/node_modules
rm -rf apps/*/node_modules
rm -rf tools/*/node_modules

# Remove pnpm lock file (optional, uncomment if needed)
# rm -rf pnpm-lock.yaml

# Remove build artifacts
rm -rf packages/*/dist
rm -rf .turbo

# Remove Expo cache
rm -rf apps/playground/.expo
rm -rf apps/playground/node_modules/.cache

echo "✅ Cleanup complete!"
echo ""
echo "📦 Installing dependencies..."

# Install dependencies
pnpm install

echo ""
echo "🎉 Done! Now you can run:"
echo "  pnpm build"
echo "  pnpm prebuild"
