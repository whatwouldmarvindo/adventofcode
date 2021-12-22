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

export function markBoards(boards: Board[], number: number) {
  for (const board of boards) {
    for (const row of board) {
      for (const entry of row) {
        if (entry.n == number) {
          entry.marked = true
        }
      }
    }
  }
}

export function findWinner(boards: Board[]): number[] {
  let winner = []
  for (let i = 0; i < boards.length; i++) {
    const board = boards[i]
    const pivot = pivotBoard(board)

    // check how many marked spots there are in each row and column
    const markedNumbersInRow = board.map((l) => l.reduce((sum, curr) => (curr.marked ? sum + 1 : sum - 1), 0))
    const markedNumbersInColumn = pivot.map((l) => l.reduce((sum, curr) => (curr.marked ? sum + 1 : sum - 1), 0))
    if (markedNumbersInColumn.includes(5) || markedNumbersInRow.includes(5)) {
      winner.push(i)
    }
  }
  return winner
}

export function getScore(board: Board): number {
  return board.reduce((rowSum, row) => rowSum + row.reduce((sum1, v) => (!v.marked ? sum1 + v.n : sum1), 0), 0)
}
