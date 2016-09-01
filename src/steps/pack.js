'use strict';

const packer = require('packer');

const Step = require('./step');

class Pack extends Step{
    constructor(){
        super();
    }

    execute(input){
        return Promise.resolve(packer.pack(input, true, true));
    }
}

module.exports = Pack;
