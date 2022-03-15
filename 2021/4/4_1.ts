import {markBoards, findWinner, Input, parseInput, getScore} from './common'

let lastDrawn
let input: Input = parseInput('input.txt')
let winner: number[]

do {
  lastDrawn = input.draws.shift()
  markBoards(input.boards, lastDrawn)

  winner = findWinner(input.boards)
} while (winner.length == 0)
const winnerBoard = input.boards[winner[0]]

const score = getScore(winnerBoard) * lastDrawn

console.log(`The winner score is:  ${score}`)
