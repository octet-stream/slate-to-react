export default {
  failFast: true,
  workerThreads: false,
  require: "global-jsdom/register",
  extensions: {
    ts: "module",
    tsx: "module"
  },
  files: ["src/**/*.test.{ts,tsx}"]
}
