'use strict';

const fsp = require('fs-promise');

const Step = require('./step');

class Output extends Step{
    constructor(destination){
        super();
        this.destination = destination;
    }

    execute(input){
        super.execute(input);

        return fsp.writeFile(this.destination, input, 'binary').then(() => {
            return input;
        });
    }
}

module.exports = Output;
