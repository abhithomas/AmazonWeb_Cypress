// import {defineConfig} from 'cypress'
const { defineConfig } = require('cypress');

module.exports =  defineConfig({
  projectId: 'djhf7x',

    "defaultCommandTimeout": 80000,
    "pageLoadTimeout": 100000,
    "waitForAnimations": true,
    "animationDistanceThreshold": 50,
    "screenshotOnRunFailure": true,
    "video": false,
    "chromeWebSecurity": false,
    "reporter": "mochawesome",
    "reporterOptions": {
        "reportDir": "cypress/results",
        "overwrite": true,
        "html": true,
        "json": false,
    },
    e2e: {
        specPattern: "cypress/e2e/src/specs/**/*.ts",

    },
})
