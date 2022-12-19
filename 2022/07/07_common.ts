import {inverse} from 'https://deno.land/std@0.168.0/fmt/colors.ts'
export class Common {
  pwd: Item = {size: 0, contents: {'/': {size: 0, contents: {}}}}
  start = this.pwd
  path: Item[] = []
  terminalOutput: string[]
  found = 0
  constructor(path: string) {
    this.terminalOutput = this.getData(path)
    this.parseOutput()
    console.log(this.found)
    Deno.writeTextFileSync('output.txt', JSON.stringify(this.start))
  }

  getData(path: string) {
    return Deno.readTextFileSync(path).split('\n')
  }

  parseOutput() {
    for (const line of this.terminalOutput) {
      console.log(inverse(line))
      const [first, second, third] = line.split(' ')
      if (first === '$') {
        // this is a command
        this.executeCommmand(second, third)
      } else if (first === 'dir') {
        // this line is a dir
        console.log('adding a dir')
        console.log(this.pwd)
        this.pwd.contents![second] = this.getEmptyDir()
      } else {
        // we have a file
        this.pwd.contents![second] = this.getFile(parseInt(first))
      }
    }
  }

  getFile(size: number): Item {
    return {
      size,
    }
  }

  executeCommmand(command: string, specifier: string) {
    if (command === 'cd') {
      return this.executeCd(specifier)
    }
  }

  executeCd(specifier: string) {
    if (specifier.includes('..')) {
      console.log('from', this.pwd)
      console.log(`to ${specifier}`)
      this.pwd.size = this.calculateDirSize(this.pwd)
      this.addToFoundDirectories(this.pwd)
      this.pwd = this.path.pop() as Item
    } else {
      this.path.push(this.pwd)
      this.pwd = this.pwd.contents![specifier]
    }
  }

  getEmptyDir(): Item {
    return {
      size: 0,
      contents: {},
    }
  }

  addToFoundDirectories(pwd: Item) {
    if (pwd.size <= 100000) {
      this.found += pwd.size
    }
  }

  calculateDirSize(dir: Item): number {
    let size = 0
    for (const key in dir.contents) {
      if (Object.prototype.hasOwnProperty.call(dir.contents, key)) {
        const item = dir.contents[key]
        size += item.size
      }
    }
    return size
  }
}

type Item = {
  size: number
  contents?: Record<string, Item>
}

const _c = new Common('07_input.txt')
