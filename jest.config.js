/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1", // them dong nay de jest heu duoc alias@
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
