#!/usr/bin/env node
/**
 * Preflight for Express 5 path-to-regexp v8: unnamed `*` wildcards throw at startup.
 * Run: node scripts/check-express5-routes.js
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const patterns = [
  { re: /router\.(all|get|post|put|delete|patch)\(\s*['"]\*['"]/g, msg: 'router.*("*") — use router.use() for catch-all middleware' },
  { re: /router\.(all|get|post|put|delete|patch)\([^)]*\/\*['"]/g, msg: 'unnamed path wildcard `/`*` — use `/*splat` (Express 5)' },
  { re: /\.(all|get|post|put|delete|patch)\(\s*['"]\*['"]/g, msg: 'app.*("*") — use a named wildcard or router.use()' }
]

const skipDirs = new Set(['node_modules', '.git', 'public'])

function walk (dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (skipDirs.has(name)) continue
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) walk(full, files)
    else if (name.endsWith('.js')) files.push(full)
  }
  return files
}

const issues = []
for (const file of walk(root)) {
  const rel = path.relative(root, file)
  const content = fs.readFileSync(file, 'utf8')
  for (const { re, msg } of patterns) {
    re.lastIndex = 0
    if (re.test(content)) issues.push({ file: rel, msg })
  }
}

if (issues.length) {
  console.error('Express 5 route issues:\n')
  for (const { file, msg } of issues) console.error(`  ${file}: ${msg}`)
  process.exit(1)
}

console.log('Express 5 route preflight: OK')
