# slate-to-react

React component and utilities to transform [Slate](https://github.com/ianstormtaylor/slate) nodes to React.

## Installation

To install, run one of the following commands:

pnpm:

```sh
pnpm add slate-to-react
```

npm:

```sh
npm i slate-to-react
```

yarn:

```sh
yarn add slate-to-react
```

### Usage

You can render Slate nodes using `SlateView` component:

```tsx
import {createRoot} from "react-dom/client"
import {SlateView} from "slate-to-react"
import type {FC} from "react"

const App: FC = () => (
  <SlateView
    nodes={[
      type: "p",
      children: [{
        text: "Hello, world!"
      }]
    ]}
  />
)

const root = document.querySelector("#root")

createRoot(root).render(<App />)
```
