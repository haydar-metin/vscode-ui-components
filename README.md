# VSCode UI Components

This is a VSCode components React library.

## Project Structure

```
src/  
│── base/           # Shared functionality  
│── vscode/         # VSCode specific functionality  

├── <component>/  
│   ├── browser/    # React specific code  
│   ├── common/     # Shared code between browser and VSCode  
│   ├── vscode/     # VSCode integration (converters, webview providers, etc.)  

├── <component>/  
│   ├── *.tsx       # Components without VSCode integration  
```

## Installation

`npm install @eclipse-cdt-cloud/vscode-ui-components`

## Usage

```ts
// Webview
import {
    messenger,
    CDTTree
} from '@eclipse-cdt-cloud/vscode-ui-components/lib/browser';
import React from 'react';
import { createRoot } from 'react-dom/client';

messenger.start();

function App() {  
  return <CDTTree {...} />;  
}

// Render the component
const container = document.getElementById('root');
if (!container) {
    throw new Error('Root element not found');
}
createRoot(container).render(<App />);
```
