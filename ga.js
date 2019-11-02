function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function random_char() {
    return String.fromCharCode(getRndInteger(33, 127));
}

let gene_length = 150;

function random_gene() {
    let temp = '';
    for(let i = 0; i < gene_length; i++)
        temp += random_char();
    return temp;
}

module.exports.random_gene = random_gene;

class populant {
    constructor(genes) {
        this.genes = genes;
        this.score = -1;
    }

    mutate() {
        if(this.genes.length == 0)
            this.genes += random_char();
        else {
            let r = getRndInteger(0, 3);
            //console.log('mutation is ' + r.toString());
            let i = getRndInteger(0, this.genes.length);
            let before = this.genes.substring(0, i);
            let after = this.genes.substring(i + 1);
            let c = random_char();
            switch(r) {
                case 0:
                    // Remove a character
                    this.genes = before + after;
                    break;
                case 1:
                    // Replace a character
                    this.genes = before + c + after;
                    break;
                case 2:
                    // Add a character
                    after = this.genes.substring(i);
                    this.genes = before + c + after;
                    break;
            }
        }
    }

    mate(other, mutate) {
        let i = 0;
        let temp = '';
        let limit = this.genes.length;
        if(other.genes.length > limit)
            limit = other.genes.length;

        for(i = 0; i < limit; i++)
        {
            if(i >= this.genes.length)
                temp += other.genes.substring(i, i + 1);
            else if(i >= other.genes.length)
                temp += this.genes.substring(i, i + 1);
            else if(getRndInteger(0, 2) == 0)
                temp += other.genes.substring(i, i + 1);
            else
                temp += this.genes.substring(i, i + 1);
        }

        this.genes = temp;

        if(mutate)
            this.mutate();
    }

    determine_fitness() {
        return null;
    }
}

module.exports.populant = populant;

class population {
    constructor(count, mutation_rate, raw_count, populant_type, gene_function) {
        this.count = count;
        this.mutation_rate = mutation_rate;
        this.raw_count = raw_count;
        this.populant = populant_type;
        this.gene_function = gene_function;
        this.pop = [];
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

    fitness() {
        for(let p of this.pop)
        {
            //console.log(typeof p);
            p.determine_fitness();
        }
    }

    select_parents(count) {
        this.pop.sort(function(a, b){ return b.score - a.score; });
        let result = this.pop.slice(0, count);
        for(let i = 0; i < this.raw_count; i++)
            result.push(new this.populant(this.gene_function()));
        return result;
    }

    train(iterations, crossover_size, initial_parents) {
        let selected_parents = initial_parents;

        for(let i = 0; i < iterations; i++)
        {
            this.initialize(selected_parents);
            this.fitness();
            selected_parents = this.select_parents(crossover_size);
        }

        return selected_parents;
    }
}

module.exports.population = population;