/**
 * Replaces object properties in the `L` object with the ones from the `R`
 */
export type Replace<L extends object, R extends object> = Omit<L, keyof R> & R
