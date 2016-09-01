'use strict';

const fsp = require('fs-promise');

const Task = require('./task');

const MAX_BYTES = 1024 * 13;

class CheckSize extends Task{
    constructor(path){
        super();
        this.path = path;
    }

    execute(input){
        super.execute(input);

        return fsp.stat(this.path).then(stat => {
            // Log file size
            const progress = stat.size / MAX_BYTES;

            const meterSize = 50;
            let meter = '[';
            for(var i = 0 ; i < meterSize ; i++){
                meter += (i / meterSize) < progress ? '#' : ' ';
            }
            meter += '] ' + Math.round(progress * 100) + '%';

            console.log(meter);
            console.log('ZIP file size: ' + stat.size + ' bytes (' + (MAX_BYTES - stat.size) + ' bytes remaining)');

            return input;
        });
    }
}

module.exports = CheckSize;
