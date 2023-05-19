export default {
  failFast: true,
  require: "global-jsdom/register",
  environmentVariables: {
    TS_NODE_PROJECT: "tsconfig.ava.json"
  },
  extensions: {
    ts: "module",
    tsx: "module"
  },
  files: [
    "src/**/*.test.{ts,tsx}"
  ]
}
