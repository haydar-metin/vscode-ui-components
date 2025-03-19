/********************************************************************************
 * Copyright (C) 2024-2025 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License as outlined in the LICENSE File
 ********************************************************************************/

import * as vscode from 'vscode';
import type { CDTTreeNotification, CDTTreeTableColumnDefinition, CDTTreeTerminatedEvent } from '../common';
import type { MaybePromise } from '../../base/utils';

/**
 * A tree data provider that provides data for the CDTTree.
 *
 * The CDTTree uses it's own tree item model. This data provider is responsible for converting the domain model
 * to serialized items that are actually send to the webview.
 * Those serialized items are then used as a basis for the CDTTree.
 *
 * @param TNode The type of the tree nodes in the domain model.
 * @param TSerializedNode The type of the serialized tree nodes. Those are the nodes that
 * are actually send to the webview to be displayed in the tree.
 */
export interface CDTTreeDataProvider<TNode, TSerializedNode> {
    /**
     * An event that is fired when the tree is disposed / terminated.
     */
    onDidTerminate: vscode.Event<CDTTreeTerminatedEvent<TNode>>;

    /**
     * An event that is fired when the tree data changes.
     */
    onDidChangeTreeData: vscode.Event<CDTTreeNotification<TNode | TNode[] | undefined | null>>;

    /**
     * Get the column definitions for the tree table.
     */
    getColumnDefinitions(): CDTTreeTableColumnDefinition[];

    /**
     * Get the root elements of the tree.
     */
    getSerializedRoots(): MaybePromise<TSerializedNode[]>;

    /**
     * Get the serialization of the given element.
     */
    getSerializedData(element: TNode): MaybePromise<TSerializedNode>;
}
