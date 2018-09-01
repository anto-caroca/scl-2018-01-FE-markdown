#!/usr/bin/env node

const mdLinks = require('./mdLinks.js').mdLinks
const linkExtractor = require('./linkExtractor')

if (require.main === module) {
  let options = {}
  if (process.argv.indexOf('--validate') >= 0) {
    options.validate = true
  }
  mdLinks(process.argv[2], options).then((links) => {
    links.forEach((link) => {
      if (link.ok) {
        console.log(link.file, ':', link.line, link.href, 'ok:', link.ok)
      } else {
        console.log(link.file, ':', link.line)
      }
    })
  }).catch((error) => {
    console.error('mdLinks ha fallado')
    console.error('error', error)
  })
}
module.exports = mdLinks
