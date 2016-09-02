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

        console.log('');
        this.log(this.label, colors.white.underline);
        return Promise.resolve(input);
    }
}

module.exports = Block;
