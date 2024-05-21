require('dotenv').config({
  path: '.env.test',
})

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  testEnvironment: 'jest-environment-node',
  watchPathIgnorePatterns: ['globalConfig'],
  detectOpenHandles: true,
  testTimeout: 5000,
}
