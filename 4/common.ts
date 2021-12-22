import {readSections} from '../common/io'

export type Input = {boards: Board[]; draws: number[]}
export type Board = position[][]
export type position = {n: number; marked: boolean}

export function parseInput(path: string): {draws: number[]; boards: Board[]} {
  const input = readSections(path)
  const draws = input[0].split(',').map((v) => parseInt(v))
  const boards = []
  for (let i = 1; i < input.length; i++) {
    const section = input[i]
    const board = section
      .split('\n')
      .map((line) => line.split(' '))
      .map((l) => l.filter((v) => v != ''))
      .map((l) => l.map((v) => ({n: parseInt(v), marked: false})))
    boards.push(board)
  }
  return {draws, boards}
}

export function pivotBoard(board: Board) {
  const pivoted: Board = []
  for (let i = 0; i < board.length; i++) {
    pivoted.push(board.map((l) => l[i]))
  }
  return pivoted
}

export function doRound(input: Input): {input: Input; lastDrawn: number} {
  const lastDrawn = input.draws.shift()
  for (const board of input.boards) {
    for (const row of board) {
      for (const entry of row) {
        if (entry.n == lastDrawn) {
          entry.marked = true
        }
      }
    }
  }
  return {input, lastDrawn}
}

export function findWinner(boards: Board[]): number | false {
  let winner = false
  for (let i = 0; i < boards.length; i++) {
    const board = boards[i]
    const pivot = pivotBoard(board)

    // check how many marked spots there are in each row and column
    const markedNumbersInRow = board.map((l) => l.reduce((sum, curr) => (curr.marked ? sum + 1 : sum - 1), 0))
    const markedNumbersInColumn = pivot.map((l) => l.reduce((sum, curr) => (curr.marked ? sum + 1 : sum - 1), 0))
    if (markedNumbersInColumn.includes(5) || markedNumbersInRow.includes(5)) {
      return i
    }
  }
  return winner
}
