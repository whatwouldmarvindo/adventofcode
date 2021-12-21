import {readIntsLine, readLines} from '../common/io'

const input = readLines('input.txt')

function getGammaRate(input: string[]): {eps: number, gam: number} {
  // setup empty array and fill with initial state
  let answer = []
  for (let i = 0; i < input[0].length; i++) {
    answer.push({0: 0, 1: 0})
  }

  // increment based if it's 0 or 1 to remember which was how often
  for (const line of input) {
    line.split('').forEach((el, i) => {
      answer[i][el] += 1
    })
  }

  // replace the entry of the array with the actual number that was most common
  let gamma = answer.map((el, i) => (el[0] > el[1] ? 0 : 1))
  let epsilon = answer.map((el, i) => (el[0] > el[1] ? 1 : 0))

  // transform from binary to decimal and return
  return {
    eps: parseInt(epsilon.join(''), 2),
    gam: parseInt(gamma.join(''), 2),
  }
}

// console.log(input)
const result = getGammaRate(input)
console.log(`The power consumption is ${result.eps * result.gam}`)
// const result = gammaR * epsilonR
