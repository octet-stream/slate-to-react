# slate-to-react

React component and utilities to transform [Slate](https://github.com/ianstormtaylor/slate) nodes to React.

[![codecov](https://codecov.io/gh/octet-stream/slate-to-react/branch/main/graph/badge.svg?token=MBkEyEwJO6)](https://codecov.io/gh/octet-stream/slate-to-react)
[![CI](https://github.com/octet-stream/slate-to-react/actions/workflows/ci.yml/badge.svg)](https://github.com/octet-stream/slate-to-react/actions/workflows/ci.yml)
[![ESLint](https://github.com/octet-stream/slate-to-react/actions/workflows/eslint.yml/badge.svg)](https://github.com/octet-stream/slate-to-react/actions/workflows/eslint.yml)
[![TypeScript Types](https://github.com/octet-stream/slate-to-react/actions/workflows/typescript.yml/badge.svg)](https://github.com/octet-stream/slate-to-react/actions/workflows/typescript.yml)

## Roadmap

- [x] Minimal implementation with default transforms;
- [x] Support custom transforms.

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

2. You can also transform Slate nodes via `useSlateToReact` hook used inside `SlateView` component:

```tsx
import {createRoot} from "react-dom/client"
import type {FC} from "react"

import {useSlateToReact} from "slate-to-react"

const App: FC = () => {
  // This hook returns a signle ReactElement, so you can even return it from your component, no need for `React.Fragment` or any wrapper element.
  const view = useSlateToReact([
    type: "p",
    children: [{
      text: "Hello, world!"
    }]
  ])

  return (
    <div>
      <div>
        Transformed Slate nodes:
      </div>

      <div>
        {view}
      </div>
    </div>
  )
}

const root = document.querySelector("#root")

createRoot(root).render(<App />)
```

3. Alternatively you can use `transformNodes` function in your own component:

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

## API

### `SlateView`

React component that will render given `nodes` as React elements.

This component takes following props:

| Name       | Type         | Required  | Default | Description                         |
|------------|:------------:|:---------:|:-------:|-------------------------------------|
| nodes      | `Node[]`     | Yes       | —       | List of `Slate` nodes to transform  |
| transforms | `Transforms` | No        | —       | Custom transforms for `Slate` nodes |

### `useSlateToReact(nodes)`

React hook that transforms given Slate nodes to React elements and memoizes the result.

This hook takes following arguments:

| Name    | Type                    | Required  | Default | Description                        |
|---------|:-----------------------:|:---------:|:-------:|------------------------------------|
| nodes   | `Node[]`                | Yes       | —       | List of `Slate` nodes to transform |
| options | `TransformNodesOptions` | No        | —       | Additional transform options       |

### `transformNodes(nodes)`

Transforms given Slate `nodes` to react elements.

This function takes following arguments:

| Name    | Type                    | Required  | Default | Description                        |
|---------|:-----------------------:|:---------:|:-------:|------------------------------------|
| nodes   | `Node[]`                | Yes       | —       | List of `Slate` nodes to transform |
| options | `TransformNodesOptions` | No        | —       | Additional transform options       |

Returns `ReactElement`. All nodes will be wrapped within `React.Fragment`, so you can even return them from your components as-is.

### `createLeafNodeMatcher(matcher)`

Takes `matcher` implementation as the first argument and applies proper types to given function. This will only be useful for TypeScript users. If you use JavaScript - you can write matcher without it, because matchers are just regular functions that returns `boolean`.

| Name    | Type                     | Required  | Default | Description                                 |
|---------|:------------------------:|:---------:|:-------:|---------------------------------------------|
| matcher | `LeafNodeMatcher<TLeaf>` | Yes       | —       | A `LeafNodeMatcher` implementation function |

Returns `LeafNodeMatcher<TLeaf>` matcher, where `TLeaf` type parameter defaults to Slate's `Text` node. Because `crateLeafNodeMatcher` is a generic function, it will use actual `TLeaf` type depending on what you give as type parameter.

Now let's create a `RichText` matcher, just for a quick demonstration:

```ts
import {Text} from "slate"

import {createLeafNodeMatcher} from "slate-to-react"

export interface RichText extends Text {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  superscript?: boolean
  subscript?: boolean
  code?: boolean
}

export const isRichText = createLeafNodeMatcher<RichText>(
  (node): node is LeafProps<RichText> => (
    typeof node.leaf.text === "string" && !!(
      typeof node.leaf.bold === "boolean"
        || typeof node.leaf.italic === "boolean"
        || typeof node.leaf.strikethrough === "boolean"
        || typeof node.leaf.underline === "boolean"
        || typeof node.leaf.code === "boolean"
        || typeof node.leaf.superscript === "boolean"
        || typeof node.leaf.subscript === "boolean"
    )
  )
)
```

This `isRichText` matcher will match only `Text` nodes that have at least one of text formatting property from `RichText` interface.

Note how we call `createLeafMatcher` with explicit `RichText` type parameter. That way the implementation will get proper types for `node` argument.

It is also important to mention that `matcher` implementation **must** return `node is LeafProps<TLeaf>` and not just `boolean`. In our case `TLeaf` will be `RichText`.

### `createElementNodeMatcher(matcher)`

This is similar to `createLeafNodeMarcher`, but applies types for `ElementNodeMatcher` to given implementation.

| Name    | Type                           | Required  | Default | Description                                     |
|---------|:------------------------------:|:---------:|:-------:|-------------------------------------------------|
| matcher | `ElementNodeMatcher<TElement>` | Yes       | —       | An `ElementNodeMatcher` implementation function |

Returns `ElementNodeMatcher<TElement>` matcher, where `TElement` defaults to `Node<string>` which inherits Slate's `Element` type.

Let's now make a simple `Link` matcher as the example:

```ts
import {createElementNodeMatcher} from "slate-to-react"
import type {Node, Replace} from "slate-to-react"

import {Text} from "slate"

export type Link = Replace<Node, {
  children: Text[]
}>

export const isLink = createElementNodeMatcher<Link>(
  (node): node is ElementProps<Link> => (
    node.element.type === ELEMENT_LINK && typeof node.element.url === "string"
  )
)
```

### `createLeafTransform(matcher, transform)`

Creates a leaf node transform. It takes `LeafNodeMatcher` as the first argument to match any specific node during `transformNodes` call, and `transform` implementation as the second argument. This transform implementation then will be called for each matched node to create a `ReactElement` for this node.

| Name      | Type                             | Required  | Default | Description                                          |
|-----------|:--------------------------------:|:---------:|:-------:|------------------------------------------------------|
| matcher   | `LeafNodeMatcher<TLeaf>`         | Yes       | —       | A `LeafNodeMatcher` implementation function          |
| transform | `TransformImplementation<TLeaf>` | Yes       | —       | Transform implementation to render matched node with |

Returns `LeafTransform<TLeaf>`, where `TLeaf` type parameter defaults to Slate's `Text` node. The actual value will be infered from `TLeafMatcher` type, so that `transform` implementation will get proper types for it `props` argument.

For this example, let's implement a transform for `RichText` node.

```tsx
import {createLeafTransform} from "slate-to-react"

// These were implemented at one of examples above.
import type {RichText} from "./matcher/isRichText.js"
import {isRichText} from "./matcher/isRichText.js"

export const RichText = createLeafTransform(
  isRichText,

  ({attributes, leaf, children}) => {
    // Render <br /> for empty text blocks as it's probably just an empty line
    if (!children) {
      return <br {...attributes} />
    }

    let element: ReactNode = children

    if (leaf.bold) {
      element = <strong>{element}</strong>
    }

    if (leaf.italic) {
      element = <i>{element}</i>
    }

    if (leaf.underline) {
      element = <u>{element}</u>
    }

    if (leaf.strikethrough) {
      element = <s>{element}</s>
    }

    if (isSuperscriptRichText(leaf)) {
      element = <sup>{element}</sup>
    } else if (isSubscriptRichText(leaf)) {
      element = <sub>{element}</sub>
    }

    if (leaf.code) {
      element = <code>{element}</code>
    }

    return <span {...attributes}>{element}</span>
  }
)
```

### `createElementTransform(matcher, transform)`

Creates an element node transform. It takes `ElementNodeMatcher` as the first argument to match any specific node during `transformNodes` call, and `transform` implementation as the second argument. This transform implementation then will be called for each matched node to create a `ReactElement` for this node.

| Name      | Type                                | Required  | Default | Description                                          |
|-----------|:-----------------------------------:|:---------:|:-------:|------------------------------------------------------|
| matcher   | `ElementNodeMatcher<TElement>`      | Yes       | —       | An `ElementNodeMatcher` implementation function      |
| transform | `TransformImplementation<TElement>` | Yes       | —       | Transform implementation to render matched node with |

Returns `ElementTransform<TElement>`, where `TElement` defaults to `Node<string>` which inherits Slate's `Element` type.

Following example implements a transform for `Link` type:

```tsx
import {createElementTransform} from "slate-to-react"

// These were implemented at one of examples above.
import type {Link} from "./matcher/isLink.js"
import {isLink} from "./matcher/isLink.js"

export const Link = createElementTransform(
  isLink,

  ({attributes, element, children}) => (
    <a {...attributes} href={element.url}>
      {children}
    </a>
  )
)
```
