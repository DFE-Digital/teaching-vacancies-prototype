#!/usr/bin/env node
/**
 * Copy documentation screenshots from app/assets to public/ (for local npm start
 * and as a backup after gulp clean). Safe to run repeatedly.
 */

const fs = require('fs')
const path = require('path')

const srcRoot = path.join(__dirname, '../app/assets/images/documentation')
const destRoot = path.join(__dirname, '../public/images/documentation')

function copyDir (src, dest) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  for (const name of fs.readdirSync(src)) {
    const srcPath = path.join(src, name)
    const destPath = path.join(dest, name)
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath)
    } else if (name.endsWith('.png')) {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

copyDir(srcRoot, destRoot)
