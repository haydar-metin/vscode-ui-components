# UI Components for Visual Studio Code Extensions

This is a VS Code components React library.

## Project Structure

```
src/
│── base/           # Shared functionality
│── vscode/         # VS Code specific functionality

├── <component>/
│   ├── browser/    # React specific code
│   ├── common/     # Shared code between browser and VS Code
│   ├── vscode/     # VS Code integration (converters, webview providers, etc.)

├── <component>/
│   ├── *.tsx       # Components without VS Code integration
```

## Installation

`npm install @eclipse-cdt-cloud/vscode-ui-components`

## Components

- [Tree](./src/tree/README.md): A component that combines tree structure functionality with table capabilities.

For usage information, refer to the component's README.
