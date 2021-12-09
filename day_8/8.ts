// not my solution!! Credit goes to https://github.com/warriordog/advent-of-code-2021 for this solution as I was stuck at part 2
const io = require("../common/io.ts")

type Input = {patterns: string[][]; outputs: string[]}
type tDecoder = {[key: string]: number}

const inputs: Input[] = io.readLines("input.txt").map((entry) => {
  const [patterns, outputs] = entry.split("|")
  return {
    patterns: patterns
      .trim()
      .split(" ")
      .map((pattern) => pattern.split("").sort()),
    outputs: outputs
      .trim()
      .split(" ")
      .map((output) => output.split("").sort().join("")),
  }
})

const allSegments = ["a", "b", "c", "d", "e", "f", "g"]
const digitNumberMap = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9,
}

function decode(input: Input): tDecoder {
  // solve know letterns
  const pattern1 = input.patterns.find((p) => p.length === 2)
  const pattern4 = input.patterns.find((p) => p.length === 4)
  const pattern7 = input.patterns.find((p) => p.length === 3)

  const possibleMaps = {
    a: allSegments.filter((d) => !pattern1.includes(d) && !pattern4.includes(d) && pattern7.includes(d)),
    b: allSegments.filter((d) => !pattern1.includes(d) && pattern4.includes(d) && !pattern7.includes(d)),
    c: allSegments.filter((d) => pattern1.includes(d) && pattern4.includes(d) && pattern7.includes(d)),
    d: allSegments.filter((d) => !pattern1.includes(d) && pattern4.includes(d) && !pattern7.includes(d)),
    e: allSegments.filter((d) => !pattern1.includes(d) && !pattern4.includes(d) && !pattern7.includes(d)),
    f: allSegments.filter((d) => pattern1.includes(d) && pattern4.includes(d) && pattern7.includes(d)),
    g: allSegments.filter((d) => !pattern1.includes(d) && !pattern4.includes(d) && !pattern7.includes(d)),
  }

  // Now that we've narrowed the input, we can brute force the rest...
  const possibilities: Array<{}> = []

  function bruteForceRemainingF(a, b, c, d, e) {
    for (const f of possibleMaps.f) {
      if (f !== a && f !== b && f !== c && f !== d && f !== e) {
        bruteForceRemainingG(a, b, c, d, e, f)
      }
    }
  }

  function bruteForceRemainingG(a, b, c, d, e, f) {
    for (const g of possibleMaps.g) {
      if (g !== a && g !== b && g !== c && g !== d && g !== e && g !== f) {
        const map = {}
        map[a] = "a"
        map[b] = "b"
        map[c] = "c"
        map[d] = "d"
        map[e] = "e"
        map[f] = "f"
        map[g] = "g"
        possibilities.push(map)
      }
    }
  }

  function bruteForceRemainingE(a, b, c, d) {
    for (const e of possibleMaps.e) {
      if (e !== a && e !== b && e !== c && e !== d) {
        bruteForceRemainingF(a, b, c, d, e)
      }
    }
  }
  function bruteForceRemainingD(a, b, c) {
    for (const d of possibleMaps.d) {
      if (d !== a && d !== b && d !== c) {
        bruteForceRemainingE(a, b, c, d)
      }
    }
  }
  function bruteForceRemainingC(a, b) {
    for (const c of possibleMaps.c) {
      if (c !== a && c !== b) {
        bruteForceRemainingD(a, b, c)
      }
    }
  }
  function bruteForceRemainingB(a) {
    for (const b of possibleMaps.b) {
      if (b !== a) {
        bruteForceRemainingC(a, b)
      }
    }
  }
  function bruteForceRemainingA() {
    for (const a of possibleMaps.a) {
      bruteForceRemainingB(a)
    }
  }

  // Start brute forcing from digit "a"
  bruteForceRemainingA()

  const map: {[key: string]: any} = possibilities.find((map) =>
    input.patterns
      // The correct mapping is the one that decodes to a valid number for every unique input
      .every(
        (p) =>
          digitNumberMap[
            p
              .map((d) => map[d])
              .sort()
              .join("")
          ] !== undefined,
      ),
  )

  const pivot = {}
  pivot[map.a] = "a"
  pivot[map.b] = "b"
  pivot[map.c] = "c"
  pivot[map.d] = "d"
  pivot[map.e] = "e"
  pivot[map.f] = "f"
  pivot[map.g] = "g"

  const decoder: tDecoder = {}
  for (const [oldSegments, value] of Object.entries(digitNumberMap)) {
    const newSegments = oldSegments
      .split("")
      .map((d) => pivot[d])
      .sort()
      .join("")
    decoder[newSegments] = value
  }

  return decoder
}

function decodeInput(input: Input): number {
  // decode the mapping
  const decoder = decode(input)

  // convert all inputs
  const numbers = input.outputs.map((o) => String(decoder[o])).join("")

  return parseInt(numbers)
}

const sum = inputs.reduce((sum, input) => sum + decodeInput(input), 0)

console.log(`Solution for part 2 is: ${sum}`)
