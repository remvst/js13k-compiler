'use strict';

class Task{
    constructor(){
        // Nothing to do here
    }

    execute(){
        if(this.executionStart === null){
            throw new Error('Must execute through run()');
        }
    }

    run(runner, input){
        if(this.runner){
            throw new Error('Cannot run the same task twice');
        }

        this.runner = runner;
        this.executionStart = Date.now();
        return this.execute(input);
    }

    log(s, modifier){
        return this.runner.log(s, modifier);
    }
}

module.exports = Task;
