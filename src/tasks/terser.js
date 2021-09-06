'use strict';

const terser = require('terser');

const Task = require('./task');

class Terser extends Task {
    constructor() {
        super();
    }

    execute(input) {
        return terser.minify(input, {
            mangle: {
                properties: true,
            },
        }).then(uglified => uglified.code);
    }
}

module.exports = Terser;
