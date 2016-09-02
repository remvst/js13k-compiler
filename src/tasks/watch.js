'use strict';

const fsp = require('fs-promise');
const colors = require('colors/safe');

const Task = require('./task');
const Runner = require('./runner');

class Watch extends Task{
    constructor(files, taskBuilder){
        super();
        this.files = files;
        this.taskBuilder = taskBuilder;
    }

    execute(){
        return new Promise((resolve, reject) => {
            const promises = this.files.map(file => {
                return fsp.watch(file, (eventType, filename) => {
                    if(eventType === 'rename'){
                        reject(new Error('Unsupported file change operation'));
                        return;
                    }

                    this.log('Modified ' + filename);
                    this.runTask();
                });
            });

            Promise.all(promises).then(() => {
                this.runTask();
            });
        });
    }

    runTask(){
        const task = this.taskBuilder();
        const runner = new Runner(task);
        runner.run().catch((err) => {
            this.log('Error while building: ' + err, colors.red);
        }).then(() => {
            this.log('Waiting for file changes...');
        });
    }
}

module.exports = Watch;
