export function readLines(url: string): string[] {
  return Deno.readTextFileSync(url).split('\n')
}

export function readGrid(url: string): string[][] {
  return readLines(url).map((line => line.split('')))
}
