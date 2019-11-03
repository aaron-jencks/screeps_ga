class operation {
    constructor(code, num_params) {
        this.code = code;
        this.num_params = num_params;
        this.greedy = false;
    }

    greed_success(param)
    {
        // Code to determine if greedy quantification has occured
    }

    execute(params)
    {
        // Code specific execution
    }
}

function is_digit(d) {
    if(typeof d === "string")
    {
        for(let c of d)
            if(c.charCodeAt(0) < 48 || c.charCodeAt(0) > 57)
                return false;
        return true;
    }
}

module.exports.operation = operation;

class addition extends operation {
    constructor() {
        super('+', 2);
    }

    execute(params)
    {
        //console.log('Found addition')
        if(params.length >= 2)
        {
            let a = params[0];
            let b = params[1];
            if((typeof a === 'string') && is_digit(a))
                a = parseInt(a);
            if((typeof b === 'string') && is_digit(b))
                b = parseInt(b);
            return a + b;
        }
    }
}

module.exports.addition = addition;

class subtraction extends operation {
    constructor() {
        super('-', 2);
    }

    execute(params)
    {
        if(params.length >= 2)
        {
            let a = params[0];
            let b = params[1];
            if((typeof a === 'string') && is_digit(a))
                a = parseInt(a);
            if((typeof b === 'string') && is_digit(b))
                b = parseInt(b);
            return a - b;
        }
    }
}

module.exports.subtraction = subtraction;

class multiplication extends operation {
    constructor() {
        super('*', 2);
    }

    execute(params)
    {
        if(params.length >= 2)
        {
            let a = params[0];
            let b = params[1];
            if((typeof a === 'string') && is_digit(a))
                a = parseInt(a);
            if((typeof b === 'string') && is_digit(b))
                b = parseInt(b);
            return a * b;
        }
    }
}

module.exports.multiplication = multiplication;

class division extends operation {
    constructor() {
        super('/', 2);
    }

    execute(params)
    {
        if(params.length >= 2)
        {
            let a = params[0];
            let b = params[1];
            if((typeof a === 'string') && is_digit(a))
                a = parseInt(a);
            if((typeof b === 'string') && is_digit(b))
                b = parseInt(b);
            return a / b;
        }
    }
}

module.exports.division = division;

class gt extends operation {
    constructor() {
        super('>', 2);
    }

    execute(params)
    {
        if(params.length >= 2)
        {
            return params[0] > params[1];
        }
    }
}

module.exports.gt = gt;

class gteq extends operation {
    constructor() {
        super(')', 2);
    }

    execute(params)
    {
        if(params.length >= 2)
        {
            return params[0] >= params[1];
        }
    }
}

module.exports.gteq = gteq;

class lt extends operation {
    constructor() {
        super('<', 2);
    }

    execute(params)
    {
        if(params.length >= 2)
        {
            return params[0] < params[1];
        }
    }
}

module.exports.lt = lt;

class lteq extends operation {
    constructor() {
        super('(', 2);
    }

    execute(params)
    {
        if(params.length >= 2)
        {
            return params[0] <= params[1];
        }
    }
}

module.exports.lteq = lteq;

class eq extends operation {
    constructor() {
        super('=', 2);
    }

    execute(params)
    {
        if(params.length >= 2)
        {
            return params[0] === params[1];
        }
    }
}

module.exports.eq = eq;

class neq extends operation {
    constructor() {
        super('~', 2);
    }

    execute(params)
    {
        if(params.length >= 2)
        {
            return params[0] !== params[1];
        }
    }
}

module.exports.neq = neq;

class mcond extends operation {
    constructor() {
        super('?', 3);
        this.greedy = true;
    }

    greed_success(param) {
        return param.length == 2 && param[0] && param[0] !== 0;
    }

    execute(params)
    {
        if(params.length >= 2)
        {
            if(params[0] && params[0] !== 0)
                return params[1];
            else
                return params[2];
        }
    }
}

module.exports.mcond = mcond;

class and extends operation {
    constructor() {
        super('&', 2);
        this.greedy = true;
    }

    greed_success(param) {
        return param.length > 0 && (!param[0] || param[0] === 0);
    }

    execute(params)
    {
        if(params.length > 0)
        {
            return params[0] && params[0] !== 0 && params[1] && params[1] !== 0;
        }
    }
}

module.exports.and = and;

class or extends operation {
    constructor() {
        super('|', 2);
        this.greedy = true;
    }

