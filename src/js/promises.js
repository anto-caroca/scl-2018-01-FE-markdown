/*
* A promise is an object that can be used to represet the eventual completion or failure
of an asyncronous operation
*/
/*
var delay = (seconds, callback) => {
  setTimeout(callback, seconds * 1000)
}

delay(1, () => {
  console.log('the delay has ended')
})

console.log('end first tick')
*/
// USING PROMISES
/*
* The idea behind a promise is that we can wait for an asyncronous operation to complete
and then we can resolve the promise or we can say that that operation has completed successfully
*/

var delay = (seconds) => new Promise((resolve, reject) => { // the resolves function wil be invocked when we have a successful resolution to the promise
// create an error to use .catch method
//  throw new Error('argh')
  // instead of using a callback, we'll use resolves
  if (seconds > 3) {
    reject(new Error(`${seconds} is too long!`)) // if we invoke the reject method we can pass an error to the .catch() method
  }

  setTimeout(() => {
    // I can pass via data the resolve method
    resolve('the long delay has ended') // this message  will then be passed to the function that we send to the .then method
  }, seconds * 1000) // 1st argument is a function, 2nd argument is a number of seconds
})

// we don't have to use a callback
delay(1) // invoke the delay funciton and our promise will wait one second and pass the successful resolution of the promise to the .then method
  .then(console.log) // any handler that we wire up inside of this .then method will be invoked next
  .then(() => 42) // returning data
  .then((number) => console.log(`hello world ${number}`)) // 42 becomes the argument that it's passed to the .then method
  .catch((error) => console.log(`error: ${error.message}`)) // when we do the .catch() method our error itself will be passed
console.log('end first tick')

/*
* The result is the same as in the callback
The delay function is invoking the resolve method
instead of invoking the resolve method directly, we'll use arrow function inside of
the setTimeout function

The .then() method is set to take in functions. This is a chain because
we can add other .then methods

now, we are able to delay for one second, then log the message that we received from the promise to the console then we'll log another message to the console
These .then() methods give us a nice way of dealing with our code.
You can also return data from these .then() methods
*/
/*
* WE can handle errors using the .catch() method
notice that the result in the console is:
end first tick
error: argh
we don't have a huge error because we handled the error that has ocurred in the promise
we've wired up a  function to deal with that error.
We don't have to have an error to to have a rejection, we can simply invoke the reject method anytime we want

If an error occurs, we can handle it with the catch method, but also if we
reject the promise for any reason, we can also handle that with the .catch() method
*/
