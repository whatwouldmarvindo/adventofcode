import {readLines} from '../common/io'

const pair = {
  '{': '}',
  '(': ')',
  '<': '>',
  '[': ']',
}

const points = {
  '}': 3,
  ')': 1,
  '>': 4,
  ']': 2,
}

function getLineScore(line: string): number {
  let expectedCharList = []
  for (const char of line) {
    if (pair[char]) {
      expectedCharList.push(pair[char])
    } else if (char == expectedCharList[expectedCharList.length - 1]) {
      expectedCharList.pop()
    } else {
      return 0
    }
  }

  return expectedCharList.reverse().reduce((sum, char) => sum * 5 + points[char], 0)
}

const input = readLines('input.txt')
  .map((line) => getLineScore(line))
  .filter((v) => v > 0)
  .sort((a, b) => a - b)

const middleIndex = Math.floor(input.length / 2)

console.log(`The middle completion string score is ${input[middleIndex]}`)
// 3382686687 -> too high
// 3238973941 --> too high
// 1698395182 --> ?