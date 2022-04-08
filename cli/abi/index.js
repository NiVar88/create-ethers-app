const { exec } = require('child_process')
const { resolve } = require('path')

const __src = resolve(__dirname, '../../src')
const start = function () {
  const command = `abi-types-generator "${__src}/Contracts/abis/ERC20.json" --output "${__src}/Types/abis" --name=ERC20`
  exec(command, (_, stdout) => {
    console.log(stdout)
  })
}
