module.exports = {
    "roots": [
        "<rootDir>/test"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    coverageReporters: ["html", "lcov"],
    globalSetup: require.resolve("./jest.setup.js")
}