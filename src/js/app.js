#!/usr/bin/env node
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})
const path = require('path')
path.isAbsolute('/baz/..') // true

path.join('/foo', 'bar', 'baz/asdf', 'quux', '..') // Returns: '/foo/bar/baz/asdf'

console.log(`Current directory: ${process.cwd()}`)
