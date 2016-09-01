'use strict';

const colors = require('colors/safe');

const Task = require('./task');

class Label extends Task{
    constructor(label){
        super();
        this.label = label;
    }

    execute(input){
        super.execute(input);

        console.log(colors.green(this.label));
        return Promise.resolve(input);
    }
}

module.exports = Label;
