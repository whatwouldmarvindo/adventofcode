import {drawLine, getEmptyMatrix, getResult, parseInput} from './common'

const input = parseInput('input.txt')
let matrix = getEmptyMatrix(input)

for (const [from, to] of input) {
  drawLine(from[0], from[1], to[0], to[1], matrix)
}

const result = getResult(matrix)
console.log(matrix.map(l => l.join('')))
console.log(result)