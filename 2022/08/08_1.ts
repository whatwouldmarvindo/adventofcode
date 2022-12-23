import {Common, Direction, Tree} from './08_common.ts'
export class Part1 extends Common {
  constructor(path: string) {
    super(path)
    this.countVisibleTrees()
    this.findVisibleTrees()
  }

  findVisibleTrees() {
    let nextTree: Tree | undefined = this.data[0][0]
    const direction: Direction = 'right'
    if () {
    }
    do {
      nextTree = this.nextTree(nextTree as Tree, direction)
    } while (this.nextTree(nextTree))
    // this.fromWestAndNorth()
    // this.fromEastAndSouth()
  }

  countVisibleTrees() {
    let counter = 0
    this.data.forEach((line) =>
      line.forEach((tree) => {
        if (tree.visible) {
          counter++
        }
      }),
    )
    return counter
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
}

const p1 = new Part1('08_input')
console.log(p1.countVisibleTrees())
