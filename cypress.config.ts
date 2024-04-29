import {defineConfig} from 'cypress'

export default defineConfig({

    "defaultCommandTimeout": 80000,
    "pageLoadTimeout": 100000,
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
