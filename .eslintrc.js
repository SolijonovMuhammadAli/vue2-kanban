module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true, // 'es2021' o'rniga 'es6' dan foydalanamiz
  },
  extends: [
    "plugin:vue/essential", // Vue 2 uchun asosiy qoidalar
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018, // es6 dan keyingi versiyalar uchun mos keltirish, 2018 yetarli
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
};
