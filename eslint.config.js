import eslintPluginPrettier from "eslint-plugin-prettier";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        NodeJS: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: eslintPluginPrettier
    },
    rules: {
      "semi": ["error", "always"], // ESLint pura
      "prettier/prettier": ["error", { "semi": true }], // Prettier integrado con la regla
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "off"
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"]
  }
];
