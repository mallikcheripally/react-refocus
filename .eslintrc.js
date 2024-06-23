module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    plugins: ["@typescript-eslint", "prettier"],
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true
    },
    rules: {
        "prettier/prettier": "error",
        "react/prop-types": "off"
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};
