/**********************************************************************************
 * Copyright (c) 2025 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License as outlined in the LICENSE file.
 **********************************************************************************/

export function classNames(...classes: (string | Record<string, boolean> | undefined)[]): string {
    return classes
        .map(className => {
            if (!className) {
                return '';
            }
            if (typeof className === 'string') {
                return className;
            }
            return Object.entries(className)
                .filter(([, value]) => value)
                .map(([key]) => key);
        })
        .filter(className => className.length > 0)
        .join(' ');
}
