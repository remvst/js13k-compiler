'use strict';

class Step{
    constructor(){
        // Nothing to do here
    }

    execute(){
        console.log(this.constructor.name + '...');
    }
}

module.exports = Step;
