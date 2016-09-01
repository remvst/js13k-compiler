'use strict';

const zip = require('node-zip');

const Task = require('./task');

class Zip extends Task{
    constructor(filename){
        super();
        this.filename = filename;
    }

    execute(input){
        const zipper = new zip();
        zipper.file(this.filename, input);

        const zipData = zipper.generate({
            'base64': false,
            'compression': 'DEFLATE'
        });

        return Promise.resolve(zipData);
    }
}

module.exports = Zip;
