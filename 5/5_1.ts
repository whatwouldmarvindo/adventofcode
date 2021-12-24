import {parseInput, Input, getEmptyMatrix} from './common'

const input = parseInput('input.txt')

function getLines(data: Input): Input {
  return data.filter(([x, y]) => x[0] == y[0] || x[1] == y[1])
}

function drawLine([x1, y1, x2, y2], matrix) {
  let connectionsPoints = []
  if (x1 != x2) {
    let newX = x1
    if (x1 < x2) {
      do {
        connectionsPoints.push([newX, y1])
        newX++
      } while (newX != x2 + 1)
    } else {
      do {
        connectionsPoints.push([newX, y2])
        newX--
      } while (newX != x2 - 1)
    }
  } else {
    let newY = y1
    if (y1 < y2) {
      do {
        connectionsPoints.push([x1, newY])
        newY++
      } while (newY != y2 + 1)
    } else {
      do {
        connectionsPoints.push([x1, newY])
        newY--
      } while (newY != y2 - 1)
    }
  }
  // console.log(`input for drawing: x1: ${x1}, y1: ${y1} x2: ${x2}, y2: ${y2}`)
  // console.log(`output: ${connectionsPoints}`)
  for (const point of connectionsPoints) {
    matrix[point[1]][point[0]]++
  }
  return matrix
}

const hAndVLines = getLines(input)
let matrix = getEmptyMatrix(hAndVLines)

for (const [from, to] of hAndVLines) {
  matrix = drawLine([from[0], from[1], to[0], to[1]], matrix)
}

const result = matrix.reduce((sum, currentLine) => currentLine.reduce((prev, curr) => (curr >= 2 ? prev + 1 : prev), 0) + sum, 0)

console.log(`there are a total of ${result} points where two lines overlap`)
