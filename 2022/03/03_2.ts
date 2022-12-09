import {inputData, prioritySum, testData} from './03_common.ts'

const data = inputData
const groups: [string, string, string][] = []
for (let i = 0; i < data.length; i += 3) {
  const first = data[i]
  const second = data[i + 1]
  const third = data[i + 2]

  groups.push([first, second, third])
}

const badges = groups.map(([f, s, t]) => {
  let badge = null
  f.split('').forEach((item) => {
    if (s.includes(item) && t.includes(item)) {
      badge = item
      return item
    }
  })
  if (badge) {
    return badge
  }
}) as unknown as string[]

const result = prioritySum(badges)

console.log(result)
