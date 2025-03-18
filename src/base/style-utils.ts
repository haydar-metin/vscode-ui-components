/**********************************************************************************
 * Copyright (c) 2025 Company and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License as outlined in the LICENSE file.
 **********************************************************************************/

export function classNames(...classes: (string | Record<string, boolean>)[]): string {
    return classes
        .filter(c => c !== undefined)
        .map(c => {
            if (typeof c === 'string') {
                return c;
            }

            return Object.entries(c)
                .filter(([, value]) => value)
                .map(([key]) => key);
        })
        .join(' ');
}
