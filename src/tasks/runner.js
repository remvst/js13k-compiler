'use strict';

const colors = require('colors/safe');

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

class Runner {
    constructor(task){
        this.task = task;

        this.start = null;
        this.end = null;
    }

    run(){
        this.start = Date.now();
        return this.task.run(this, {}).then(() => {
            this.ended();
        });
    }

    ended(){
        this.end = Date.now();
        this.log('Done');
    }

    elaspedTime(){
        return (this.end || Date.now()) - this.start;
    }

    log(s, modifier){
        modifier = modifier || colors.green;

        const formattedTime = formatTime(this.elaspedTime() / 1000);

        console.log('[' + formattedTime + '] ' + modifier(s));
    }
}

module.exports = Runner;
