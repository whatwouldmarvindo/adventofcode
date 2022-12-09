import {testData, inputData, getRoundOutcome, getShapeScore, parseInput} from './02_common.ts'
const data = inputData

const scoreTracker = {
  me: 0,
  opponent: 0,
}

data.forEach(([opponent, me]) => {
  me = parseInput(me)
  scoreTracker.me += getShapeScore(me)
  scoreTracker.opponent += getShapeScore(opponent)
  const outcome = getRoundOutcome([opponent, me])
  scoreTracker.me += outcome[1]
  scoreTracker.opponent += outcome[0]
})

console.log(scoreTracker)
