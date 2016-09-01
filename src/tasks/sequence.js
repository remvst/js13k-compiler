'use strict';

const Task = require('./task');

class Sequence extends Task{
    constructor(tasks){
        super();
        this.tasks = tasks;
    }

    execute(input){
        super.execute(input);

        let currentPromise = Promise.resolve(input);

        this.tasks.forEach((task) => {
            currentPromise = currentPromise.then((output) => {
                return task.execute(output);
            });
        });

        return currentPromise;
    }
}

module.exports = Sequence;
