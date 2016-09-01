'use strict';

const uglifyJS = require('uglify-js');

const Task = require('./task');

class UglifyJS extends Task{
    constructor(){
        super();
    }

    execute(input){
        const uglified = uglifyJS.minify(input, {
            fromString: true,
            mangle: false,
            mangleProperties: false,
            compress: {
                dead_code: true,
                unsafe: true
            }
        });

        return Promise.resolve(uglified.code);
    }
}

module.exports = UglifyJS;
