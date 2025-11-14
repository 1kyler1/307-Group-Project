import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**", "dist/**", "coverage/**", "uploads/**"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": "off",
    },
  },
];
