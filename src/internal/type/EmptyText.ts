import type {Text} from "slate"

import {Replace} from "../../public/Replace.js"

export type EmptyText = Replace<Text, {
  text: ""
}>
