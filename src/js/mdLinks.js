let path = require('path')
const Marked = require('marked')
const fetch = require('node-fetch')
const fs = require('fs')

const [, , ...userCLIArgs] = process.argv

let absolutePath = path.isAbsolute(`${process.cwd()}`) // true es absolute
if (absolutePath === false) {
  path.join(`${process.cwd()}, ${process.argv[1]}`)
  console.log(`ruta unida: ${process.cwd()}, ${process.argv[1]}`)
}

function readFilePromise (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        return reject(error)
      }
      return resolve(markdownLinkExtractor(data)) //  valor de retorno
    })
  })
}

readFilePromise(userCLIArgs[0]).then(() => {
}).catch((error) => {
  console.error('Error > ' + error)
})

function readDirPromise (dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (error, files) => {
      if (error) {
        return reject(error)
      }
      return resolve(files)
    })
  })
}

function numberPromise (dirpath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirpath, (error, files) => {
      if (error) {
        return reject(error)
      }
      return resolve(files.length)
    })
  })
}

let miPromesa = readDirPromise(process.cwd())

numberPromise(process.cwd())
  .then((result) => {
    console.log('cantidad de archivos en el directorio: > ' + result)
  })
  .catch((error) => {
    console.error('Error promesa > ' + error)
  })

function markdownLinkExtractor (markdown) {
  const links = []

  const renderer = new Marked.Renderer()

  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport

  renderer.link = function (href, title, text) {
    links.push({
      href: href,
      text: text,
      title: title
    })
  }
  renderer.image = function (href, title, text) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '')
    links.push({
      href: href,
      text: text,
      title: title
    })
  }
  Marked(markdown, {renderer: renderer})

  links.forEach((element) => { // busca dentro del objeto links
    const url = element.href // rescato las variables
    // const text = element.text
    const file = process.cwd()
    let validate = {}

    fetch(url).then(response => response).then((data) => {
      validate = {
        'Status': '' + data.status + ' ' + data.statusText + ' ' + url + ' -- ruta del archivo: ' + file
      }

      if (data.status >= 200 && data.status <= 399) {
        console.log(validate)
      }

      if (data.status >= 400 && data.status <= 499) {
        console.log(validate)
      }
    }).catch(() => {
      console.error('se ha producido un error')
    })
  })
}

module.exports = {
  markdownLinkExtractor,
  'readDirPromise': readDirPromise,
  'readFilePromise': readFilePromise
}
