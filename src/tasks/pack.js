'use strict';

const packer = require('packer');

const Task = require('./task');

class Pack extends Task{
    constructor(){
        super();
    }

    execute(input){
        return Promise.resolve(packer.pack(input, true, true));
    }
}

module.exports = Pack;
