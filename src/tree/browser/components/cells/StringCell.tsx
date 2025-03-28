/**********************************************************************************
 * Copyright (c) 2025 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License as outlined in the LICENSE file.
 **********************************************************************************/

import React, { useCallback } from 'react';
import { CDTTreeItem, CDTTreeItemResource, CDTTreeTableStringColumn, EditableCDTTreeTableStringColumn } from '../../../common';
import EditableStringCell from './EditableStringCell';
import LabelCell from './LabelCell';

interface StringCellProps<T extends CDTTreeItemResource> {
    column: CDTTreeTableStringColumn;
    record: CDTTreeItem<T>;
    editing?: boolean;
    autoFocus?: boolean;
    onSubmit?: (record: CDTTreeItem<T>, newValue: string) => void;
    onCancel?: (record: CDTTreeItem<T>) => void;
    onEdit?: (record: CDTTreeItem<T>, edit: boolean) => void;
}

const StringCell = <T extends CDTTreeItemResource>({
    column,
    record,
    editing = false,
    autoFocus = false,
    onSubmit,
    onCancel,
    onEdit
}: StringCellProps<T>) => {
    const handleSubmit = useCallback((newValue: string) => onSubmit?.(record, newValue), [record, onSubmit]);

    const handleCancel = useCallback(() => onCancel?.(record), [record, onCancel]);

    const handleEdit = useCallback((edit: boolean) => onEdit?.(record, edit), [record, onEdit]);

    return column.edit && onSubmit ? (
        <EditableStringCell
            record={record}
            column={column as EditableCDTTreeTableStringColumn}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onEdit={handleEdit}
            editing={editing}
            autoFocus={autoFocus}
        />
    ) : (
        <LabelCell record={record} column={column} />
    );
};

export default StringCell;
