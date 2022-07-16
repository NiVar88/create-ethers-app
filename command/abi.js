const { exec } = require('child_process')
const { appendFileSync, readdirSync, writeFileSync } = require('fs')
const { resolve } = require('path')

const __src = resolve(__dirname, '../src')
const __dir = [`${__src}/contracts/abis`, `${__src}/types/abis`]

const __exec = (fileName) => {
  const command = [
    `abi-types-generator`,
    `${__dir[0]}/${fileName}.json`,
    `--output=${__dir[1]}`,
    `--name=${fileName}`,
    `--provider=ethers_v5`
  ].join(' ')

  exec(command, (err, stdout) => {
    if (err) {
      console.error(`exec error: ${err}`)
      return
    }

    console.log(`stdout: ${stdout}`)
  })
}

const __export = (fileName) => {
  const context = [`export`, `type`, `{ ContractContext as ${fileName}Interface }`, `from`, `'./${fileName}'`].join(' ')
  appendFileSync(`${__dir[1]}/index.ts`, `${context}\n`)
}

// Start
writeFileSync(`${__dir[1]}/index.ts`, '')
readdirSync(__dir[0]).forEach((file) => {
  const [fileName] = file.split('.')

  __exec(fileName)
  __export(fileName)
})
