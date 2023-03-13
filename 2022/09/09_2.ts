import {Solution9_1} from './09_1.ts'
import {Common, Direction, Motion, Position} from './09_common.ts'

class Solution9_2 extends Common {
  ropeLength = 10
  rope: Position[] = []
  uniqueTailPositions: Set<string> = new Set()

  constructor(path: string) {
    super(path)
    this.populatePositionsArray()

    this.data.forEach((motion) => this.move(motion))

    console.log(this.uniqueTailPositions.size)
  }

  move({amount, direction}: Motion): void {
    console.log(`== ${direction} ${amount} ==`)
    for (let i = 0; i < amount; i++) {
      this.trackTailPosition()
      this.moveHead(direction)
      this.rope[0] = this.headPosition
      for (let j = 1; j < this.rope.length; j++) {
        const toMove = this.rope[j]
        const relativePosition = this.rope[j - 1]
        this.movePos(toMove, relativePosition)
      }
      console.log(this.rope)
    }
  }

  moveHead(direction: Direction): void {
    if (direction == 'D') {
      this.headPosition.y--
    }
    if (direction === 'L') {
      this.headPosition.x--
    }
    if (direction === 'R') {
      this.headPosition.x++
    }
    if (direction === 'U') {
      this.headPosition.y++
    }
  }

  movePos(toMove: Position, relativePosition: Position) {
    const distanceX = relativePosition.x - toMove.x
    const distanceY = relativePosition.y - toMove.y

    // console.log(`distanceX: ${distanceX}, distanceY: ${distanceY}`)

    if (!this.isTouching(toMove, relativePosition)) {
      if (distanceX !== 0) {
        toMove.x += distanceX > 0 ? 1 : -1
      }
      if (distanceY !== 0) {
        toMove.y += distanceY > 0 ? 1 : -1
      }
    }
  }

  private populatePositionsArray() {
    for (let i = 0; i < this.ropeLength; i++) {
      this.rope.push({x: 0, y: 0})
    }
  }

  trackTailPosition(): void {
    const tailPositionAsString = JSON.stringify(this.tailPosition)
    this.uniqueTailPositions.add(tailPositionAsString)
  }

  get headPosition(): Position {
    return this.rope[0]
  }

  get tailPosition(): Position {
    return this.rope[this.rope.length - 1]
  }

  isTouching(from: Position, to: Position): boolean {
    const distanceX = this.getdistance(from.x, to.x)
    const distanceY = this.getdistance(from.y, to.y)
    return distanceX <= 1 && distanceY <= 1
  }

  getdistance(x: number, y: number) {
    return Math.abs(x - y)
  }
}

// new Solution9_2('09_test')
new Solution9_2('09_input')
