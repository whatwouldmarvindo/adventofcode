import {common} from './08_common.ts'
class Part1 extends common {
  visibleTrees: number
  constructor(path: string) {
    super(path)
    this.visibleTrees = this.countVisibleTrees()
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
}

const p1 = new Part1('08_input')
console.log(p1.visibleTrees)
