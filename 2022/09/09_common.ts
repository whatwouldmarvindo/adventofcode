export type Direction = 'R' | 'L' | 'U' | 'D'
export type Motion = {direction: Direction; amount: number}

export class Common {
  public readonly data: Motion[]
  constructor(path: string) {
    const textFile = Deno.readTextFileSync(path)
    this.data = this.parseInput(textFile)
  }

  private parseInput(file: string): Motion[] {
    return file.split('\n').map((line) => {
      const [direction, amount] = line.split(' ')
      return {direction, amount: parseInt(amount)} as Motion
    })
  }
}