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
