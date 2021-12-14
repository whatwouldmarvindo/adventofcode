import {readLines} from '../common/io'

function isUpperCase(string: string) {
  return string == string.toUpperCase() ? true : false
}

function canBeVisitedAgain(cave: string, path: string[]) {
  return isUpperCase(cave) ? true : path.findIndex((c) => c == cave) == -1 ? true : false
}

type result = {
  paths: string[][]
  foundNewWays: boolean
}

function goNextPath(paths: string[][]): result {
  let foundNewWays = false // gets returned later to check if anything changed
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]
    const currentCave = path[path.length - 1]

    // visit no more caves if we are at the end
    if (currentCave == 'end') continue

    // find all possiblePaths from the current cave and see if there are paths that can be visited
    const possiblePaths = input
      .filter((p) => p[0] == currentCave || p[1] == currentCave)
      .map((c) => (c[0] == currentCave ? c[1] : c[0]))
      .filter((c) => canBeVisitedAgain(c, path))

    // cancel if there are no new paths
    if (possiblePaths.length == 0) continue

    foundNewWays = true

    // we append every possible new path to the current way
    let newPaths = []
    for (const p of possiblePaths) {
      newPaths.push([...path, p])
    }
    paths.splice(i, 1, ...newPaths)
  }
  return {paths, foundNewWays}
}

const input = readLines('input.txt').map((l) => l.split('-'))
let result: result = {paths: [['start']], foundNewWays: false}

// check the way until nothing changes anymore
do {
  result = goNextPath(result.paths)
} while (result.foundNewWays)

// filter all paths that don't end and the end
result.paths = result.paths.filter((value) => value[value.length - 1] == 'end')

console.log(`There are ${result.paths.length} different ways from start to end`)
// 3611 -> too low
// 4775 -> yeah boy!!
