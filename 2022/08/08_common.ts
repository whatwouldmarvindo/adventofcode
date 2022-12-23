export type TreeGrid = Tree[][]
export type Tree = {height: number; visible: boolean; scenicScore: number; x: number; y: number}
export type Coordinates = {x: number; y: number}
export type Direction = 'up' | 'down' | 'left' | 'right'

export class Common {
  public data: TreeGrid
  constructor(path: string) {
    this.data = Deno.readTextFileSync(path)
      .split('\n')
      .map((line, y) =>
        line
          .split('')
          .map((char, x) => ({height: parseInt(char), visible: false, scenicScore: 0, x, y})),
      )
  }

  nextTree({x, y}: Tree, direction: Direction): Tree | undefined {
    switch (direction) {
      case 'up':
        return this.data[x][y++]
      case 'down':
        return this.data[x][y--]
      case 'left':
        return this.data[x--][y]
      case 'right':
        return this.data[x++][y]
      default:
        break
    }
  }
}
