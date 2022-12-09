const testPath = './03_test'
const inputPath = './03_input'

export const testData = getData(testPath)
export const inputData = getData(inputPath)

function getData(path: string) {
  return Deno.readTextFileSync(path).split('\n')
}

export function getItemPriority(item: string) {
  const isLowerCase = item === item.toLocaleLowerCase()
  let charCodeStart = 0
  if (isLowerCase) {
    charCodeStart = 'a'.charCodeAt(0) - 1
  } else {
    charCodeStart = 'A'.charCodeAt(0) - 27
  }
  return item.charCodeAt(0) - charCodeStart
}
export function prioritySum(arr: string[]) {
  return arr.reduce((prev, curr) => {
    const score = getItemPriority(curr)
    return (prev += score)
  }, 0)
}
