let ga = require('ga')
let byte = require('bytecode')


class Move extends byte.operation {
    constructor(callback) {
        super('m', 1);
        this.cbck = callback;
    }

    execute(params) {
        if(params.length > 0)
        {
            let r = this.creep.moveTo(params[0]);
            if(r == OK)
                this.cbck(this, true);
            else
                this.cbck(this, false);
            return r;
        }

        return -1;
    }
}

class Harvest extends byte.operation {
    constructor(callback) {
        super('h', 1);
        this.cbck = callback;
    }

    execute(params) {
        if(params.length > 0)
        {
            if(this.creep.harvest(params[0]) != OK)
            {
                this.cbck(this, false);
                return this.creep.moveTo(params[0]);
            }
            this.cbck(this, true);
        }

        return -1;
    }
}

class Unload extends byte.operation {
    constructor(callback) {
        super('u', 2);
        this.cbck = callback;
    }

    execute(params)
    {
        if(params.length > 1)
        {
            if(this.creep.transfer(params[0], params[1]) != OK)
            {
                this.cbck(this, false);
                return this.creep.moveTo(params[0]);
            }
            this.cbck(this, true);
        }

        return -1;
    }
}

class FindResource extends byte.operation {
    constructor(callback) {
        super('f', 1);
        this.cbck = callback;
    }

    execute(params)
    {
        if(params.length > 0)
        {
            return this.room.find(params[0]);
        }

        return -1;
    }
}

class Home extends byte.operation {
    constructor(callback) {
        super('b', 0);
        this.cbck = callback;
    }

    execute(params) {
        return this.home;
    }
}

class CFR extends byte.operation {
    constructor(callback) {
        super('s', 0);
        this.cbck = callback;
    }

    execute(params) {
        return this.creep.store.getFreeCapacity() / this.creep.store.getCapacity();
    }
}

class HFR extends byte.operation {
    constructor(callback) {
        super('r', 0);
        this.cbck = callback;
    }

    execute(params)
    {
        return this.home.store.getFreeCapacity() / this.home.store.getCapacity();
    }
}


class base_creep_pop extends ga.populant {
    constructor(genes) {
        super(genes);
        this.creep = null;
        this.room = null;
        this.spawner = null;

        this.operations = [new Move(this.score_callback), 
                           new Harvest(this.score_callback), 
                           new Unload(this.score_callback),
                           new FindResource(this.score_callback), 
                           new Home(this.score_callback),
                           new CFR(this.score_callback), 
                           new HFR(this.score_callback)];
        this.pc = new byte.cpu();
        this.pc.give_mains();
        this.pc.creep = this.creep;
        this.pc.room = this.room;
        this.home = this.spawner
        for(let o of this.operations)
            this.pc.operations.push(o);
    }

    initialize(controller, creep) {
        this.creep = creep;
        this.room = controller.room;
        this.spawner = controller;
        this.pc.creep = this.creep;
        this.pc.room = this.room;
        this.pc.home = this.spawner;
    }

    score_callback(operator, success) {
        // This is where you update the current score based on 
        // Processed events.
    }
}

module.exports.base_creep = base_creep_pop;