const fs = require('fs')
const path = require('path')

const files = [
  'node_modules/http-proxy/lib/http-proxy/index.js',
  'node_modules/http-proxy/lib/http-proxy/common.js'
]

files.forEach(function (file) {
  const fullPath = path.join(__dirname, '..', file)
  if (!fs.existsSync(fullPath)) return

  const source = fs.readFileSync(fullPath, 'utf8')
  const patched = source.replace(/require\(['"]util['"]\)\._extend/g, 'Object.assign')
  if (patched !== source) fs.writeFileSync(fullPath, patched)
})
