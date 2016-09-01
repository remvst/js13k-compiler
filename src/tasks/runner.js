'use strict';

class Runner {
    constructor(task){
        this.task = task;

        this.start = null;
        this.end = null;
    }

    run(){
        this.start = Date.now();
        return this.task.run(this, {}).then(() => {
            this.ended();
        });
    }

    ended(){
        this.end = Date.now();

        console.log('Runner ended without errors in ' + (this.end - this.start) + 'ms');
    }

    elaspedTime(){
        return Date.now() - this.start;
    }
}

module.exports = Runner;
