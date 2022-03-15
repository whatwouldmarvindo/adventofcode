import {readSections} from '../common/io'

export type Polymer = {element: string; next: Polymer | undefined}
export type Insertion = {elem1: string; element2: string; newElem: string}
export type Insertions = Record<string, Record<string, string>>

export function parseInput(path: string): {template: Polymer, insertions: Insertions} {
  const [template, insertions] = readSections(path)
  return {
    template: template
      .split('')
      .map((element) => ({
        element,
        next: undefined,
      }))
      .reduceRight((next, current) => {
        current.next = next
        return current
      }, undefined),

    insertions: insertions
      .split('\n')
      .map((i) => i.split(' -> '))
      .reduce((map, [match, newElem]) => {
        const [elem1, elem2] = match.split('')
        const e2Map = map[elem1] || (map[elem1] = Object.create(null))
        e2Map[elem2] = newElem
        return map
      }, Object.create(null)),
  }
}
