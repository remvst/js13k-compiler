'use strict';

const Task = require('./task');

class Concat extends Task{
    constructor(){
        super();
    }

    execute(input){
        super.execute(input);
        return Promise.resolve(input.join('\n'));
    }
}

module.exports = Concat;
