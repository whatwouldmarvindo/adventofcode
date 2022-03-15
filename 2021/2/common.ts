import { readLines } from "../common/io";

export function parseInput(path): [string, number][] {
  return readLines(path)
    .map((line) => line.split(' '))
    .map(([dir, number]) => [dir, parseInt(number)])
}
