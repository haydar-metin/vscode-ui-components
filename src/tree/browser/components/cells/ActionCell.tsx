/**********************************************************************************
 * Copyright (c) 2025 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License as outlined in the LICENSE file.
 **********************************************************************************/

import React from 'react';
import { CommandDefinition } from '../../../../vscode/webview-types';
import { CDTTreeItem, CDTTreeItemResource, CDTTreeTableActionColumn, CDTTreeTableActionColumnCommand } from '../../../common';

export interface ActionCellProps<T extends CDTTreeItemResource> {
    column: CDTTreeTableActionColumn;
    record: CDTTreeItem<T>;
    actions: CDTTreeTableActionColumnCommand[];
    onAction?: (event: React.UIEvent, command: CommandDefinition, value: unknown, record: CDTTreeItem<T>) => void;
}

const ActionCell = <T extends CDTTreeItemResource>({ record, actions, onAction }: ActionCellProps<T>) => {
    return (
        <div className='tree-actions'>
            {actions.map(action => {
                const handleAction = (e: React.MouseEvent | React.KeyboardEvent) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onAction?.(e, action, action.value, record);
                };
                return (
                    <i
                        key={action.commandId}
                        title={action.title}
                        className={`codicon codicon-${action.icon}`}
                        onClick={handleAction}
                        role='button'
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && handleAction(e)}
                    />
                );
            })}
        </div>
    );
};

export default ActionCell;
