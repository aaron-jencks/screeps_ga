let ga = require('../ga');
let byte = require('../bytecode');
let misc = require('../misc_util');


class Move extends byte.operation {
    constructor() {
        super('m', 1);
    }

    execute(params) {
        if(params.length > 0)
        {
            //console.log(typeof this.creep);
            console.log('Moving to ' + params[0]);
            
            let p = params[0];
            if(typeof p === 'string' && p.length == 1)
            {
                console.log(typeof misc.letter_to_map_coord);
                p = misc.letter_to_map_coord(p);
            }
            
            let r = this.creep.moveTo(p.x, p.y);
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
    constructor() {
        super('h', 1);
    }

    execute(params) {
        if(params.length > 0)
        {
            console.log('Harvesting resources');
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
    constructor() {
        super('u', 2);
    }

    execute(params)
    {
        if(params.length > 1)
        {
            console.log('Unloading resources to ' + params[0]);
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
    constructor() {
        super('f', 1);
    }

    execute(params)
    {
        if(params.length > 0)
        {
            console.log('Finding resource ' + params[0]);
            return this.room.find(params[0]);
        }

        return -1;
    }
}

class Home extends byte.operation {
    constructor() {
        super('b', 0);
    }

    execute(params) {
        console.log('Collecting home location');
        return this.home;
    }
}

class CFR extends byte.operation {
    constructor() {
        super('s', 0);
    }

    execute(params) {
        console.log('Collecting Creep fullness ratio');
        return this.creep.store.getFreeCapacity() / this.creep.store.getCapacity();
    }
}

class HFR extends byte.operation {
    constructor() {
        super('r', 0);
    }

    execute(params)
    {
        console.log('Collecting homebase fullness ratio');
        return this.home.store.getFreeCapacity() / this.home.store.getCapacity();
    }
}


class base_creep_pop extends ga.populant {
    score_callback = (operator, success) => {
        // This is where you update the current score based on 
        // Processed events.
    }
    
    constructor(genes) {
        super(genes);
        this.creep = null;
        this.room = null;
        this.spawner = null;

        this.operations = [new Move(), 
                           new Harvest(), 
                           new Unload(),
                           new FindResource(), 
                           new Home(),
                           new CFR(), 
                           new HFR()];
        this.pc = new byte.cpu(null, null, this.score_callback);
        this.pc.give_mains();
        for(let o of this.operations)
            this.pc.operations.push(o);
    }

    initialize(controller, creep) {
        console.log(typeof creep)
        this.creep = creep;
        this.room = controller.room;
        this.spawner = controller;
        this.pc.creep = this.creep;
        this.pc.room = this.room;
        this.pc.home = this.spawner;
    }
}

module.exports.base_creep = base_creep_pop;
