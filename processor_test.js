let byte = require('./bytecode')

let pc = new byte.cpu();
pc.give_mains();

console.log('Trying 1+1')
console.log((pc.execute('+11')).toString());
