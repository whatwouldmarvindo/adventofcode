import {Board, markBoards, findWinner, getScore, parseInput} from './common'

let {boards, draws} = parseInput('input.txt')
let lastDrawn: number
let lastWinner: Board[]

function removeBoards(boards: Board[], winner: number[]) {
  for (const i of winner) {
    lastWinner = boards.splice(i, 1)
  }
}

do {
  lastDrawn = draws.shift()
  markBoards(boards, lastDrawn)
  const winner = findWinner(boards)
  if (winner.length > 0) {
    removeBoards(boards, winner)
  }
} while (boards.length != 0)

const score = getScore(lastWinner[0])
const result = score * lastDrawn

console.log(`The final board has a score of ${score}, multiplied with the last drawn number ${lastDrawn} is ${result}`)
// 24863 -> too high
// score: 1830 sum: 305, num: 6
