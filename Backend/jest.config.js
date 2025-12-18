export default {
  testEnvironment: "node",

  // Required for ES Modules projects
  extensionsToTreatAsEsm: [".js"],

  // Prevent Jest from spawning workers in CI
  maxWorkers: 1,

  // Ignore build & node_modules
  testPathIgnorePatterns: ["/node_modules/"],

  // Clear mocks between tests
  clearMocks: true,
};
