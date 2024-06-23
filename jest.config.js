module.exports = {
    testEnvironment: "node",
    testPathIgnorePatterns: ["/node_modules/", "/lib/"],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json"
        }
    }
};
