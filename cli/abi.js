const { exec } = require('child_process')
const { readdirSync } = require('fs')
const { resolve } = require('path')

const __src = resolve(__dirname, '../src')
const __dir = [`${__src}/Contracts/Abis`, `${__src}/Types/Abis`]
const __start = (fileName) => {
  const command = [`abi-types-generator`, `${__dir[0]}/${fileName}.json`, `--output`, __dir[1], `--name=${fileName}`]
  exec(command.join(' '), (err, stdout) => {
    if (err) {
      console.error(`exec error: ${err}`)
      return
    }

    console.log(`stdout: ${stdout}`)
  })
}

const files = readdirSync(__dir[0])
for (const file of files) {
  const [fileName] = file.split('.')
  __start(fileName)
}
