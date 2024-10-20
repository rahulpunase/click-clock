import js from "@eslint/js";
import noRelativeImportPath from "eslint-plugin-no-relative-import-paths";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{ts,tsx}"],
  ignores: ["dist", "*.stories.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "no-relative-import-paths": noRelativeImportPath,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-relative-import-paths/no-relative-import-paths": [
      "warn",
      {
        allowSameFolder: true,
        rootDir: "src",
      },
    ],
    "constructor-super": "error", // ts(2335) & ts(2377)
    "getter-return": "error", // ts(2378)
    "no-const-assign": "error", // ts(2588)
    "no-dupe-args": "error", // ts(2300)
    "no-dupe-class-members": "error", // ts(2393) & ts(2300)
    "no-dupe-keys": "error", // ts(1117)
    "no-func-assign": "error", // ts(2630)
    "no-import-assign": "error", // ts(2632) & ts(2540)
    "no-new-symbol": "error", // ts(7009)
    "no-obj-calls": "error", // ts(2349)
    "no-setter-return": "error", // ts(2408)
    "no-this-before-super": "error", // ts(2376) & ts(17009)
    "no-unreachable": "error", // ts(7027)
    "no-unsafe-negation": "error", // ts(2365) & ts(2322) & ts(2358)
    // https://github.com/typescript-eslint/typescript-eslint/blob/d948dc4a21ad8e15eec152c0cf2fdda819ea4a3a/packages/eslint-plugin/src/configs/strict.ts
    "no-array-constructor": "error",
    "no-loss-of-precision": "error",

    // ts(2451)
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": "error",
    "@typescript-eslint/default-param-last": "off",
    "react/jsx-key": "error",
  },
});
