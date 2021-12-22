import {Board, Input, parseInput, pivotBoard} from './common'
let lastDrawn

function doRound(input: Input) {
  lastDrawn = input.draws.shift()
  for (const board of input.boards) {
    for (const row of board) {
      for (const entry of row) {
        if (entry.n == lastDrawn) {
          entry.marked = true
        }
      }
    }
  }
  return input
}

function findWinner(boards: Board[]): number | false {
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

function getScore(board: Board) {
  const boardScore = board.reduce((sum, l) => sum + l.reduce((sum1, v) => (!v.marked ? sum1 + v.n : sum1), 0), 0)
  return boardScore * lastDrawn
}

let input: Input = parseInput('input.txt')

let winner: number | false = false
let i = 0
do {
  input = doRound(input)
  winner = findWinner(input.boards)
  console.log(i++)
} while (winner == false)

const score = getScore(input.boards[winner])

console.log(`winner is ${winner} with a score of ${score}`)
