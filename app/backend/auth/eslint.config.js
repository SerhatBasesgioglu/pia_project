import globals from "globals";
import pluginJs from "@eslint/js";

export default {
  languageOptions: {
    globals: globals.browser,
  },
  extends: [pluginJs.configs.recommended],
  rules: {
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "function", next: "*" },
      { blankLine: "always", prev: "*", next: "block" },
      { blankLine: "never", prev: "block", next: "block" },
    ],
  },
};
