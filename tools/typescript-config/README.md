# @fleet-ui/typescript-config

Shared TypeScript configuration for the Fleet UI monorepo.

## Available Configs

### base.json
Base configuration with strict TypeScript settings. Use this for general TypeScript projects.

### react-native.json
Configuration for React Native projects. Includes `jsx: "react-native"` and React Native types.

### react.json
Configuration for React web projects. Includes `jsx: "react-jsx"` and DOM types.

## Usage

Install this package in your workspace package:

```json
{
  "devDependencies": {
    "@my-sdk/typescript-config": "workspace:*"
  }
}
```

Then extend it in your `tsconfig.json`:

### For React Native packages:
```json
{
  "extends": "@my-sdk/typescript-config/react-native.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

### For React web packages:
```json
{
  "extends": "@my-sdk/typescript-config/react.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

## Features

- Strict type checking
- Source maps and declarations
- Modern ES2020 target
- Optimized for React Native and Web

