import {urlAlphabet} from "nanoid"

export const isNanoId = (value: string, alphabet = urlAlphabet, length = 21) =>
  new RegExp(`^[${alphabet.split("").sort().join("")}]{${length}}$`).test(value)
