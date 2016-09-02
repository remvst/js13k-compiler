'use strict';

const colors = require('colors/safe');

const Task = require('./task');

class Label extends Task{
    constructor(label){
        super();
        this.label = label;
    }

    execute(input){
        this.log(this.label, colors.white.underline);
        return Promise.resolve(input);
    }
}

module.exports = Label;
