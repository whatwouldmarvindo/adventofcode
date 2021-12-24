import {readLines} from '../common/io'

export type Input = number[][][]

export function parseInput(path: string): Input {
  return readLines(path)
    .map((line) => line.split(' -> '))
    .map(([one, two]) => [one.split(',').map((v) => parseInt(v)), two.split(',').map((v) => parseInt(v))])
}

// x1, y1 -> x2, y2 => x goes down | y goes right
export function getEmptyMatrix(input: Input): number[][] {
  let width = 0
  let height = 0
  let matrix = []
  for (const line of input) {
    for (const [x, y] of line) {
      height = x > height ? x : height
      width = y > width ? y : width
    }
  }

  for (let i = 0; i <= height; i++) {
    matrix.push([])
    for (let j = 0; j <= width; j++) {
      matrix[i].push(0)
    }
  }
  return matrix
}
