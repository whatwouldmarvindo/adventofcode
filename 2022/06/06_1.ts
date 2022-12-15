import {inputData, testData} from './06_common.ts'

const data = inputData

let rightPointer = 1
let leftPointer = 0

while (rightPointer - leftPointer < 14) {
  const newCharacter = data[rightPointer]
  for (let i = leftPointer; i < rightPointer; i++) {
    if (data[i] === newCharacter) {
      leftPointer = i + 1
      break
    }
  }
  rightPointer++
}

console.log(data.slice(leftPointer, rightPointer))
console.log(`found at ${rightPointer}`)
