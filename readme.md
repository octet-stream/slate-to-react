# slate-to-react

React component and utilities to transform [Slate](https://github.com/ianstormtaylor/slate) nodes to React.

[![codecov](https://codecov.io/gh/octet-stream/slate-to-react/branch/main/graph/badge.svg?token=MBkEyEwJO6)](https://codecov.io/gh/octet-stream/slate-to-react)
[![CI](https://github.com/octet-stream/slate-to-react/actions/workflows/ci.yml/badge.svg)](https://github.com/octet-stream/slate-to-react/actions/workflows/ci.yml)
[![ESLint](https://github.com/octet-stream/slate-to-react/actions/workflows/eslint.yml/badge.svg)](https://github.com/octet-stream/slate-to-react/actions/workflows/eslint.yml)

## Installation

To install, run one of the following commands:

pnpm:

```sh
pnpm add slate-to-react slate slate-react
```

npm:

```sh
npm i slate-to-react slate slate-react
```

yarn:

```sh
yarn add slate-to-react slate slate-react
```

### Usage

1. You can render Slate nodes using [`SlateView`](#slateview) component:

```tsx
"use client"
// You can use `slate-to-react` with a framework like Next.js (with its App Router) the above directive might be a way to mark "client component".
// Yuo *must* render SlateView within the client components, because it relies on `useMemo` hook.

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

**IMPORTANT**: Note that by default `slate-to-react` will generate a unique `id` for each node using [`nanoid`](https://github.com/ai/nanoid) to use it as `key` property of each rendered React component, which is not recommended as the `key` property **must** remain consistent between renders.
You can opt-out by enabling strict mode in `SlateView`, or `useSlateToReact`, or `transformNodes` options.
When enabled, `NodeNoIdFieldError` will be thrown if any node without the `id` field is encountered.

2. Use can use `slate-to-react` with React Server Components too. For that use `transformNodes` function directly:

```ts
import type {FC} from "react"

import type {Node} from "slate-to-react"
import {transformNodes} from "slate-to-react"

interface Props {
  nodes: Node[]
}

// This could be a React Server Component
// The `transformNodes` function returns a signle `ReactElement` node, so it's a valid result for Function Component.
// Or you can put `transformNodes` call in to the other's component `children` property.
const MySlateView: FC<Props> = ({nodes}) => transformNodes(nodes)
```

3. You can also transform Slate nodes via [`useSlateToReact`](#useslatetoreactnodes-options) hook used inside `SlateView` component:

```tsx
import {createRoot} from "react-dom/client"
import type {FC} from "react"

import {useSlateToReact} from "slate-to-react"

const App: FC = () => {
  // This hook returns a signle ReactElement, so you can even return it from your component, no need for `React.Fragment` or any wrapper element.
  const view = useSlateToReact([
    id: "1",
    type: "p",
    children: [{
      id: "2",
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

4. You can use [`transformNodes`](#transformnodesnodes-options) function directly in your client components as well:

```tsx
"use client"

import {createRoot} from "react-dom/client"
import type {FC} from "react"
import {useMemo} from "react"

import type {Node} from "slate-to-react"
import {transformNodes} from "slate-to-react"

interface MySlateViewProps {
  nodes: Node[]
}

const MySlateView: FC<MySlateViewProps> = ({nodes}) => {
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
      id: "1",
      type: "p",
      children: [{
        id: "2",
        text: "Hello, world!"
      }]
    ]}
  />
)

const root = document.querySelector("#root")

createRoot(root).render(<App />)
```

5. You can define and use custom transforms to control the output for each node. For this example, let's define Link transformer. It will render [`next/link`](https://nextjs.org/docs/api-reference/next/link) component for website-own links and `<a>` tag for links to external resources:

```tsx
"use client"

import {
  SlateView,
  createElementNodeMatcher,
  createElementTransform
} from "slate-to-react"

import type {Node, Replace} from "slate-to-react"
import type {Text} from "slate"
import type {FC} from "react"

import NextLink from "next/Link"

import {isInternalUrl} from "./utils/isInternalUrl.js"

type Link = Replace<Node<"a">, {
  url: string
  children: Text[]
}>

// First of all, we need a matcher for `Link` element node.
// Node that slate-to-react has a bunch of builtin matchers, including `isLink`, so you can skip this step
export const isLink = createElementNodeMatcher<Link>(
  (node): node is Link => (
    node.type === "a" && typeof node.url === "string"
  )
)

// Then define a transform for this element. Transform factory function takes two arguments:
// 1. Node matcher. In this case that would be our `isLink` marcher, which implements `ElementMatcher` type.
// 2. Transformer implementation. This function takes `ElementProps` as an argument, and should return `ReactElement` for this node.
export const Anchor = createElementTransform(
  isLink,

  ({key, element, attributes, children}) => (
    isInternalUrl(element.url)
      ? (
        <NextLink {...attributes} href={element.url} key={key}>
          {children}
        </NextLink>
      )
      : (
        <a {...attributes} href={element.url} rel="noopener noreferrer" target="_blank" key={key}>
          {children}
        </a>
      )
  )
)

export const MyComponent: FC = () => (
  <SlateView
    transforms={{
      elements: [Anchor] // With that, `SlateView` component will render `Anchor` nodes using our own transform, instead of default.
    }}
    nodes={[
      {
        id: "1",
        type: "p",
        children: [{ // This node will be rendered as regular `<a>` tag because its url points to an external resource
          id: "2",
          type: "a",
          url: "https://example.com",
          children: [{
            id: "3",
            text: "External link to example.com"
          }]
        }]
      },
      {
        id: "4",
        type: "p",
        children: [{ // This node will be rendered using `next/link` component, because it has an internal url
          id: "5",
          type: "a",
          url: "/about",
          children: [{
            id: "6",
            text: "About page"
          }]
        }]
      }
    ]}
  />
)
```

## API

### `SlateView`

React component that will render given `nodes` as React elements.

Available props listed in [`SlateViewProps`](#type-slateviewprops) interface section.

### `useSlateToReact(nodes[, options])`

React hook that transforms given Slate nodes to React elements and memoizes the result.

This hook takes following arguments:

| Name    | Type                                                   | Required  | Default | Description                        |
|---------|:------------------------------------------------------:|:---------:|:-------:|------------------------------------|
| nodes   | `Node[]`                                               | Yes       | —       | List of `Slate` nodes to transform |
| options | [`TransformNodesOptions`](#type-transformnodesoptions) | No        | —       | Additional transform options       |

### `transformNodes(nodes[, options])`

Transforms given Slate `nodes` to react elements.

This function takes following arguments:

| Name    | Type                                                   | Required  | Default | Description                        |
|---------|:------------------------------------------------------:|:---------:|:-------:|------------------------------------|
| nodes   | `Node[]`                                               | Yes       | —       | List of `Slate` nodes to transform |
| options | [`TransformNodesOptions`](#type-transformnodesoptions) | No        | —       | Additional transform options       |

Returns `ReactElement`. All nodes will be wrapped within `React.Fragment`, so you can even return them from your components as-is.

### `createLeafNodeMatcher(matcher)`

Takes `matcher` implementation as the first argument and applies proper types to given function. This will only be useful for TypeScript users. If you use JavaScript - you can write matcher without it, because matchers are just regular functions that returns `boolean`.

| Name    | Type                     | Required  | Default | Description                                 |
|---------|:------------------------:|:---------:|:-------:|---------------------------------------------|
| matcher | `LeafNodeMatcher<TLeaf>` | Yes       | —       | A `LeafNodeMatcher` implementation function |

Returns `LeafNodeMatcher<TLeaf>` matcher, where `TLeaf` type parameter defaults to Slate's `Text` node. Because `crateLeafNodeMatcher` is a generic function, it will use actual `TLeaf` type depending on what you give as type parameter.

Now let's create a `RichText` matcher, just for a quick demonstration:

```ts
import type {Text} from "slate"

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
  (node): node is RichText => (
    typeof node.text === "string" && !!(
      typeof node.bold === "boolean"
        || typeof node.italic === "boolean"
        || typeof node.strikethrough === "boolean"
        || typeof node.underline === "boolean"
        || typeof node.code === "boolean"
        || typeof node.superscript === "boolean"
        || typeof node.subscript === "boolean"
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
  (node): node is Link => (
    node.type === "a" && typeof node.url === "string"
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

  ({key, attributes, leaf, children}) => {
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

    if (leaf.superscript) {
      element = <sup>{element}</sup>
    } else if (leaf.subscript) {
      element = <sub>{element}</sub>
    }

    if (leaf.code) {
      element = <code>{element}</code>
    }

    return <span {...attributes} key={key}>{element}</span>
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
import {isLink} from "./matcher/isLink.js"

export const Link = createElementTransform(
  isLink,

  ({key, attributes, element, children}) => (
    <a {...attributes} href={element.url} key={key}>
      {children}
    </a>
  )
)
```

### `isText(node)`

Matches `Text` nodes, with or without formatting.

| Name       | Type   | Required  | Default | Description                         |
|------------|:------:|:---------:|:-------:|-------------------------------------|
| node       | `Text` | Yes       | —       | A Slate `Leaf` node to test         |

Returns `true` when given node is a `Text` node.

### `isParagraph(node)`

Matches `Paragraph` nodes.

| Name       | Type        | Required  | Default | Description                         |
|------------|:-----------:|:---------:|:-------:|-------------------------------------|
| node       | `Paragraph` | Yes       | —       | A Slate `Element` node to test      |

Returns `true` when given node is a `Paragraph` node.

### `isLink(node)`

Matches `Link` nodes.

| Name       | Type   | Required  | Default | Description                         |
|------------|:------:|:---------:|:-------:|-------------------------------------|
| node       | `Link` | Yes       | —       | A Slate `Element` node to test      |

Returns `true` when given node is a `Link` node.

### `isBlockquote(node)`

Matches `Blockqoute` nodes.

| Name       | Type         | Required  | Default | Description                         |
|------------|:------------:|:---------:|:-------:|-------------------------------------|
| node       | `Blockquote` | Yes       | —       | A Slate `Element` node to test      |

Returns `true` when given node is a `Blockqoute` node.

### `isHeading(node)`

Matches `Heading` nodes of every valid level (H1-H6).

| Name       | Type      | Required  | Default | Description                         |
|------------|:---------:|:---------:|:-------:|-------------------------------------|
| node       | `Heading` | Yes       | —       | A Slate `Element` node to test      |

Returns `true` when given node is a `Heading` node.

### `isH1(node)`

Matches `H1` heading nodes.

| Name       | Type            | Required  | Default | Description                         |
|------------|:---------------:|:---------:|:-------:|-------------------------------------|
| node       | `Heading<"h1">` | Yes       | —       | A Slate `Element` node to test      |

Returns `true` when given node is a `Heading<"h1">` node.

### `isH2(node)`

Matches `H2` heading nodes.

| Name       | Type            | Required  | Default | Description                         |
|------------|:---------------:|:---------:|:-------:|-------------------------------------|
| node       | `Heading<"h2">` | Yes       | —       | A Slate `Element` node to test      |

Returns `true` when given node is a `Heading<"h2">` node.

### `isH3(node)`

Matches `H3` heading nodes.

| Name       | Type             | Required  | Default | Description                         |
|------------|:----------------:|:---------:|:-------:|-------------------------------------|
| node       | `Heading<<"h3">` | Yes       | —       | A Slate `Element` node to test      |

Returns `true` when given node is a `Heading<"h3">` node.

### `isH4(node)`

Matches `H4` heading nodes.

| Name       | Type            | Required  | Default | Description                         |
|------------|:---------------:|:---------:|:-------:|-------------------------------------|
| node       | `Heading<"h4">` | Yes       | —       | A Slate `Element` node to test      |

Returns `true` when given node is a `Heading<"h4">` node.

### `isH5(node)`

Matches `H5` heading nodes.

| Name       | Type            | Required  | Default | Description                         |
|------------|:---------------:|:---------:|:-------:|-------------------------------------|
| node       | `Heading<"h5">` | Yes       | —       | A Slate `Element` node to test      |

Returns `true` when given node is a `Heading<"h5">` node.

### `isH6(node)`

Matches `H6` heading nodes.

| Name       | Type            | Required  | Default | Description                         |
|------------|:---------------:|:---------:|:-------:|-------------------------------------|
| node       | `Heading<"h6">` | Yes       | —       | A Slate `Element` node to test      |

Returns `true` when given node is a `Heading<"h6">` node.

### `type Node<T>`

Stricten extension on top of Slate's `Element` type. It replaces its `children` with a self-reference list of `Node` and adds `type` property which takes the type of `T` parameter.

| Name | Extends     | Required  | Default  | Description                               |
|------|:-----------:|:---------:|:--------:|-------------------------------------------|
| T    | `string`    | No        | `string` | A type parameter for Node `type` property |

### `type Replace<L, R>`

Replaces object properties in the `L` (target) object with the ones from the `R` (source)

| Name | Extends     | Required  | Default  | Description                                                                      |
|------|:-----------:|:---------:|:--------:|----------------------------------------------------------------------------------|
| L    | `object`    | Yes       | —        | Target object which properties are to be replaced using Source object            |
| R    | `object`    | Yes       | —        | Source object which properties will replace and extend the ones on Target object |

### `interface Transforms`

Custom transform lists.

| Name     | Type                 | Required  | Default  | Description                               |
|----------|:--------------------:|:---------:|:--------:|-------------------------------------------|
| leaves   | `LeafTransform[]`    | No        | `[]`     | A list of transforms for `leaf` nodes     |
| elements | `ElementTransform[]` | No        | `[]`     | A list of transforms for `element` nodes  |

### `type TransformNodesOptions`

Additional transform options.

| Name              | Type                                  | Required | Default                                           | Description                                                  |
|-------------------|:-------------------------------------:|:--------:|:-------------------------------------------------:|--------------------------------------------------------------|
| defaultTransforms | `boolean`                             | No       | `true`                                            | Controls whether default transforms enabled or not           |
| transforms        | [`Transforms`](#interface-transforms) | No       | `undefined`                                       | Custom transforms for `Slate` nodes                          |
| strict            | `boolean`                             | No       | `false`                                           | Enables strict mode                                          |
| idKeyName         | `string`                              | No       | `"id"`                                            | The name of the id property on nodes                         |
| forceGenerateId   | `boolean`                             | No       | `false`                                           | If `true`, the id for key attribute will be always generated |
| idGenerator       | `() => string`                        | No       | [`nanoid`](https://github.com/ai/nanoid#blocking) | Custom implementation for ID generator                       |

### `type SlateViewProps`

Available props for `SlateView` component. Inherits [`TransformNodesOptions`](#type-transformnodesoptions).

| Name  | Type     | Required  | Default  | Description                               |
|-------|:--------:|:---------:|:--------:|-------------------------------------------|
| nodes | `Node[]` | Yes       | —        | List of `Slate` nodes to transform        |

### Default transforms

By default `slate-to-react` has default transforms for following nodes:

* PlainText - transforms **only** text nodes **without** formatting into `<span>` HTML tag;
* RichText - transfomrs **only** text nodes **with** at least one of the formatting property into corresponding formatting HTML tag (e. g. `<strong>` for **bold**, `<i>` for *italic* etc.) wrapped with `<span>` HTML tag;
* EmptyText - transforms **only** empty `Text` nodes into `<br>` HTML tag;
* Paragraph - transforms `Paragraph` nodes into `<p>` HTML tag;
* Link - transforms `Link` nodes into `<a>` HTML tag;
* Blockqoute - transforms `Blockqoute` nodes into `<blockqoute>` HTML tag;
* Heading - transforms `Heading` nodes into `h<level>` HTML tag with corresponding `level` (e. g. `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`).
