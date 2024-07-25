import type {Node} from "../../public/Node.js"

import type {WithAlignment} from "./WithAlignment.js"

import type {HEADINGS_LIST} from "../constants.js"

export type Headings = (typeof HEADINGS_LIST)[number]

export type Heading<T extends Headings = Headings> = Node<T> & WithAlignment
