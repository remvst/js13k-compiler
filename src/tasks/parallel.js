'use strict';

const Task = require('./task');

class Parallel extends Task{
    constructor(tasks){
        super();
        this.tasks = tasks;
    }

    execute(input){
        super.execute(input);

        const promises = [];
        const outputMap = {};

        for(let subTaskLabel in this.tasks){
            promises.push(this.runSubTask(input, this.tasks[subTaskLabel], subTaskLabel, outputMap));
        }

        return Promise.all(promises).then(() => {
            return outputMap;
        });
    }

    runSubTask(input, task, subTaskLabel, outputMap){
        return task.run(this.runner, input).then((subTaskOutput) => {
            outputMap[subTaskLabel] = subTaskOutput;
        });
    }
}

module.exports = Parallel;
