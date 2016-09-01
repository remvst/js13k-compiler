'use strict';

const Task = require('./task');

class Log extends Task{
    constructor(){
        super();
    }

    execute(input){
        super.execute(input);

        console.log(input);
        return Promise.resolve(input);
    }
}

module.exports = Log;
