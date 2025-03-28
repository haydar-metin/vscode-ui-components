/**********************************************************************************
 * Copyright (c) 2025 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License as outlined in the LICENSE file.
 **********************************************************************************/

import classNames from 'classnames';
import React from 'react';
import { createHighlightedText, createLabelWithTooltip } from '../../../../label/label-helpers';
import { CDTTreeItem, CDTTreeItemResource, CDTTreeTableStringColumn } from '../../../common';

export interface LabelCellProps<T extends CDTTreeItemResource> {
    column: CDTTreeTableStringColumn;
    record: CDTTreeItem<T>;
}

const LabelCell = <T extends CDTTreeItemResource>({ column }: LabelCellProps<T>) => {
    const icon = column.icon && <i className={classNames('cell-icon', column.icon)} />;

    const content = column.tooltip
        ? createLabelWithTooltip(<span>{createHighlightedText(column.label, column.highlight)}</span>, column.tooltip)
        : createHighlightedText(column.label, column.highlight);

    return (
        <div className='tree-cell ant-table-cell-ellipsis' tabIndex={0}>
            {icon}
            {content}
        </div>
    );
};

export default React.memo(LabelCell);
