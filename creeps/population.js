let ga = require('../ga');
let harv = require('./harvester');

class creep_population extends ga.population {
    constructor(pop_count, mutation_rate, raw_count, gene_function){
        super(pop_count, mutation_rate, raw_count, harv.harvester, gene_function);
    }

    initialize(parent_pool) {
        this.pop = [];

        if(parent_pool.length == 0)
            for(let i = 0; i < this.count; i++)
            {
                let p = new this.populant(this.gene_function());
                console.log(p.genes);
                this.pop.push(p);
            }
        else if(parent_pool.length == 1)
            for(let i = 0; i < this.count; i++)
                this.pop.push(new this.populant(parent_pool[0].genes));
        else
        {
            for(let i = 0; i < this.count; i++)
            {
                let pai = getRndInteger(0, parent_pool.length);
                let pbi = getRndInteger(0, parent_pool.length);
                let temp_pa = new this.populant(parent_pool[pai].genes);

                let should_mute = Math.random() < this.mutation_rate;
                temp_pa.mate(parent_pool[pbi], should_mute);
                this.pop.push(temp_pa);
            }
        }
    }
}