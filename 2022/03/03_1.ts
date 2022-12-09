import {getItemPriority, inputData, testData} from './03_common.ts'

let data = inputData.map((line) => {
  const middle = line.length / 2
  const firstCompartment = line.slice(0, middle)
  const secondCompartment = line.slice(middle, line.length)
  return [firstCompartment, secondCompartment]
})

const duplicatedItems: string[] = data.map(([first, second]: string[]) => {
  let letter = null
  first.split('').forEach((item) => {
    if (second.includes(item)) {
      letter = item
    }
  })
  if (letter) {
    return letter
  }
}) as unknown as string[]

const result = duplicatedItems.reduce((prev, curr) => {
  const score = getItemPriority(curr)
  return (prev += score)
}, 0)

console.log(result)
