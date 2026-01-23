# @fleet-ui/core

## 0.2.1

### Patch Changes

- ## @fleet-ui/cli

  ### Features

  - Add unified logger for consistent logging across CLI commands
  - Improve init command resilience with better error handling
  - Add `--entry` option for custom entry point configuration

  ### Improvements

  - Apply biome lint rules for code consistency

  ## @fleet-ui/components

  ### Bug Fixes

  - Fix rendering issue where root `_layout` styles were not being injected correctly

  ### Improvements

  - Apply biome lint rules for code consistency

  ## @fleet-ui/core

  ### Improvements

  - Apply biome lint rules for code consistency

  ## Documentation

  - Update Node.js version requirement to >=20.19.4 for metro@0.83.2 compatibility
  - Add static HTML setup according to Expo Router guide

## 0.2.0

### Minor Changes

- ### Type Interface Improvements

  - Add explicit type definitions: `FleetBasePalette`, `FleetColorPalette`, `FleetThemeColorSchemes`
  - Improve `FleetThemeMode` and `FleetThemeColors` type structure
  - Update `variants.ts` utility functions with better type safety
  - Add semantic color tokens
