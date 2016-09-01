'use strict';

const colors = require('colors/safe');

const Task = require('./task');

function addZeros(n, l){
    n = n.toString();
    while(n.length < l){
        n = '0' + n;
    }
    return n;
}

function formatTime(t){
    var m = ~~(t / 60),
        s = ~~(t % 60),
        ms = ~~((t % 1) * 1000);

    return addZeros(m, 2) + ':' + addZeros(s, 2) + '.' + addZeros(ms, 3);
}

class Label extends Task{
    constructor(label){
        super();
        this.label = label;
    }

    execute(input){
        super.execute(input);

        const formattedTime = formatTime(this.runner.elaspedTime() / 1000);

        console.log('[' + formattedTime + '] ' + colors.green(this.label));
        return Promise.resolve(input);
    }
}

module.exports = Label;
