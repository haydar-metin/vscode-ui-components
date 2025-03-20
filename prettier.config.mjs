/**********************************************************************************
 * Copyright (c) 2025 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License as outlined in the LICENSE file.
 **********************************************************************************/

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export default {
    singleQuote: true,
    jsxSingleQuote: true,
    arrowParens: 'avoid',
    trailingComma: 'none',
    endOfLine: 'lf',
    printWidth: 140,
    tabWidth: 4,
    overrides: [
        {
            files: ['*.json', '*.yml'],
            options: {
                printWidth: 140,
                tabWidth: 4
            }
        }
    ],
    plugins: ['prettier-plugin-packagejson']
};
