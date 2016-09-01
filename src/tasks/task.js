'use strict';

class Task{
    constructor(){
        // Nothing to do here
    }

    execute(){
        console.log(this.constructor.name + '...');
    }
}

module.exports = Task;
