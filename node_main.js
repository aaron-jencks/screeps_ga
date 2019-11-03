let ga = require('./ga');
let harv = require('./creeps/harvester');

var parents = [];
var tick_counts = [];
var creep_creation = [];
var current_creeps = [];
var tick = 0;
var iter_round = 0;
var screep_id = 0;

var population_size = 20;
var tick_length = 100;

var population_remaining = 0;
var pop = new ga.population(population_size, 0.25, 0, harv.harvester, ga.random_gene);

while(true) {
    console.log('Starting tick ' + (tick++).toString());

    console.log('population remaining ' + population_remaining);
    if(population_remaining > 0)
    {
        console.log('Creating a new creep');
        let wname = 'harvester' + screep_id;
        if(true)
        {
            let h = creep_creation.shift();
            //let cr = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], wname);
            //h.initialize(Game.spawns['Spawn1'], cr);
            screep_id++;
            current_creeps.push(h);
            tick_counts.push(tick_length);
        }
    }
    else
    {
        console.log('Creating round ' + iter_round);
        iter_round++;
        pop.initialize(parents);
        for(let p of pop.pop)
            creep_creation.push(p);
    }

    //console.log(Memory.tick_counts.length);
    for(let t = 0; t < tick_counts.length; t++)
    {
        //console.log('Computing creep ' + t + ' with gene ' + current_creeps[t].genes.charAt(0));
        current_creeps[t].determine_fitness();
        tick_counts[t]--;

        if(tick_counts[t] == 0)
        {
            current_creeps.shift().creep.suicide();
            tick_counts.shift();
            population_remaining--;
        }
    }
}