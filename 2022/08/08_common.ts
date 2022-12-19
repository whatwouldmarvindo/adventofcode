type TreeGrid = Tree[][]
type Tree = {height: number; visible: boolean}

export class common {
  public data: TreeGrid
  constructor(path: string) {
    this.data = Deno.readTextFileSync(path)
      .split('\n')
      .map((line) => line.split('').map((char) => ({height: parseInt(char), visible: false})))

    this.fromWestAndNorth()
    this.fromEastAndSouth()
  }

  fromWestAndNorth() {
    for (let i = 0; i < this.data[0].length; i++) {
      let westHeight = -1
      let northHeight = -1
      for (let j = 0; j < this.data.length; j++) {
        const westTree: Tree = this.data[i][j]
        const northTree: Tree = this.data[j][i]
        if (westHeight < westTree.height) {
          westHeight = westTree.height
          westTree.visible = true
        }
        if (northHeight < northTree.height) {
          northHeight = northTree.height
          northTree.visible = true
        }
      }
      westHeight = -1
    }
  }

  fromEastAndSouth() {
    for (let i = this.data[0].length - 1; i >= 0; i--) {
      let eastHeight = -1
      let southHeigth = -1
      for (let j = this.data.length - 1; j >= 0; j--) {
        const eastTree: Tree = this.data[i][j]
        const southTree: Tree = this.data[j][i]
        if (eastHeight < eastTree.height) {
          eastHeight = eastTree.height
          eastTree.visible = true
        }

        if (southHeigth < southTree.height) {
          southHeigth = southTree.height
          southTree.visible = true
        }
      }
      eastHeight = -1
      southHeigth = -1
    }
  }

  fromNorth() {
    for (let i = 0; i < this.column.length; i++) {
      let currentHeigth = 0
      for (let j = 0; j < this.data.length; j++) {
        const tree: Tree = this.data[j][i]
        if (currentHeigth < tree.height) {
          currentHeigth = tree.height
          tree.visible = true
        }
      }
      currentHeigth = 0
    }
  }

  get column() {
    return this.data[0]
  }
}

const Common = new common('08_test')

class Direction {
  static down() {}
}
