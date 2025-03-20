/********************************************************************************
 * Copyright (C) 2024-2025 EclipseSource, Arm Limited and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License as outlined in the LICENSE File
 ********************************************************************************/

import { VSCodeContext } from '../../vscode/webview-types';
import type { CDTTreeTableColumn, CDTTreeTableColumnDefinition } from './tree-table-column-types';

// ==== Items ====

export interface CDTTreeItemResource {
    __type: string;
}

/**
 * A tree item that is used in the CDT tree view.
 */
export interface CDTTreeItem<T extends CDTTreeItemResource = CDTTreeItemResource> {
    __type: 'CDTTreeItem';
    id: string;
    key: string;
    parent?: CDTTreeItem<CDTTreeItemResource>;
    children?: CDTTreeItem<T>[];
    /**
     * The resource that this tree item represents. This can be any type of object.
     */
    resource: T;
    /**
     * The columns that are displayed for this tree item.
     */
    columns?: Record<string, CDTTreeTableColumn>;
    /**
     * Whether this item is pinned. Undefined means that the item can not be pinned.
     */
    pinned?: boolean;
    /**
     * Whether this item is expanded. Undefined means that the item is not expanded.
     */
    expanded?: boolean;
    /**
     * Whether this item is matched by the current filter. Undefined means that the item is not matched.
     */
    matching?: boolean;
}

export namespace CDTTreeItem {
    export function create<TResource extends CDTTreeItemResource>(options: Omit<CDTTreeItem<TResource>, '__type'>): CDTTreeItem<TResource> {
        return {
            __type: 'CDTTreeItem',
            ...options
        };
    }

    export function createRoot(): CDTTreeItem<CDTTreeItemResource> {
        return create<CDTTreeItemResource>({
            id: 'root',
            key: 'root',
            resource: { __type: 'root' },
            children: []
        });
    }

    export function isRoot(item: CDTTreeItem): boolean {
        return item.id === 'root';
    }
}

// ==== Model ====

/**
 * The model that is used to initialize the CDT tree view.
 * It is passed to the webview when the tree view is created / updated.
 */
export interface CDTTreeExtensionModel<TItems = unknown> {
    items?: TItems[];
    columnFields?: CDTTreeTableColumnDefinition[];
}

/**
 * The view model that is used to update the CDT tree view.
 * It is the actual model that is used to render the tree view.
 */
export interface CDTTreeModel<TItem extends CDTTreeItemResource = CDTTreeItemResource> {
    items: CDTTreeItem<TItem>[];
    expandedKeys: string[];
    pinnedKeys: string[];
}

export interface CDTTreeWebviewContext {
    webviewSection: string;
    cdtTreeItemId: string;
    cdtTreeItemType: string;
}

export namespace CDTTreeWebviewContext {
    export function is(context: object): context is CDTTreeWebviewContext {
        return 'cdtTreeItemId' in context;
    }

    export function create(context: CDTTreeWebviewContext): VSCodeContext {
        return VSCodeContext.create(context);
    }
}
