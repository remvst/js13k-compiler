'use strict';

const CleanCSS = require('clean-css');

const Task = require('./task');

class UglifyCSS extends Task{
    constructor(){
        super();
    }

    execute(input){
        return Promise.resolve(new CleanCSS().minify(input).styles);
    }
}

module.exports = UglifyCSS;
