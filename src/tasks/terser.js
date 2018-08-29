'use strict';

const terser = require('terser');

const Task = require('./task');

class Terser extends Task {
    constructor() {
        super();
    }

    execute(input) {
        const uglified = terser.minify(input, {

        });

        return Promise.resolve(uglified.code);
    }
}

module.exports = Terser;
