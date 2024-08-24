import * as typescriptParser from '@typescript-eslint/parser';
import typescript from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';

export default [
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
        },
        plugins: {
            '@typescript-eslint': typescript,
            react,
            'react-hooks': reactHooks,
            prettier,
        },
        rules: {
            ...typescript.configs.recommended.rules,
            ...react.configs.recommended.rules,
            'prettier/prettier': 'error',
            'react/prop-types': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
