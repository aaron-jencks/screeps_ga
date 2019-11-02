let creep_types = require('creep_types');

module.exports.create_creep = function(type, controller, build) {
    let gcontroller = Game.spawns[controller];
    let result = new creep_types[type](gcontroller);
    
    if(gcontroller.spawnCreep(build, {dry_run: true}))
    {
        gcontroller.spwanCreep(build, )
    }
}