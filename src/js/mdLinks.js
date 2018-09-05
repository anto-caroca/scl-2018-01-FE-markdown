let path = require('path')
const Marked = require('marked')
const fetch = require('node-fetch')
const fs = require('fs')

let absolutePath = path.isAbsolute(`${process.cwd()}`) // true es absolute
if (absolutePath === true) {
  console.log(`Ruta absoluta: ${process.cwd()}`)
} else if (absolutePath === false) {
  path.join(`${process.cwd()}, ${process.argv[2]}`)
  console.log(`ruta unida: ${process.cwd()}, ${process.argv[2]}`)
}

const [, , ...userCLIArgs] = process.argv

function readFilePromise (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        return reject(error)
      }
      markdownLinkExtractor(data) //  valor de retorno
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
    console.log('Resultado  > ' + result)
  })
  .catch((error) => {
    console.error('Error promesa > ' + error)
  })

let miVariableNoTanGlobal
let miErrorNoTanGlobal
miPromesa.then((dirFiles) => {
  const filePromises = dirFiles.map((aFile) => {
    return readFilePromise(aFile)
  })
  return Promise.all(filePromises) // Retorno promesa
}).then((filesData) => { // Recibo los resultados de la promesa que se retornó en el then anterior
  miVariableNoTanGlobal = filesData
}).catch((error) => {
  console.error('Error > ' + error)
  miErrorNoTanGlobal = error
}).then(() => { // Es una función que se ejecuta después de TODO
  console.log('Variable no tan global > ' + JSON.stringify(miVariableNoTanGlobal))
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
  fetch(`${links}`).then(function (response) {
    if (response.ok) {
      response.json().then(function (options) {
        options.validate = true
      })
    } else {
      console.log('Respuesta de red OK.')
    }
  })
    .catch(function (error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message)
      // console.log((`${Object.entries(links[5])}`))
    })
  /* links.forEach((element) => { // busca dentro del objeto links
       const url = element.href // rescato las variables
       const txt = element.text
       const line = finalnumline

       fetch(url).then(response => response).then((data) => {
         validate = {
           'Status': data.status + ' ' + data.statusText  + url,
         }

         if (data.status >= 200 && data.status <= 399) {
           console.log(colors.green(validate));
         }

         if (data.status >= 400 && data.status <= 499) {
           console.log(colors.red(validate));
         }
       }).catch(() => {
         console.error('error de catch');
       })
     })
   } */

  console.log(links)
}

module.exports = {
  markdownLinkExtractor,
  'readDirPromise': readDirPromise,
  'readFilePromise': readFilePromise
}
