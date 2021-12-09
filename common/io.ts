const fs = require("fs")

module.exports = {
  // reads all lines from a file as strings
  readLines(path: string): string[] {
    return fs
      .readFileSync(path, "utf-8")
      .split("\n")
      .filter((l) => l.length > 0)
  },

  // read a list of integers from a file
  readInts(path: string): number[] {
    return this.readLines(path).map((l) => parseInt(l))
  },

  // reads a list of integers from a single line
  readIntsLine(path: string): number[] {
    return Array.from(fs.readFileSync(path, "utf-8").matchAll(/\d+/gm))
      .flatMap((match) => match[0])
      .map((n) => parseInt(n))
  },
}
