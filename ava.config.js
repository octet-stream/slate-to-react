// @ts-check

/**
 * @typedef {Object} ParsedVersion
 *
 * @prop {number} major
 * @prop {number?} minor
 * @prop {number?} patch
 */

/**
 * @return {ParsedVersion}
 */
function parseVersion() {
  const parsed = process.version.match(
    /^v(?<major>[0-9]+)(?:\.(?<minor>[0-9]+)?)(?:\.(?<patch>[0-9]+))?/
  )

  if (parsed?.groups?.major == null) {
    throw new Error("Can't extract Node.js version form process.version")
  }

  const major = Number.parseInt(parsed.groups.major, 10)
  const [minor, patch] = [parsed.groups.minor, parsed.groups.patch].map(
    value => (value ? Number.parseInt(value, 10) : null)
  )

  return {major, minor, patch}
}

/**
 * @returns {boolean}
 */
function isOlderThanTwentyDotSix() {
  const {major, minor} = parseVersion()

  if (major > 20 || (major === 20 && minor && minor > 6)) {
    return false
  }

  return true
}

/**
 * @returns {string[]}
 */
const getTsimpArgs = () =>
  isOlderThanTwentyDotSix()
    ? ["--loader", "tsimp/loader"]
    : ["--import", "tsimp"]

export default {
  failFast: true,
  workerThreads: isOlderThanTwentyDotSix() === false,
  require: "global-jsdom/register",
  extensions: {
    ts: "module",
    tsx: "module"
  },
  nodeArguments: ["--no-warnings", ...getTsimpArgs()],
  files: ["src/**/*.test.{ts,tsx}"]
}
