import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import {defineConfig, globalIgnores} from 'eslint/config';

// 和之前的 React 课一样，只是多了 typescript-eslint，让 ESLint 读得懂 .ts / .tsx
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      eqeqeq: 'error',
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },
]);
