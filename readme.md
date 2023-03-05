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

1. You can render Slate nodes using `SlateView` component:

```tsx
import {createRoot} from "react-dom/client"
import type {FC} from "react"

import {SlateView} from "slate-to-react"

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

2. Alternatively you can use `transformNodes` function in your own component:

```tsx
import {createRoot} from "react-dom/client"
import type {FC} from "react"
import {useMemo} from "react"

import type {Node} from "slate-to-react"
import {transformNodes} from "slate-to-react"

interface MySlateViewProps {
  nodes: Node[]
}

const MySlateView: FC<SMylateToReactProps> = ({nodes}) => {
  const view = useMemo(() => transformNodes(nodes), [nodes])

  return (
    <div>
      <h1>Post title</h1>

      <div>
        {view}
      </div>
    </div>
  )
}

const App: FC = () => (
  <MySlateView
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
