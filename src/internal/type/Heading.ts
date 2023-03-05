import type {Node} from "../../public/Node.js"

import {WithAlignment} from "./Alignment.js"

import {
  HEADINGS_LIST
} from "../constants.js"

export type Headings = typeof HEADINGS_LIST[number]

export type Heading<T extends Headings = Headings> = Node<T> & WithAlignment
