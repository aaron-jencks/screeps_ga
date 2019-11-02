let ga = require('./ga');
let byte = require('./bytecode')

function print_pops(population) {
    for(let p of population.pop)
    {
        console.log('Gene: ' + p.genes + ' Score: ' + p.score.toString());
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

console.log('Creating new population');

let function_length = 75;

function create_random_function() {
    let result = ''
    for(let i = function_length; i >= 0 && result.length < function_length; i--)
    {
        let typ = getRndInteger(0, 2);

        if(typ == 0)
        {
            let op = getRndInteger(0, byte.mainops.length);
            result += byte.mainops[op].code;
            i += byte.mainops[op].num_params;
        }
        else
        {
            typ = getRndInteger(0, 3);
            switch(typ)
            {
                case 0:
                    result += String.fromCharCode(getRndInteger(48, 58));
                    break;
                case 1:
                    result += String.fromCharCode(getRndInteger(65, 91));
                    break;
                case 2:
                    result += String.fromCharCode(getRndInteger(97, 123));
                    break;
            }
        }
    }
    return result;
}

class StringPop extends ga.populant {
    constructor(genes) {
        super(genes);
        this.processor = new byte.cpu();
        this.processor.give_mains();
    }

    determine_fitness() {
        this.score = this.processor.execute(this.genes);
        if(this.score)
        {
            if(typeof this.score === 'string')
            {
                let sum = 0;
                for(let d of this.score)
                    sum += d.charCodeAt(0);
                this.score = sum;
            }
        }
        else this.score = 0;

        return this.score;
    }
}

let pop = new ga.population(20, 0.25, 0, StringPop, ga.random_g);

let iteration = 1;
let parents = []
while(true)
{
    console.log('\033[H')//\033[2J')
    if(iteration % 10 == 0)
        console.log('\033[2J');
    console.log('\nStarting iteration ' + (iteration++).toString());
    parents = pop.train(1, 5, parents);

    console.log('Population after iteration');
    print_pops(pop);
}