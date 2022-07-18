import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

export class Store {
  public isConnected: boolean = false
  public pathFile: string = ''
  public state: any = null

  constructor(name: string, initState: any = {}) {
    this.pathFile = join(__dirname, `./_${name}.json`)

    if (existsSync(this.pathFile)) {
      const data = readFileSync(this.pathFile, 'utf8')
      this.state = JSON.parse(data || initState)
    } else {
      writeFileSync(this.pathFile, '')
      this.state = initState
    }

    this.isConnected = true
  }

  public setState(changes: any = {}) {
    if (this.isConnected) {
      // assigning changes to current state
      Object.assign(this.state, changes)
      writeFileSync(this.pathFile, JSON.stringify(this.state), { flag: 'w', encoding: 'utf8' })
    }
  }

  public clear() {
    if (this.isConnected && this.pathFile) {
      this.state = null
      writeFileSync(this.pathFile, '')
    }
  }
}
