/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import { defineConfig } from 'vitest/config';

const MIN_COVERAGE_PERCENTAGE = 100;

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'istanbul',
      include: ['src/**'],
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/FeatureFlag.tsx', // Temporary exclusion
      ],
      thresholds: {
        statements: MIN_COVERAGE_PERCENTAGE,
        branches: MIN_COVERAGE_PERCENTAGE,
        functions: MIN_COVERAGE_PERCENTAGE,
        lines: MIN_COVERAGE_PERCENTAGE,
      },
    },
  },
});
