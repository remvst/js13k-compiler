'use strict';

const Step = require('./step');

class Parallel extends Step{
    constructor(tasks){
        super();
        this.tasks = tasks;
    }

    execute(input){
        super.execute(input);

        const promises = [];
        const outputMap = {};

        for(let subStepLabel in this.tasks){
            promises.push(this.runSubStep(input, this.tasks[subStepLabel], subStepLabel, outputMap));
        }

        return Promise.all(promises).then(() => {
            return outputMap;
        });
    }

    runSubStep(input, task, subStepLabel, outputMap){
        return task.execute(input).then((subStepOutput) => {
            outputMap[subStepLabel] = subStepOutput;
        });
    }
}

module.exports = Parallel;
