import {Board, doRound, findWinner, Input, parseInput, pivotBoard} from './common'
let lastDrawn

function getScore(board: Board) {
  const boardScore = board.reduce((sum, l) => sum + l.reduce((sum1, v) => (!v.marked ? sum1 + v.n : sum1), 0), 0)
  return boardScore * lastDrawn
}

let input: Input = parseInput('input.txt')

let winner: number | false = false
let i = 0
do {
  const result = doRound(input)
  input = result.input
  lastDrawn = result.lastDrawn

  winner = findWinner(input.boards)
  console.log(i++)
} while (winner == false)

const score = getScore(input.boards[winner])

console.log(`winner is ${winner} with a score of ${score}`)
