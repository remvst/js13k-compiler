'use strict';

const { execFile } = require('child_process');
const ect = require('ect-bin');

const Task = require('./task');

class Ect extends Task {
    constructor(file) {
        super();
        this.file = file;
    }

    execute(input) {
        return new Promise((resolve, reject) => {
            execFile(ect, [this.file], err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = Ect;
