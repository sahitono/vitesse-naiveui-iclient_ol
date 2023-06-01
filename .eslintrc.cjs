/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")
module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "vue/multi-word-component-names": [
      "off",
      {
        ignores: []
      }
    ],
    "no-unref": "off",
    "no-undef": "off",
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "@typescript-eslint/consistent-type-imports": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn"
  }
}
