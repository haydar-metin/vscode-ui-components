/********************************************************************************
 * Copyright (C) 2024 Arm Limited and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License as outlined in the LICENSE File
 ********************************************************************************/

import type { CommandDefinition } from '../../vscode/webview-types';


/**
 * A column definition for a tree table.
 * This is used to define the columns that are displayed in the tree table.
 */
export interface CDTTreeTableColumnDefinition {
    /**
     * The type of the column. It can be used to show different types of columns.
     */
    type: string;
    /**
     * The field that is used to get the value for this column. See {@link CDTTreeItem.columns}.
     */
    field: string;
}

/**
 * A string column represents a column that displays a string value.
 */
export interface CDTTreeTableStringColumn {
    type: 'string';
    icon?: string;
    label: string;
    colSpan?: number | 'fill';
    /**
     * Allows to highlight parts of the string.
     */
    highlight?: [number, number][];
    /**
     * The tooltip that is displayed when hovering over the string.
     */
    tooltip?: string;
}

/**
 * An action column represents a column that displays multiple interactable buttons/icons.
 */
export interface CDTTreeTableActionColumn {
    type: 'action';
    commands: CDTTreeTableActionColumnCommand[];
}

/**
 * A command that can be executed when clicking on a button/icon in an action column.
 */
export interface CDTTreeTableActionColumnCommand extends CommandDefinition {
    /**
     * The value that is passed to the command when it is executed.
     */
    value?: unknown;
}

export type CDTTreeTableColumn = CDTTreeTableStringColumn | CDTTreeTableActionColumn;
