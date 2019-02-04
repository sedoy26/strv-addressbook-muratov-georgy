module.exports = {
  extends: "eslint:recommended",
  env: {
    es6: true,
    browser: true,
    amd: true,
    node: true
  },
  rules: {
    "comma-dangle": 0,
    "no-unused-vars": "warn",
    "no-console": 1,
    "no-unexpected-multiline": "warn",
    "no-extra-semi": true
  }
};
