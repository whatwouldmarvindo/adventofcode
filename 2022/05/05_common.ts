// deno-lint-ignore-file no-unused-vars
const testPath = './05_test'
const inputPath = './05_input'

export type dayData = {
  instructions: instruction[]
  towers: Record<number, string[]>
}

type instruction = {
  from: number
  to: number
  amount: number
}
export function grab(amount: number, tower: string[]) {
  return tower.splice(0, amount)
}

function readData(path: string): dayData {
  const textFile = Deno.readTextFileSync(path)
  const sections = textFile.split('\n\n')

  const instructions: instruction[] = getInstructions(sections)

  const stackSection = sections[0].split('\n')
  const numbersLine = stackSection.pop() as string
  const numbers = numbersLine.split(' ').filter((c) => c.length > 0)
  const amountOfStacks = parseInt(numbers[numbers.length - 1])
  stackSection.map((l) => {
    return getCratesForLine(l, amountOfStacks)
  })
  return {
    instructions,
    towers: obj,
  }
}

const obj: Record<number, Array<string>> = {}

function getInstructions(sections: string[]): instruction[] {
  return sections[1].split('\n').map((line) => {
    const words = line.split(' ')
    return {
      amount: parseInt(words[1]),
      from: parseInt(words[3]),
      to: parseInt(words[5]),
    }
  })
}

function getCratesForLine(line: string, amountOfStacks: number) {
  const splittedLine = line.split('')
  for (let i = 0; i < amountOfStacks * 4 - 1; i += 4) {
    const stackNumber = i / 4 + 1
    const crate = splittedLine[i + 1]
    if (crate !== ' ') {
      if (obj[stackNumber]) {
        obj[stackNumber].push(crate)
      } else {
        obj[stackNumber] = [crate]
      }
    }
  }
  return obj
}

export const testData = readData(inputPath)
