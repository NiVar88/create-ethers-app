const { exec } = require('child_process')
const { appendFileSync, readdirSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const __src = resolve(__dirname, '../src')
const __dir = [`${__src}/Contracts/Abis`, `${__src}/Types/Abis`]

const __exec = (fileName) => {
  const command = [
    `abi-types-generator`,
    `${__dir[0]}/${fileName}.json`,
    `--output=${__dir[1]}`,
    `--name=${fileName}`,
    `--provider=web3`
  ]

  exec(command.join(' '), (err, stdout) => {
    if (err) {
      console.error(`exec error: ${err}`)
      return
    }

    console.log(`stdout: ${stdout}`)
  })
}

const __export = (fileName) => {
  const context = [`export`, `type`, `{ ContractContext as ${fileName}Interface }`, `from`, `'./${fileName}'`]
  appendFileSync(`${__dir[1]}/index.ts`, `${context.join(' ')}\n`)
}

// Start
writeFileSync(`${__dir[1]}/index.ts`, '')
readdirSync(__dir[0]).forEach((file) => {
  const [fileName] = file.split('.')

  __exec(fileName)
  __export(fileName)
})
