export type SwapObjectProps<L extends object, R extends object> =
  Omit<L, keyof R> & R
