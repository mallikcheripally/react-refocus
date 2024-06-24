module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'prettier/prettier': 'error',
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
};
