// console.log(arguments);

// console.log(require('module').wrapper);

const Calculator = require('./test-module-1.js');
// console.log(Calculator);

// import { Calculator } from './test-module.js';
const Calc = new Calculator();
// console.log(Calc);

console.log(Calc.add(3, 5));

// --------

// const calc2 = require('./test-module-2');
const { add, multiply, divide } = require('./test-module-2');
// console.log(calc2.add(4, 7));
console.log(add(4, 7));

// Caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
