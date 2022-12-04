import {data} from './01_common.ts'

const bestElves = [0, 0, 0]

data.forEach((e) => {
  if (e > bestElves[2]) {
    if (e > bestElves[1]) {
      if (e > bestElves[0]) {
        return insert(e, 0)
      } else {
        return insert(e, 1)
      }
    } else {
      return (bestElves[2] = e)
    }
  }
})

function insert(value: number, index: 0 | 1 | 2) {
  bestElves.splice(index, 0, value)
  bestElves.pop()
}

const result = bestElves.reduce((prev, curr) => prev + curr, 0)

console.log(result)
