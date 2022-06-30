'use strict';

///////////////////////////////////////
// Default Parameters

// const bookings = [];

// const createBooking = function (
//   flightNumber,
//   numberOfPassangers = 1, // Default parameters
//   price = 199 * numberOfPassangers // Default parameters
// ) {
//   // ES5
//   // numberOfPassangers = numberOfPassangers || 1;
//   // price = price || 199;

//   const booking = {
//     flightNumber,
//     numberOfPassangers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking); // When there are new booking we push
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);
// createBooking('LH123', undefined, 1000);

///////////////////////////////////////
// How Passing Arguments Works: Values vs. Reference

// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 23432432432432,
// };

// const checkIn = function (flightNumber, passenger) {
//   flightNumber = 'LH9990';
//   passenger.name = 'Mr.' + passenger.name;

//   if (passenger.passport === 23432432432432) {
//     alert('Checked in');
//   } else {
//     alert('Wrong passport');
//   }
// };

// // checkIn(flight, jonas);
// // console.log(flight);
// // console.log(jonas);

// // Is the same as doing
// // const flightNumber = flight;
// // const passenger = jonas;

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 1000000000);
// };

// newPassport(jonas);
// checkIn(flight, jonas);

///////////////////////////////////////
// Functions Accepting Callback Functions

// const oneWord = function (string) {
//   return string.replace(/ /g, '').toLowerCase(); // works with any string in our code
// };

// const upperFirstWord = function (string) {
//   const [first, ...others] = string.split(' ');
//   return [first.toUpperCase(), ...others].join('-');
// };

// // Higher-order function
// const transformer = function (string, fnctn) {
//   console.log(`Original string: ${string}`);
//   console.log(`Transformed string ${fnctn(string)}`);

//   console.log(`Transformed by: ${fnctn.name}`);
// };

// transformer('JavaScript is the best!', upperFirstWord);
// transformer('JavaScript is the best!', oneWord);

// // JS uses callbacks all the time
// const high5 = function () {
//   console.log('Hi');
// };
// document.body.addEventListener('click', high5);
// ['Jonas', 'Martha', 'Adam'].forEach(high5);

///////////////////////////////////////
// Functions Returning Functions

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// This value is now function greet
// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');

// greet('Hello')('Jonas');

// // Challenge
// const greetArray = greeting => name => console.log(`${greeting} ${name}`);

// greetArray('Hi')('Jonas');

///////////////////////////////////////
// The call and apply Methods

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   // book: function() {}
//   book(flightNumber, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNumber}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNumber}`, name });
//   },
// };

// lufthansa.book(239, 'Jonas Schmedtmann');
// lufthansa.book(635, 'John Smith');
// // console.log(lufthansa); // Array of 2 bookings

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;
// // Does NOT work
// // book(23, 'Sarah Williams');

// // Call method
// book.call(eurowings, 23, 'Sarah Williams');
// console.log(eurowings);
// book.call(lufthansa, 239, 'Mary Cooper');
// console.log(lufthansa);

// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };

// book.call(swiss, 583, 'Mary Cooper');

// // Apply method
// const flightData = [583, 'George Cooper'];
// book.apply(swiss, flightData);
// console.log(swiss);
// book.call(swiss, ...flightData);

///////////////////////////////////////
// The bind Method
// book.call(eurowings, 23, 'Sarah Williams');

// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(23, 'Steven Williams');

// const bookEW32 = book.bind(eurowings, 23);
// bookEW32('Jonas Schmedtmann');
// bookEW32('Martha Cooper');

// // With Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };
// lufthansa.buyPlane();

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// //Partial application

// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// // addVAT = value => value + value * 0.23

// console.log(addVAT(100));
// console.log(addVAT(23));

// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };
// const addVAT2 = addTaxRate(0.23);
// console.log(addVAT2(100));
// console.log(addVAT2(23));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.
Here are your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
HINT: Use many of the tools you learned about in this and the last section 😉
BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?
BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
GOOD LUCK 😀
*/

// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     // Get answer
//     const answer = Number(
//       prompt(
//         `${this.question}\n${this.options.join('\n')}\n(Write option number)`
//         // one new line for each option /n (join to transform to string)
//       )
//     );
//     console.log(answer);
//     // Register answer
//     typeof answer === 'number' &&
//       answer < this.answers.length &&
//       this.answers[answer]++;
//     this.displayResults();
//     this.displayResults('string');
//     // if it's true increase the answers array at the correct position
//   },
//   displayResults(type = 'array') {
//     if (type === 'array') {
//       console.log(this.answers);
//     } else if (type === 'string') {
//       // Poll results are 13, 2, 4, 1
//       console.log(`Poll results are ${this.answers.join(', ')}`);
//     }
//   },
// };
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));
// poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
