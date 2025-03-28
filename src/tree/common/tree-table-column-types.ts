/********************************************************************************
 * Copyright (C) 2024-2025 Arm Limited and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License as outlined in the LICENSE File
 ********************************************************************************/

import type { CommandDefinition } from '../../vscode/webview-types';

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
    /**
     * If the column is editable, this property contains the data that is used to provide proper UI for it.
     */
    edit?: EditableData;
}

/**
 * An editable column represents a column that allows to edit a string value.
 */
export interface EditableCDTTreeTableStringColumn extends CDTTreeTableStringColumn {
    /**
     * Contains the data that is used to provide proper UI for it.
     */
    edit: EditableData;
}

export interface EditableCellData {
    type: string;
}

export interface EditableTextData extends EditableCellData {
    type: 'text';
    value: string;
}

export interface EditableEnumData extends EditableCellData {
    type: 'enum';
    options: EditableEnumDataOption[];
    value: string;
}

export interface EditableEnumDataOption {
    label: string;
    value: string;
}

export interface EditableBooleanData extends EditableCellData {
    type: 'boolean';
    value: '0' | '1';
}

export type EditableData = EditableTextData | EditableEnumData | EditableBooleanData;

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

export type CDTTreeTableColumnTypes = CDTTreeTableStringColumn['type'] | CDTTreeTableActionColumn['type'];

/**
 * A column definition for a tree table.
 * This is used to define the columns that are displayed in the tree table.
 */
export interface CDTTreeTableColumnDefinition {
    /**
     * The type of the column. It can be used to show different types of columns.
     */
    type: CDTTreeTableColumnTypes;
    /**
     * The field that is used to get the value for this column. See {@link CDTTreeItem.columns}.
     */
    field: string;
    /**
     * Whether the column is resizable. Default is false.
     * The resize handle is display on the right side.
     * That means the column after this column is also resized.
     */
    resizable?: boolean;
}
