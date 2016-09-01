'use strict';

const minifyHTML = require('html-minifier').minify;

const Task = require('./task');

class UglifyHTML extends Task{
    constructor(){
        super();
    }

    execute(input){
        const uglified = minifyHTML(input, {
            'collapseWhitespace': true,
            'minifyCSS': false,
            'minifyJS': false
        });

        return Promise.resolve(uglified);
    }
}

module.exports = UglifyHTML;
