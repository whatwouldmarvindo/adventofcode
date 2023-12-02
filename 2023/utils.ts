export function readLines(url: string): string[] {
  return Deno.readTextFileSync(url).split('\n')
}
