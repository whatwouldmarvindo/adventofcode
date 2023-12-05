import {readLines} from '../utils.ts'

const input = readLines('./04_input')

export const mapped = input.map((line) =>
  line
    .split(':')[1]
    .trim()
    .split('|')
    .map((c) => c.trim())
    .map((c) => c.split(/\s+/).map((n) => Number(n))),
)

const amounts = mapped.map(([winning, my]) => {
  const winningAmount = my.filter((num) => winning.includes(num)).length
  if (winningAmount === 0) {
    return 0
  }
  return Math.pow(2, winningAmount - 1)
})

const result = amounts.reduce((a, b) => a + b, 0)
console.log(result)
