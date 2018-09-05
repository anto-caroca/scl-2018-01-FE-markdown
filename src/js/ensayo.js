const fs = require('fs')
const marked = require('./linkExtractor')
const fetch = require ('node-fetch')

/*
// Asynchronously Read from Files with encoding
fs.readFile('../../README.md', { encoding: 'utf8' }, (err, content) => {
  if (err) return console.error(err)
  console.log(content)
})

// Relative paths
const path = require('path')
fs.readFile(path.resolve(__dirname, '../../README.md'), { encoding: 'utf8' }, (err, content) => {
  if (err) return console.error(err)
  else console.log(content)
})

// Reading a file line by line
const readline = require('readline')
var file = '../../README.md'
var rl = readline.createInterface({
  input: fs.createReadStream(file),
  output: process.stdout,
  terminal: false
})
rl.on('line', function (line) {
  console.log(line) // print the content of the line on each linebreak
})

// Line-by-line file reading
const readline = require('readline')
const rl = readline.createInterface({
  input: fs.createReadStream('../../README.md')
})
// Each new line emits an event - every time the stream receives \r, \n, or \r\n
rl.on('line', (line) => {
  console.log(line)
})
rl.on('close', () => {
  console.log('Done reading file')
})

// Prompting user input via CLI
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.question('What is your name?', (name) => {
  console.log(`Hello ${name}!`)
  rl.close()
})

// Node.js code for STDIN and STDOUT without using any library (it's just parroting)
process.stdin.resume()
console.log('Enter the data to be displayed ')
process.stdin.on('data', function (data) { process.stdout.write(data) })

// Determining the line count of a text file
const readline = require('readline')
var file = '../../README.md'
var linesCount = 0
var rl = readline.createInterface({
  input: fs.createReadStream(file),
  output: process.stdout,
  terminal: false
})
rl.on('line', function (line) {
  linesCount++ // on each linebreak, add +1 to 'linesCount'
})
rl.on('close', function () {
  console.log(linesCount) // print the result when the 'close' event is called
})

// Read the contents of the directory /usr/local/bin asynchronously.
// The callback will be invoked once the operation has either completed
// or failed.
fs.readdir('/usr/local/bin', (err, files) => {
  // On error, show it and return
  if (err) return console.error(err)
  // files is an array containing the names of all entries
  // in the directory, excluding '.' (the directory itself)
  // and '..' (the parent directory).
  // Display directory entries
  console.log(files.join(' ')) // // _mocha eslint fileLinks firebase htmlhint mocha n node npm npx nyc opener
})
*/
// using streams in order to read the file's content, piece by piece:
// this lets you do some processing on the file while it is being read (!)
var fileStream = fs.createReadStream(`${__dirname}`)
var fileContent = ''
fileStream.on('data', data => {
  fileContent += data.toString()
})
fileStream.on('end', () => {
  console.log(fileContent)
})
fileStream.on('error', err => {
  // handleError(err)
  if (err) return console.error(err)
})
