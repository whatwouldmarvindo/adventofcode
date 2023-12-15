import {extrapolateNextLine, readFile} from './09_common.ts'

const input = readFile('./09_input')

const everyFirst = input.map((line) => {
  const allFirsts = []
  do {
    const firstValue = line[0]
    line = [...extrapolateNextLine(line)]
    allFirsts.push(firstValue)
  } while (line.some((num) => num !== 0))
  allFirsts.push(line[0])
  return allFirsts
})

const result = everyFirst
  .map((firsts) => getResultForLine(firsts))
  .reduce((acc, num) => acc + num, 0)

function getResultForLine(firsts: number[]) {
  return firsts.reduceRight((prev, num) => num - prev, 0)
}

console.log(result)
