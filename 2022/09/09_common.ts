import * as path from 'https://deno.land/std@0.175.0/path/mod.ts'

export type Direction = 'R' | 'L' | 'U' | 'D'
export type Motion = {direction: Direction; amount: number}
export type Position = {x: number; y: number}

export class Common {
  public readonly data: Motion[]

  constructor(fileName: string) {
    const path = `${this.currentFolderUrl}/${fileName}`

    console.log(`reading input from ${path}`)
    const textFile = Deno.readTextFileSync(path)
    this.data = this.parseInput(textFile)
  }

  private parseInput(file: string): Motion[] {
    return file.split('\n').map((line) => {
      const [direction, amount] = line.split(' ')
      return {direction: direction as Direction, amount: parseInt(amount)}
    })
  }

  private get currentFolderUrl() {
    return new URL('.', import.meta.url).pathname
  }
}
