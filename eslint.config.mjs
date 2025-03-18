/**********************************************************************************
 * Copyright (c) 2025 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License as outlined in the LICENSE file.
 **********************************************************************************/

import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import header from 'eslint-plugin-header';

header.rules.header.meta.schema = false;

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
            'object-curly-spacing': ['error', 'always']
        }
    },
    {
        name: 'typescript',
        files: ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.tsx'],
        plugins: {
            typescript: tseslint
        },
        rules: {
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                {
                    accessibility: 'explicit',
                    overrides: {
                        constructors: 'off'
                    }
                }
            ],
            '@typescript-eslint/no-this-alias': 'off',
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_'
                }
            ]
        }
    },
    {
        name: 'header',
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
        plugins: {
            header
        },
        rules: {
            'header/header': [
                2,
                'block',
                [
                    {
                        pattern: '[\n\r]+ \\* Copyright \\([cC]\\) \\d{4}(-\\d{4})? .*[\n\r]+',
                        template: `*********************************************************************************
* Copyright (c) ${new Date().getFullYear()} Company and others.
*
* This program and the accompanying materials are made available under the
* terms of the MIT License as outlined in the LICENSE file.
*********************************************************************************`
                    }
                ],
                2
            ]
        }
    }
);
