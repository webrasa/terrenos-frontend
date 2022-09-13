/* eslint-disable import/no-extraneous-dependencies */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  video: false, // Enable it when needed
});
