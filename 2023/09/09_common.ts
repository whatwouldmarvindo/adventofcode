export const readFile = (path: string) => {
  return Deno.readTextFileSync(path)
    .split('\n')
    .map((line) => line.split(' ').map((num) => parseInt(num)))
}

export function extrapolateNextLine(line: number[]) {
  const nextLine: number[] = []
  for (let i = 1; i < line.length; i++) {
    const diff = line[i] - line[i - 1]
    nextLine.push(diff)
  }
  return nextLine
}
