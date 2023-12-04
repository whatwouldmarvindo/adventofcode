import {readLines} from '../utils.ts'

const input = readLines('./02_input')

type Game = {
  id: number
  rounds: {green: number; blue: number; red: number}[]
}

function parse(lines: string[]): Game[] {
  return lines.map((line) => {
    const [gameIdSection, draws] = line.split(': ')
    const id = Number(gameIdSection.split(' ')[1])
    const draw = draws.split('; ')
    const rounds = draw.map(mapBags)
    return {id, rounds}
  }) as Game[]
}

function mapBags(bags: string) {
  const result = {}
  bags.split(', ').map((bag) => {
    const [amount, color] = bag.split(' ')
    result[color] = amount
  })
  return result
}

const games = parse(input)

const res = games.map((game) => {
  const minimumCubes = {red: 0, blue: 0, green: 0}
  game.rounds.forEach((round) => {
    let red, blue, green
    if (round.red) {
      red = Number(round.red)
    }
    if (round.blue) {
      blue = Number(round.blue)
    }
    if (round.green) {
      green = Number(round.green)
    }
    if (red && minimumCubes.red < red) {
      minimumCubes.red = red
    }
    if (blue && minimumCubes.blue < blue) {
      minimumCubes.blue = blue
    }
    if (green && minimumCubes.green < green) {
      minimumCubes.green = green
    }
  })

  console.log(`game: ${game.id} with minimumCubes: ${JSON.stringify(minimumCubes)}`)
  return minimumCubes.red * minimumCubes.blue * minimumCubes.green
})

console.log(res.reduce((acc, curr) => acc + curr, 0))
