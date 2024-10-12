module.exports = {
  testEnvironment: "node",
  testMatch: ["**/*.test.js"],
  setupFilesAfterEnv: ["./tests/testConfig.js"],
  globalTeardown: "./tests/teardown.js",
};
