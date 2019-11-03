let byte = require('./bytecode');
let readline = require('readline');

let pc = new byte.cpu(null, null, null);
pc.give_mains();

let r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exp = '+11';

if(exp === 'help')
{
    console.log('Bytecode Commands:\n------------------');
    console.log('Expressions are evaluated in postfix order.');
    console.log('&|? are greedy operators.');
    console.log('Math Operators:');
    console.log('+ab --> a + b');
    console.log('-ab --> a - b');
    console.log('*ab --> a * b');
    console.log('/ab --> a / b');
    console.log('Boolean Operators:');
    console.log('!a --> !a');
    console.log('>ab --> a > b');
    console.log(')ab --> a >= b');
    console.log('<ab --> a < b');
    console.log('(ab --> a <= b');
    console.log('=ab --> a == b');
    console.log('~ab --> a != b');
    console.log('&ab --> a && b');
    console.log('|ab --> a || b');
    console.log('^ab --> a ^^ b');
    console.log('Conditional Operators:');
    console.log('?abc --> if(a){b} else {c}');
    console.log('Storage and retrieval of variables:');
    console.log('.kv --> vtable[k] = v');
    console.log(',k --> vtable[k]');
}

pc.execute(exp);