'use strict';

const colors = require('colors/safe');

const Task = require('./task');

class Block extends Task{
    constructor(label){
        super();
        this.label = label;
    }

    execute(input){
        super.execute(input);

        this.log('\n' + this.label, colors.white.underline);
        return Promise.resolve(input);
    }
}

module.exports = Block;
