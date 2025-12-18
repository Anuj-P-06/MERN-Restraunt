export default {
  testEnvironment: "node",

  // Prevent Jest from spawning workers in CI
  maxWorkers: 1,

  // Ignore build & node_modules
  testPathIgnorePatterns: ["/node_modules/"],

  // Clear mocks between tests
  clearMocks: true,
};
