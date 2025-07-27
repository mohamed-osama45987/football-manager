const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  setupFilesAfterEnv: ["./testSetup.ts"],
  testMatch: ["**/routes/**/*.test.ts"],
  forceExit: true, 
  detectOpenHandles: true, 
  verbose: true,
};
