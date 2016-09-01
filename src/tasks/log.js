'use strict';

const Step = require('./step');

class Log extends Step{
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
