/********************************************************************************
 * Copyright (C) 2023-2024 Marcel Ball, Arm Limited and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License as outlined in the LICENSE File
 ********************************************************************************/

export interface VSCodeContext {
    'data-vscode-context': string;
}

export namespace VSCodeContext {
    export function create(context: object): VSCodeContext {
        return {
            'data-vscode-context': JSON.stringify({
                ...context,
            })
        };
    }
}

/**
 * A command definition that is manually inserted into the DOM and not by VSCode.
 */
export interface CommandDefinition {
    commandId: string;
    icon: string;
    title?: string;
}
