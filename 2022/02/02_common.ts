export const ShapeToLetter = {
  Rock: 'A',
  Paper: 'B',
  Scissors: 'C',
}

const testPath = './02_test'
const inputPath = './02_input'

function getInput(path: string) {
  return Deno.readTextFileSync(path)
    .split('\n')
    .map((line) => line.split(' '))
}

export const testData = getInput(testPath)
export const inputData = getInput(inputPath)

export function parseInput(i: string): 'A' | 'B' | 'C' {
  if (i === 'X') return 'A'
  if (i === 'Y') return 'B'
  return 'C'
}

export function getShapeScore(s: string): number {
  if (s === 'A') {
    return 1
  } else if (s === 'B') {
    return 2
  } else {
    return 3
  }
}

export function getRoundOutcome([opponent, me]: [string, string]): [number, number] {
  if (opponent === me) {
    return [3, 3]
  } else if (opponent === 'A') {
    if (me === 'B') {
      return [0, 6]
    } else return [6, 0]
  } else if (opponent === 'B') {
    if (me === 'A') {
      return [6, 0]
    } else return [0, 6]
  } else {
    if (me === 'A') {
      return [0, 6]
    } else return [6, 0]
  }
}

export const ROCK = 'A'
export const PAPER = 'B'
export const SCISSORS = 'C'
