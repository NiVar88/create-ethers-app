const { readFile, writeFile } = require('fs')
const assets = require('./preload-assets.json')

readFile('dist/index.html', 'utf8', (error, data) => {
  if (error) return console.log(error)

  let links = ''

  assets.forEach((asset) => {
    let attrs = [`href="${asset.href}"`, `as="${asset.as}"`]

    if (asset.type) {
      attrs.push(`type="${asset.as}/${asset.type}"`)
    }

    links += `<link rel="preload" ${attrs.join(' ')}>`
  })

  let result = data.replace('</head>', `${links}</head>`)

  writeFile('dist/index.html', result, 'utf8', (err) => {
    if (err) return console.log(err)
  })
})
