function transform(path: string) {
  const rawInput = Deno.readTextFileSync(path)

  return rawInput
    .split('\n\n')
    .map((r) => r.split('\n').map((v) => parseInt(v)))
    .map((r) => r.reduce((prev, curr) => prev + curr, 0))
}

const dataPath = './01_input'
const testPath = './01_test'

export const data = transform(dataPath)
export const test = transform(testPath)
