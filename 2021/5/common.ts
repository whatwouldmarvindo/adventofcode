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

function getIncrement(from, to) {
  if (from == to) return 0
  if (from > to) return -1
  if (from < to) return 1
}

export function drawLine(x1, y1, x2, y2, matrix) {
  const xIncrement = getIncrement(x1, x2)
  const yIncrement = getIncrement(y1, y2)
  let newX = x1
  let newY = y1
  do {
    matrix[newX][newY]++
    newX += xIncrement
    newY += yIncrement
  } while (newY !== y2 || newX !== x2)

  // hacky solution to mark lower limit as well
  matrix[newX][newY]++
}

export function getResult(matrix) {
  return matrix.reduce(
    (sum, currentLine) => currentLine.reduce((prev, curr) => (curr >= 2 ? prev + 1 : prev), 0) + sum,
    0,
  )
}
