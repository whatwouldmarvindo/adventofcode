import {
  testData,
  getRoundOutcome,
  PAPER,
  ROCK,
  SCISSORS,
  getShapeScore,
  inputData,
} from './02_common.ts'

type rps = 'A' | 'B' | 'C'
type ending = 'X' | 'Y' | 'Z'

const data = inputData

const HAND = {
  A: 'ROCK',
  B: 'PAPER',
  C: 'SCISSORS',
}

const matrix = {
  A: {
    // Rock
    win: PAPER,
    draw: ROCK,
    loose: SCISSORS,
  },
  B: {
    // Paper
    win: SCISSORS,
    draw: PAPER,
    loose: ROCK,
  },
  C: {
    // Scissors
    win: ROCK,
    draw: SCISSORS,
    loose: PAPER,
  },
}

const Ending: {
  X: 'loose'
  Y: 'draw'
  Z: 'win'
} = {
  X: 'loose',
  Y: 'draw',
  Z: 'win',
}

let scoreTracker = 0

data.forEach(([opponent, me]) => {
  me = getShape(opponent as rps, me as ending)
  console.log(me)
  scoreTracker += getScore(opponent, me)
  console.log(scoreTracker)
})

function getScore(opponent: string, me: string): number {
  let score = 0

  score += getShapeScore(me)
  score += getRoundOutcome([opponent, me])[1]
  return score
}

function getShape(opponent: rps, ending: ending) {
  const end: 'win' | 'draw' | 'loose' = Ending[ending]
  const myHand = matrix[opponent][end] as 'A' | 'B' | 'C'

  // console.log(`the opponent choosed ${HAND[opponent]}, I will choose ${HAND[myHand]} so I will ${end}`)
  return myHand
}

console.log(scoreTracker)
