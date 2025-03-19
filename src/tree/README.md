# Tree

The Tree component is built on top of the [Ant Table](https://ant.design/components/table) with a tree structure and offers functionality for rendering both tree and tree tables (when multiple columns are provided).

## Webview / React

Data retrieval and provisioning for the `CDTTree` component are the developer's responsibility.  
Refer to the component's properties for further details.

> Hint: `CDTTreeItem` corresponds to the `TreeItem` of the [`VS Code Tree Data Provider`](https://code.visualstudio.com/api/extension-guides/tree-view#tree-data-provider).

```ts
// Webview
import { CDTTreeItem } from '@eclipse-cdt-cloud/vscode-ui-components';
import {
    messenger,
    CDTTree
} from '@eclipse-cdt-cloud/vscode-ui-components/lib/browser-types';
import React from 'react';
import { createRoot } from 'react-dom/client';

messenger.start();

function App() {
  // 1) Retrieve the data source (serialized DTOs)
  const dtos: ExampleDTO[] = ...
  // 2) Convert them to CDTTreeItems (recommended: use `CDTTreeResourceConverter`)
  const dataSource: CDTTreeItem[] = treeResourceConverter.convert(dtos, {...})
  return <CDTTree {...} dataSource={dataSource} />;
}

// Render the component
const container = document.getElementById('root');
if (!container) {
    throw new Error('Root element not found');
}
createRoot(container).render(<App />);
```

## VS Code Integration

The component includes a VS Code integration for simplified webview setup.
Its API follows a similar structure to the [VS Code Tree View API](https://code.visualstudio.com/api/extension-guides/tree-view).

### Required Interfaces/Classes

- **`CDTTreeDataProvider`**: Provides the data to render, similar to the Tree View API. Since this data must be transferred to the webview, it should be serializable.
- **`CDTTreeWebviewViewProvider`**: Manages the webview setup; the developer is responsible for registering it with VS Code.
- **[Recommended] `CDTTreeResourceConverter`**: Converts serialized data into `CDTTreeItem`s, allowing separation between data transfer objects and rendered items.

### Example Implementations

#### `CDTTreeDataProvider`

> Hint: `Example` is your domain model, and `ExampleDTO` is the object sent to the webview.

```ts
export class TreeDataProvider implements CDTTreeDataProvider<Example, ExampleDTO> {
    constructor(protected context: vscode.ExtensionContext) {}

    async activate(webview: CDTTreeWebviewViewProvider<Example>): Promise<void> {
        this.context.subscriptions.push(
            webview.onDidClickNode(async event => {
                // Handle click
            }),
            webview.onDidExecuteCommand(async event => {
                // Handle command
            }),
            webview.onDidToggleNode(event => {
                // Handle toggle
            })
        );
    }

    getColumnDefinitions(): CDTTreeTableColumnDefinition[] {
        return [
            { type: 'string', field: 'key' },
            { type: 'string', field: 'value' },
            { type: 'action', field: 'actions' }
        ];
    }

    async getSerializedRoots(): Promise<ExampleDTO[]> {
        const children = ...
        return Promise.all(children.map(c => this.getSerializedData(c)));
    }

    async getSerializedData(element: Example): Promise<ExampleDTO> {
        // Convert Example to ExampleDTO
    }
}
```

#### `CDTTreeWebviewViewProvider`

```ts
export class TreeTableWebView extends CDTTreeWebviewViewProvider<Example> {
    public static viewType = ...;

    constructor(
        protected dataProvider: CDTTreeDataProvider<Example, ExampleDTO>,
        protected context: vscode.ExtensionContext
    ) {
        super(dataProvider, context);
    }

    async activate(context: vscode.ExtensionContext): Promise<void> {
        context.subscriptions.push(
            vscode.window.registerWebviewViewProvider(TreeTableWebView.viewType, this)
        );
    }
}
```

#### `CDTTreeResourceConverter`

> Hint: `CDTTreeItem`s are the items that will be rendered by `CDTTree`.

```ts
export class ExampleConverter implements CDTTreeResourceConverter<ExampleDTO> {
    canHandle(resource: ExampleDTOs): boolean {
        return ExampleDTO.is(resource);
    }

    convert(resource: ExampleDTO, context: CDTTreeConverterContext<ExampleDTOs>): CDTTreeItem<ExampleDTO> {
        return CDTTreeItem.create({
            id: resource.id,
            key: resource.id,
            parent: context.parent,
            resource,
            expanded: context.expandedKeys.includes(resource.id),
            columns: this.getColumns(resource, context)
        });
    }

    private getColumns(resource: ExampleDTO, context: CDTTreeConverterContext<ExampleDTOs>): Record<string, CDTTreeTableColumn> {
        const value = this.getValue(resource, context);

        return {
            key: {
                type: 'string',
                label: resource.key,
                tooltip: this.getTooltipMarkdown(resource, context)
            },
            value: {
                type: 'string',
                label: value,
                tooltip: value
            },
            actions: {
                type: 'action',
                commands: this.getCommands(resource, context)
            }
        };
    }

    private getCommands(resource: ExampleDTO, context: CDTTreeConverterContext<ExampleDTOs>): CDTTreeTableActionColumnCommand[] {
        return [...];
    }

    private getTooltipMarkdown(resource: ExampleDTO, context: CDTTreeConverterContext<ExampleDTOs>): string {
        return ...;
    }
}
```
