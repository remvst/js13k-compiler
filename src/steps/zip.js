'use strict';

const zip = require('node-zip');

const Step = require('./step');

class Zip extends Step{
    constructor(){
        super();
    }

    execute(input){
        const zipper = new zip();
        zipper.file('index.html', input);

        const zipData = zipper.generate({
            'base64': false,
            'compression': 'DEFLATE'
        });

        return Promise.resolve(zipData);
    }
}

module.exports = Zip;
