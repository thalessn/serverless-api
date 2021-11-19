export default {
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts'],
};
