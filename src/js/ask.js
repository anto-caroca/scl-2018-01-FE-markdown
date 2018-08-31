const questions = [
  'What is your name?',
  'Do you want to start coding those promises?'
]
let answers = []

function ask (i) {
  process.stdout.write(`\n\n\n ${questions[i]}`)
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
  process.stdout.write('\n\n\n')
  process.stdout.write(`${answers[0]}, you answered ${answers[1]} to the coding stuff, so don't waste time!`)
})

ask(0)
