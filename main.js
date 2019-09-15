import 'core-js';

// import -keyword
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
import Human from './Human';

const name = "Sale";
const age = 34;

// Shorthand objects
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015
const saleSettings = {
    name,
    age
}

// // Old way
// const saleSettings = {
//     name: name,
//     age: age
// }


const Sale = new Human(saleSettings)
Sale.sayHello();

// Destructuring
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// const { name, age } = Sale;
// Yo. on sama ku ao.
// const name = Sale.name;
// const age = Sale.age;