import {extrapolateNextLine, readFile} from './09_common.ts'

const input = readFile('./09_test')

function interpolateLine(line: number[]): number {
  let cummulatedValues = 0
  do {
    cummulatedValues += line[line.length - 1]
    line = [...extrapolateNextLine(line)]
  } while (line.some((num) => num !== 0))

  return cummulatedValues
}

const result = input.reduce((acc, line) => {
  acc += interpolateLine(line)
  return acc
}, 0)

console.log(result)
