import {inputData, testData} from './04_common.ts'

const data = inputData as [string, string][]

let counter = 0

// 6 - 7 : 5 - 9

data.forEach(([first, second]) => {
  first
  if (first[0] <= second[0] && first[1] >= second[1]) {
    console.log(`${first[0]}-${first[1]} fits into ${second[0]}-${second[1]}`)
    return counter++
  } else if (second[0] <= first[0] && second[1] >= first[1]) {
    // console.log(`${first[0]} to ${first[1]} is overlapping ${second[0]}- ${second[1]}`)
    return counter++
  }
})

console.log(counter)
