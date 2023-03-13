import {Common, Direction, Motion, Position} from './09_common.ts'

export class Solution9_1 extends Common {
  headPosition: Position = {x: 0, y: 0}
  tailPosition: Position = {x: 0, y: 0}
  uniqueTailPositions: Set<string> = new Set()

  constructor(path: string) {
    super(path)

    this.data.forEach((motion) => this.move(motion))

    console.log(this.uniqueTailPositions.size)
  }

  move({amount, direction}: Motion): void {
    console.log(`== ${direction} ${amount} ==`)

    for (let i = 0; i < amount; i++) {
      this.trackTailPosition()
      this.moveHead(direction)

      if (!this.isHeadTouchingTail) {
        this.moveTail()
      }
      console.log('head at', this.headPosition)
      console.log('tail at', this.tailPosition)
      console.log(`after ${i} move${i == 1 ? '' : 's'} \n`)
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

  moveTail() {
    const distanceX = this.headPosition.x - this.tailPosition.x
    const distanceY = this.headPosition.y - this.tailPosition.y

    console.log(`distanceX: ${distanceX}, distanceY: ${distanceY}`)

    if (distanceX !== 0) {
      this.tailPosition.x += distanceX > 0 ? 1 : -1
    }
    if (distanceY !== 0) {
      this.tailPosition.y += distanceY > 0 ? 1 : -1
    }

  }

  trackTailPosition() {
    const positionAsString = JSON.stringify(this.tailPosition)
    this.uniqueTailPositions.add(positionAsString)
  }

  public get isHeadTouchingTail(): boolean {
    const distanceX = this.getDistance(this.headPosition.x, this.tailPosition.x)
    const distanceY = this.getDistance(this.headPosition.y, this.tailPosition.y)
    return distanceX < 2 && distanceY < 2
  }

  private getDistance(x: number, y: number): number {
    return Math.abs(x - y)
  }
}

// const s = new Solution9_1('09_input')
// new Solution9_1('09_test')
