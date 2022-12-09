const testPath = './04_test'
const inputPath = './04_input'

const readData = (path: string) => {
  return Deno.readTextFileSync(path)
    .split('\n')
    .map((line) => line.split(','))
    .map(([first, second]) => {
      return [first.split('-').map((l) => parseInt(l)), second.split('-').map((l) => parseInt(l))]
    }) as unknown as [[number, number], [number, number]][]
}

export const testData = readData(testPath)

export const inputData = readData(inputPath)
