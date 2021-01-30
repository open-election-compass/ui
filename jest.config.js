module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,ts,vue}',
    '!**/*.stories.js',
    '!**/types.ts',
    '!*.config.js',
    '!src/main.ts',
  ],
  testMatch: ['<rootDir>/src/**/*.spec.{js,ts}'],
};
