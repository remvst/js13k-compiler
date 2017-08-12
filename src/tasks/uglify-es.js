'use strict';

const uglifyES = require('uglify-es');

const Task = require('./task');

class UglifyES extends Task {
    constructor() {
        super();
    }

    execute(input) {
        const uglifiedES = uglifyES.minify(input, {

        });

        return Promise.resolve(uglifiedES.code);
    }
}

module.exports = UglifyES;
