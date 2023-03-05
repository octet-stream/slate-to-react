export default {
  failFast: true,
  require: "global-jsdom/register",
  nodeArguments: [
    "--no-warnings",
    "--loader=ts-node/esm/transpile-only"
  ],
  extensions: {
    ts: "module",
    tsx: "module"
  },
  files: [
    "src/**/*.test.{ts,tsx}"
  ]
}
