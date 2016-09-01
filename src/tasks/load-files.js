'use strict';

const fsp = require('fs-promise');

const Task = require('./task');

class FileLoader extends Task{
    constructor(files){
        super();
        this.files = files;
    }

    execute(input){
        super.execute(input);

        return Promise.all(this.files.map((file) => {
            return fsp.readFile(file).then(data => {
                return data.toString();
            });
        }));
    }
}

module.exports = FileLoader;
