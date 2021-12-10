const fs = require('fs')

export function readLines(path): string[] {
  return fs
    .readFileSync(path, 'utf-8')
    .split('\n')
    .filter((l) => l.length > 0)
}

export function readIntsLine(path: string): number[] {
  return Array.from(fs.readFileSync(path, 'utf-8').matchAll(/\d+/gm))
    .flatMap((match) => match[0])
    .map((n) => parseInt(n))
}
