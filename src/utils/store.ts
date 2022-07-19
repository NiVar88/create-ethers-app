import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs'
import { join } from 'path'

export class Store {
  public isConnected: boolean
  public pathFile: string

  constructor(name: string, public state: any) {
    this.pathFile = join(`data/_${name}.json`)

    if (existsSync(this.pathFile)) {
      const data = readFileSync(this.pathFile, 'utf8')
      if (data) {
        this.state = JSON.parse(data)
      }
    } else {
      writeFileSync(this.pathFile, '')
    }

    this.isConnected = true
  }

  public setState(changes: any) {
    if (this.isConnected) {
      const data = this.state || {}
      writeFileSync(this.pathFile, JSON.stringify(data), { flag: 'w', encoding: 'utf8' })
      Object.assign(data, changes)
    }
  }

  public clear() {
    if (this.isConnected) {
      this.state = null
      unlinkSync(this.pathFile)
    }
  }
}
