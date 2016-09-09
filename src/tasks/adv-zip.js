'use strict';

const spawn = require('child_process').spawn;

const Task = require('./task');

class AdvZip extends Task{
    constructor(filename){
        super();
        this.filename = filename;
    }

    execute(input){
        return new Promise((resolve, reject) => {
            const subprocess = spawn('advzip', ['-z', this.filename]);

            subprocess.stderr.on('data', function (data) {
                console.error('stderr: ' + data);
            });

            subprocess.on('exit', function (code) {
                if(code === 0){
                    resolve(input);
                }else{
                    reject('advzip failed with error code ' + code);
                }
            });
        });
    }
}

module.exports = AdvZip;
