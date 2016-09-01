'use strict';

const Step = require('./step');

class Concat extends Step{
    constructor(){
        super();
    }

    execute(input){
        return Promise.resolve(input.join('\n'));
    }
}

module.exports = Concat;
