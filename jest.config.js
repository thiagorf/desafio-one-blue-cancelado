module.exports = {
    clearMocks: true,

    preset: "ts-jest",

    testEnvironment: "node",
    testRegex: ".*\\.spec\\.ts$",
    setupFilesAfterEnv: ["<rootDir>/singleton.ts"],
};
