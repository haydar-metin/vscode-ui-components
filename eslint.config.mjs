// @ts-check

import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['**/node_modules', '**/lib']
    },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.node
            }
        }
    },
    {
        rules: {
            // ESLint Convention
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            indent: [
                'error',
                4,
                {
                    SwitchCase: 1
                }
            ],
            'block-spacing': ['error', 'always'],
            'brace-style': [
                'error',
                '1tbs',
                {
                    allowSingleLine: true
                }
            ],
            'eol-last': ['error'],
            'linebreak-style': ['error', 'unix'],

            // ESLint Best Practices
            'no-console': ['warn'],
            'no-constant-condition': [
                'error',
                {
                    checkLoops: false
                }
            ],

            'no-trailing-spaces': ['error'],
            'object-curly-spacing': ['error', 'always'],

            // TypeScript specific rules
            '@typescript-eslint/no-this-alias': 'off',
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_'
                }
            ]
        }
    }
);
