// eslint.config.js (at the root of your pnpm monorepo)

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react'; // <-- IMPORT THE CORE REACT PLUGIN
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // 1. Global Ignores for the entire monorepo
  {
    ignores: [
      "**/dist/",
      "**/build/",
      "**/node_modules/",
      "pnpm-lock.yaml",
      "apps/*/dist/",
      "packages/*/dist/",
      "packages/*/coverage/",
      // Add any other globally ignored files/directories
    ],
  },

  // 2. Base Configuration for ALL JavaScript/TypeScript files
  // This applies to everything not ignored.
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], // All relevant JS/TS files
    extends: [
      js.configs.recommended, // ESLint's recommended JS rules
    ],
    languageOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript version
      sourceType: 'module',
      globals: {
        // Common globals - typically browser, but can be extended in overrides
        ...globals.browser,
      },
    },
    rules: {
      // General rules for the entire monorepo
      "no-unused-vars": "warn",
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      // ... more general rules
    },
  },

  // 3. TypeScript Specific Configuration (applies to .ts, .tsx files)
  // This uses type-aware linting and should point to relevant tsconfig files.
  {
    files: [
      // Target application files specifically for type-checked rules
      // Adjust these globs to match your monorepo structure
      "apps/*/src/**/*.{ts,tsx}",
      "packages/*/src/**/*.{ts,tsx}"
    ],
    extends: [
      ...tseslint.configs.recommendedTypeChecked, // <-- Use TypeChecked here!
      // Add more specific TypeScript rules if needed
    ],
    languageOptions: {
      parser: tseslint.parser, // Explicitly set the TypeScript parser
      parserOptions: {
        project: ['./tsconfig.app.json'], // <-- IMPORTANT: Path to your app's tsconfig
        tsconfigRootDir: import.meta.dirname, // <-- IMPORTANT: Needed for project resolution
        // If your tsconfig.app.json is inside apps/my-app, the path from root ESLint:
        // project: ['./apps/my-app/tsconfig.app.json'], // Example for single app
        // For multiple apps, adjust the glob or use a tsconfig.eslint.json at root
        // that includes all your source files.
      },
      // Globals for TS files are usually browser for client apps
      globals: globals.browser,
    },
    rules: {
      // TypeScript-specific rules
      "@typescript-eslint/no-unused-vars": "warn", // Override basic no-unused-vars
      // ... more TypeScript rules
    },
  },

  // 4. React Specific Configuration (applies to JSX/TSX files that are React components)
  {
    files: [
      // Target React component files. Make sure this matches your React app locations.
      "apps/*/src/**/*.{jsx,tsx}",
      "packages/*/src/components/**/*.{jsx,tsx}" // Example for shared React components
    ],
    // Ensure you import 'react' from 'eslint-plugin-react'
    plugins: {
      react, // <-- Add the core React plugin here
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version from dependencies
      },
    },
    rules: {
      // Core React rules
      ...react.configs.recommended.rules, // React plugin's recommended rules
      "react/jsx-uses-react": "off", // Disable if using new JSX transform
      "react/react-in-jsx-scope": "off", // Disable if using new JSX transform

      // React Hooks rules
      ...reactHooks.configs.recommended.rules, // React Hooks recommended rules

      // React Refresh rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // ... other React-specific rules
    },
  },

  // 5. Node.js Specific Configuration (for vite.config.ts, build scripts, etc.)
  {
    files: [
      "apps/*/vite.config.ts", // Your Vite config files
      "packages/*/vite.config.ts",
      "scripts/**/*.ts", // Any root-level scripts
      "packages/*/scripts/**/*.ts" // Any package-level scripts
    ],
    languageOptions: {
      globals: globals.node, // Node.js globals (process, module, require, etc.)
      parser: tseslint.parser, // Explicitly set the TypeScript parser
      parserOptions: {
        // Point to your Node.js specific tsconfig for these files
        project: ['./apps/your-app-name/tsconfig.node.json'], // <-- IMPORTANT: Adjust for YOUR path
        // If you have multiple apps with vite.config.ts, you might need an array
        // or a root tsconfig.eslint.json that covers all such files.
        // For simplicity, you might define individual config blocks for each app's vite.config.ts
        // OR have a single `tsconfig.eslint.json` at root that includes ALL files for linting
        // and point to that.
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "no-console": "off", // Allow console.log in build scripts
      // ... Node.js specific rules
    },
  },

  // 6. Prettier integration (if you use Prettier)
  // Make sure 'eslint-config-prettier' and 'eslint-plugin-prettier' are installed at root
  // {
  //   extends: ['prettier'], // Disables ESLint rules that conflict with Prettier
  //   rules: {
  //     'prettier/prettier': 'error', // Runs Prettier as an ESLint rule
  //   },
  //   plugins: {
  //     prettier: prettierPlugin, // Assuming 'import prettierPlugin from "eslint-plugin-prettier";'
  //   },
  // },
];