# screeps_ga
Genetic algorithm implementation for screeps

## Installation
To use these modules, you need to launch the game, and then select `scripts` from the in-game interface, then select `view local folder`.
Copy the contents of:
* [`bytecode.js`](./bytecode.js)
* [`ga.js`](./ga.js)
* [`main.js`](./main.js)
* [`misc_util.js`](./misc_util.js)
* [`creeps.js`](./creeps/creeps.js) <-- Rename to `creeper.js`
* [`harvester.js`](./creeps/harvester.js)

Into that local folder, you should see them appear in your modules menu.  Then you need to modify the `require()` calls in these files and remove the `./` and any parent folders from the beginning of the strings.

You will also need to name your main spawner `Spawn1`.

Once these steps are done, you should notice that the spawner will start spawning creeps and information will start pouring into the console, that means it's working.

If you have any issues don't hesitate to open an issue!

## Test files

You can also run some of the test files and demo files I've written using `nodejs` the ones that I know work are:
* [`ga_demo.js`](./ga_demo.js)
* [`bytecode_demo.js](./bytecode_demo.js)

### ga_demo.js
This test demonstrates the functionality of the genetic algorithm housed in [ga.js](./ga.js). 
It creates a population of mathematical expressions and then tries to maximize their output number.
If you don't know what a genetic algorithm is, read up on it [here](https://towardsdatascience.com/introduction-to-genetic-algorithms-including-example-code-e396e98d8bf3)

### bytecode_demo.js
This test demonstrates the bytecode language I wrote for this application housed in [bytecode.js](./bytecode.js).
It evaluates a hardcoded expression using [prefix notation](https://runestone.academy/runestone/books/published/pythonds/BasicDS/InfixPrefixandPostfixExpressions.html) (1 + 1 is the default).
You can also find a language reference in this file.
