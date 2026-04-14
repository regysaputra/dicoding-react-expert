// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import daStyle from "eslint-config-dicodingacademy";
import eslintConfigPrettier from "eslint-config-prettier";
import jestPlugin from "eslint-plugin-jest";

export default defineConfig([{
  files: ["**/*.{js,mjs,cjs,jsx}"],
  plugins: { js },
  extends: ["js/recommended"],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}, {
  files: ["**/*.test.{js,jsx,mjs,cjs}", "**/*.spec.{js,jsx,mjs,cjs}"],
  ...jestPlugin.configs["flat/recommended"],
  languageOptions: {
    globals: {
      ...globals.jest,
    },
  },
}, {
  files: ["cypress/**/*.js", "cypress/**/*.jsx", "**/*.cy.{js,jsx}"],
  ...cypressPlugin.configs.recommended,
  languageOptions: {
    globals: {
      ...cypressPlugin.configs.recommended.languageOptions?.globals,
      cy: true,
      Cypress: true,
      expect: true,
      assert: true,
    },
  },
}, pluginReact.configs.flat.recommended, daStyle, eslintConfigPrettier, ...storybook.configs["flat/recommended"]]);
