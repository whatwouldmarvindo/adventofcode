import {Common, Tree} from './08_common.ts'

class Part2 extends Common {
  highestScore = 0
  constructor(path: string) {
    super(path)

    this.data.forEach((line) =>
      line.forEach((tree) => {
        this.getScenicScore(tree)
      }),
    )
  }

  getScenicScore({height, x, y}: Tree) {
    const scenicScores = {
      north: 0,
      south: 0,
      west: 0,
      east: 0,
    }

    for (let k = x + 1; k < this.data.length; k++) {
      const currentlyFacingTree = this.data[y][k]
      scenicScores.east++
      if (currentlyFacingTree.height >= height) {
        break
      }
    }

    for (let k = x - 1; k > -1; k--) {
      const currentlyFacingTree = this.data[y][k]
      scenicScores.west++
      if (currentlyFacingTree.height >= height) {
        break
      }
    }

    for (let k = y + 1; k < this.data.length; k++) {
      const currentlyFacingTree = this.data[k][x]?.height
      scenicScores.south++
      if (currentlyFacingTree >= height) {
        break
      }
    }

    for (let k = y - 1; k > -1; k--) {
      const currentlyFacingTree = this.data[k][x]?.height
      scenicScores.north++
      if (currentlyFacingTree >= height) {
        break
      }
    }

    const {north, south, east, west} = scenicScores
    const totalScenisScore = north * south * east * west
    if (totalScenisScore > this.highestScore) {
      this.highestScore = totalScenisScore
    }
  }
}

const p2 = new Part2('08_input')

console.log(p2.highestScore)
