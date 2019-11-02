let ga = require('./ga');

module.exports.roles = ['scout', 'harvester', 'builder'];

class normal extends ga.populant {
    constructor(controller) {
        super(ga.random_gene());
        this.role = '';
        this.room = controller.room;
        this.controller = controller;
        this.creep = null;
    }
}

module.exports.normal = normal;

class scout extends normal {
    constructor(controller, resource, enemies) {
        super(controller);
        this.role = 'scout';
        this.target = null;
        this.target_resource = resource;
        this.find_enemies = enemies;
    }
}

module.exports.scout = scout;

class harvester extends normal {
    constructor(controller)
    {
        super(controller);
        this.role = 'harvester';
        this.source = null;
    }
}

module.exports.harvester = harvester;

class builder extends scout {

}

module.exports.builder = builder;