/********************************************************************************
 * Copyright (C) 2024 Arm Limited and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License as outlined in the LICENSE File
 ********************************************************************************/

import type { NotificationType } from 'vscode-messenger-common';
import type { CDTTreeExtensionModel } from './tree-model-types';

export interface CDTTreeNotificationContext {
    /**
     * If true or undefined, the tree will be resynced.
     */
    resync?: boolean;
}

export interface CDTTreeNotification<T> {
    context?: CDTTreeNotificationContext;
    data: T;
}

export interface CDTTreeTerminatedEvent<T> {
    /**
     * The number of remaining trees.
     */
    remaining: number;
    data: T;
}

export interface CDTTreeExecuteCommand {
    commandId: string;
    itemId: string;
    value?: unknown;
}

export namespace CDTTreeMessengerType {
    export const updateState: NotificationType<CDTTreeExtensionModel> = { method: 'updateState' };
    export const ready: NotificationType<void> = { method: 'ready' };

    export const executeCommand: NotificationType<CDTTreeNotification<CDTTreeExecuteCommand>> = { method: 'executeCommand' };
    export const toggleNode: NotificationType<CDTTreeNotification<string>> = { method: 'toggleNode' };
    export const clickNode: NotificationType<CDTTreeNotification<string>> = { method: 'clickNode' };
    export const openSearch: NotificationType<void> = { method: 'openSearch' };
}
