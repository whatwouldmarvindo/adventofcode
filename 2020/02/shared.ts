type input = {
  min: number
  max: number
  letter: string
  password: string
}
const filePath = '2020/02/input.txt'
export const data: input[] = Deno.readTextFileSync(filePath)
  .split('\n')
  .map((line) => {
    const [rules, letterAndColon, password] = line.split(' ')
    const [min, max] = rules.split('-')
    const letter = letterAndColon.charAt(0)
    return {
      min: parseInt(min),
      max: parseInt(max),
      letter,
      password,
    }
  })