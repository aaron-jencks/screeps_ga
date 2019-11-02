let ga = require('ga');
let harv = require('harvester');

Memory.parents = [];
Memory.tick_counts = [];
Memory.creep_creation = [];
Memory.current_creeps = [];
Memory.tick = 0;
Memory.iter_round = 0;
Memory.screep_id = 0;

Memory.population_size = 20;
Memory.tick_length = 100;

Memory.population_remaining = Memory.population_size;
Memory.pop = new ga.population(Memory.population_size, 0.25, 0, harv.harvester, ga.random_gene);

module.exports.loop = function () {
    console.log('Starting tick ' + (Memory.tick++).toString());

    console.log('population remaining ' + Memory.population_remaining);
    if(Memory.population_remaining > 0)
    {
        let wname = 'harvester' + Memory.screep_id;
        if(Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], wname, {'dry_run': true}) == OK)
        {
            let h = Memory.creep_creation.shift();
            let cr = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], wname);
            h.initialize(Game.spawns['Spawn1'], cr);
            Memory.screep_id++;
            Memory.current_creeps.push(h);
            Memory.tick_counts.push(Memory.tick_length);
        }
    }
    else
    {
        console.log('Creating round ' + Memory.iter_round);
        Memory.iter_round++;
        Memory.pop.initialize(Memory.parents);
        for(let p of Memory.pop.pop)
            Memory.creep_creation.push(p);
    }

    console.log(Memory.tick_counts.length);
    for(let t = 0; t < Memory.tick_counts.length; t++)
    {
        console.log('Computing creep ' + t + ' with gene ' + Memory.current_creeps[t].genes);
        Memory.current_creeps[t].determine_fitness();
        Memory.tick_counts[t]--;

        if(Memory.tick_counts[t] == 0)
        {
            Memory.current_creeps.shift().creep.suicide();
            Memory.tick_counts.shift();
            Memory.population_remaining--;
        }
    }
}