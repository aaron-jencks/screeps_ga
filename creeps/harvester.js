let base = require('./creep')

class harvester extends base.base_creep {
    constructor(genes) {
        super(genes);
        this.role = 'harvester';

    }

    score_callback(caller, success)
    {
        if(typeof caller === 'Move' && success)
            this.score += 1;
        else if(typeof caller === 'Harvest' && success)
            if(this.score == 0)
                this.score += 50;
            else
                this.score += 100;
        else if(typeof caller === 'Unload' && success)
            if(this.score == 0)
                this.score += 100;
            else
                this.score += 1000;
    }

    determine_fitness()
    {
        this.pc.execute(this.genes);
        return this.score;
    }
}

module.exports.harvester = harvester;