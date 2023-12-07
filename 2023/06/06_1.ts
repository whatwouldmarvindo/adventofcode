type Race = {time: number; record: number}

const text = 'Time:      7  15   30\n Distance:  9  40  200'

function parseInput(path: string): {times: number; distances: number} {
  const fileText = Deno.readTextFileSync(path)
  const [times, distances] = fileText.split('\n').map((i) =>
    i
      .split(':')[1]
      .match(/\d+/g)!
      .map((n) => Number(n.trim())),
  )

  const t = Number(times.join(''))
  const d = Number(distances.join(''))
  return {times: t, distances: d}
}

const input = parseInput('./06_input')

// const solutions = input.times.map((time, i) => {
//   const distance = input.distances[i]
//   return calculateTimePressedToBeatRecord(time, distance)
// })

function calculateTimePressedToBeatRecord(raceTime: number, record: number) {
  const lowerX = Math.floor((raceTime - Math.sqrt(raceTime ** 2 - 4 * record)) / 2)
  const upperX = Math.ceil((raceTime + Math.sqrt(raceTime ** 2 - 4 * record)) / 2)

  return Math.abs(lowerX - upperX + 1)
}

// const res = solutions.reduce((acc, cur) => acc * cur, 1)

// console.log(res)

console.log(calculateTimePressedToBeatRecord(input.times, input.distances))
