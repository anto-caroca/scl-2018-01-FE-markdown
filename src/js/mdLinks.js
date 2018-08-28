const fs = require('fs')
/*
// Asynchronously Read from Files with encoding
fs.readFile('mdLinks.js', { encoding: 'utf8' }, (err, content) => {
  if (err) return console.error(err)
  console.log(content)
})

// Relative paths
const path = require('path')
fs.readFile(path.resolve(__dirname, 'mdLinks.js'), { encoding: 'utf8' }, (err, content) => {
  if (err) return console.error(err)
  else console.log(content)
})

// Reading a file line by line
const readline = require('readline')
var file = 'app.js'
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
  input: fs.createReadStream('holi.txt')
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
*/

// Node.js code for STDIN and STDOUT without using any library
process.stdin.resume()
console.log('Enter the data to be displayed ')
process.stdin.on('data', function (data) { process.stdout.write(data) })
