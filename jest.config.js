module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css)$": "<rootDir>/node_modules/jest-css-modules"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  setupFiles: ["<rootDir>/tests/utils/global.js"],
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/tests/fixtures",
    "<rootDir>/tests/utils",
    "<rootDir>/.vscode",
    "<rootDir>/dist_electron",
    "<rootDir>/coverage",
    "<rootDir>/public",
    "<rootDir>/src/config",
    "<rootDir>/src/locales",
    "<rootDir>/src/store_modules/state.js"
  ],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 60,
      lines: 75,
      statements: 75
    }
  }
};
