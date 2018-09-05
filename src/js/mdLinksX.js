const fs = require('fs')
const path = require('path')
const index = require('./index').default
const linkExtractor = require('./linkExtractor')
// Función que lee un archivo y retorna promesa con su contenido

function readFilePromise (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        return reject(error)
      }
      return resolve(data)
    })
  })
}

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

function numberOfTheBeastCallback (dirpath, funcionquerecibeelresultado) {
  fs.readdir(dirpath, (error, files) => {
    // PROHIBIDO : return files.length;
    funcionquerecibeelresultado(error, files.length)
  })
}

function numberOfTheBeastPromise (dirpath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirpath, (error, files) => {
      if (error) {
        return reject(error)
      }
      return resolve(files.length)
    })
  })
}

// console.log('Process.argv > ' + JSON.stringify(process.argv))
// console.log('CWD > ' + process.cwd()) // Me va a indicar donde se está ejecutando el archivo
const [, , ...userCLIArgs] = process.argv
console.log('Nombre del archivo ingresado > ' + JSON.stringify(userCLIArgs))

/* readFilePromise(path.join(process.cwd(), userCLIArgs[0])).then((data) => {
  console.log('Contenido del archivo > ' + JSON.stringify(data.split('\n')))
}).catch((error) => {
  console.error('Error > ' + error)
}) */

let miPromesa = readDirPromise(process.cwd())

numberOfTheBeastCallback(process.cwd(), (error, resultado) => {
  if (resultado) {
    console.log('Total archivos leídos > ' + resultado)
  } else {
    console.log(error)
  }
})

numberOfTheBeastPromise(process.cwd())
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

module.exports = {
  'readDirPromise': readDirPromise,
  'readFilePromise': readFilePromise,
  'numberOfTheBeastCallback': numberOfTheBeastCallback
}

/* guardo funcion fetch
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

    // otro fetch

    function status (response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }

  function json (response) {
    return response.json()
  }

  fetch(links)
    .then(status)
    .then(json)
    .then(function (data) {
      console.log('Request succeeded with JSON response', data.status)
    }).catch(function (error) {
      console.log('Request failed', error)
    })
*/
