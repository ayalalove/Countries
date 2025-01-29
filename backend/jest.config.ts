import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // משתמש ב-ts-jest כ-prepreset
  testEnvironment: 'node', // משתמש בסביבה של Node.js
  transform: {
    '^.+\\.ts$': 'ts-jest', // טרנספייל קבצי TypeScript
  },
};

export default config;