    greed_success(param) {
        return param.length > 0 && param[0] && param[0] !== 0;
    }

    execute(params)
    {
        if(params.length > 0)
        {
            return (params[0] && params[0] !== 0) || (params[1] && params[1] !== 0);
        }
    }
}

module.exports.or = or;

class xor extends operation {
    constructor() {
        super('^', 2);
    }

    execute(params)
    {
        if(params.length >= 2)
        {
            let a = params[0] && params[0] !== 0;
            let b = params[1] && params[1] !== 0;
            return (a || b) && !(a && b);
        }
    }
}

module.exports.xor = xor;

class not extends operation {
    constructor() {
        super('!', 1);
    }

    execute(params)
    {
        if(params.length > 0)
        {
            return !params[0] || params[0] === 0;
        }
    }
}

module.exports.not = not;

class store extends operation {
    constructor() {
        super('.', 2);
    }

    execute(params) {
        if(params.length >= 2)
        {
            this.vtable[params[0]] = params[1];
        }
    }
}

module.exports.store = store;

class retrieve extends operation {
    constructor() {
        super(',', 1);
    }

    execute(params) {
        if(params.length > 0)
        {
            if(params[0] in this.vtable)
                return this.vtable[params[0]];
            else
                return null;
        }
    }
}

module.exports.retrieve = retrieve;

var mainops = [
    new addition(),
    new subtraction(),
    new multiplication(),
    new division(),
    new gt(),
    new gteq(),
    new lt(),
    new lteq(),
    new eq(),
    new neq(),
    new mcond(),
    new and(),
    new or(),
    new xor(),
    new not(),
    new store(),
    new retrieve()
]

module.exports.mainops = mainops;

class cpu {
    constructor(creep, spawner, callback) {
        this.operations = [];
        this.vtable = {};
        this.persistant = true;
        this.creep = creep;
        this.cbck = callback;
        
        let temp = null;
        if(spawner)
            temp = spawner.room;
        
        this.room = temp;
        this.home = spawner
    }

    give_mains() {
        //console.log('Size of main operations: ' + mainops.length.toString());
        for(let m of mainops)
            this.operations.push(m);
        // this.operations.concat(mainops);
        //console.log('Size of operations: ' + this.operations.length.toString());
    }

    find(command) {
        for(let o of this.operations)
        {
            //console.log('Comparing ' + command.toString() + ' to ' + o.code.toString());
            if(o.code === command)
                return o;
        }
        return null;
    }

    execute(data) {
        if(!this.persistant)
            this.vtable = {};

        let operand_stack = [];
        let operator_stack = [];
        let counter_stack = [];
        let greed_counter = 0;

        let counter = 0;
        let operator = null;
        for(let d of data)
        {
            //console.log('Parsing ' + d.toString() + ' type: ' + typeof d);
            operator = this.find(d);
            if(operator)
            {
                //console.log('Found an operator! ' + d.toString());
                operator_stack.unshift(operator);
                counter_stack.unshift(counter);
                counter = 0;

                if(greed_counter > 0)
                    greed_counter++;
            }
            else if(operator_stack.length > 0)
            {
                ////console.log(counter);
                operand_stack.unshift(d);
                counter++;
                ////console.log(counter);

                if(operator_stack[0].greedy)
                {
                    let params = []
                    for(let o = 0; o < counter; o++)
                        params.unshift(operand_stack.shift());

                    if(operator_stack[0].greed_success.call(this, params))
                    {
                        greed_counter++;
                        operand_stack.unshift(operator_stack.shift().execute.call(this, params));

                        if(operator_stack.length > 0)
                            counter = counter_stack.shift();
                    }
                    else
                    {
                        for(let o of params)
                            operand_stack.unshift(o);
                    }
                }

                if(operator_stack.length > 0)
                {
                    ////console.log(operator_stack[0].num_params);
                    ////console.log(counter);
                    if(counter == operator_stack[0].num_params)
                    {
                        if(greed_counter > 0)
                            greed_counter--;
                        else
                        {
                            let params = []
                            for(let o = 0; o < counter; o++)
                                params.unshift(operand_stack.shift());
                            operand_stack.unshift(operator_stack.shift().execute.call(this, params));
                        }

                        if(operator_stack.length > 0)
                            counter = counter_stack.shift();
                    }
                }
            }
        }

        if(operand_stack.length > 0)
            return operand_stack.shift();
        else
            return 0;
    }
}

module.exports.cpu = cpu;