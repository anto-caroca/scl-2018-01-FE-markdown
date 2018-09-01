const questions = [
  'What is your name?',
  'Enter --validate to start checking those links'
]
let answers = []

function ask (i) {
  process.stdout.write(`\n ${questions[i]}`)
  process.stdout.write(' > ')
}

process.stdin.on('data', function (data) {
  answers.push(data.toString().trim())

  if (answers.length < questions.length) {
    ask(answers.length)
  } else {
    process.exit()
  }
})
process.on('exit', function () {
  process.stdout.write(` \n ${answers[0]}, you wrote ${answers[1]} \n`)
  if (answers[1] !== '--validate') {
    process.stdout.write(`\n wrong command, please start again and write --validate \n`)
  } else {
    process.stdout.write(`\n reading files... \n`)
  }
})

ask(0)
/*
function toObject (answers) {
  var options = {}
  for (let i = 0; i < answers.length; ++i) {
    options[i] = answers[i]

    return options
  }
}
*/
