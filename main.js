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

module.exports.loop = function () {
    console.log('Starting tick ' + (tick++).toString());

    console.log('population remaining ' + population_remaining);
    if(population_remaining > 0)
    {
        console.log('Trying to spawn a creep');
        let wname = 'harvester' + screep_id;
        let res = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], wname, {'dry_run': true})
        console.log('Error is ' + res);
        
        if(res == ERR_NAME_EXISTS)
        {
            console.log('The name with key ' + screep_id + ' already existed, spinning');
            let temp_num = screep_id;
            wname = 'harvester' + temp_num;
            while(res == ERR_NAME_EXISTS)
            {
                res = Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], wname, {'dry_run': true})
                wname = 'harvester' + ++temp_num;
            }
            
            console.log('ended up at ' + temp_num);
            
            screep_id = temp_num;
        }
        
        if(res == OK)
        {
            console.log('Spawning a creep');
            let h = creep_creation.shift();
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], wname);
            h.initialize(Game.spawns['Spawn1'], Game.creeps[wname]);
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
        pop.pop = [];
        population_remaining = population_size;
    }
    
    for(let t = 0; t < tick_counts.length; t++)
    {
        console.log('Computing creep ' + t + ' with gene ' + current_creeps[t].genes);
        current_creeps[t].determine_fitness();
        tick_counts[t]--;

        if(tick_counts[t] == 0)
        {
            console.log('Destroying a creep');
            let cl = current_creeps.shift();
            console.log('Final Score: ' + cl.score);
            pop.pop.push(cl);
            cl.creep.suicide();
            tick_counts.shift();
            population_remaining--;
            
            if(population_remaining == 0)
            {
                parents = pop.select_parents(5);
            }
        }
    }
}
