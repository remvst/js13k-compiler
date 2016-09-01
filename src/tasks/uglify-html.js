'use strict';

const minifyHTML = require('html-minifier').minify;

const Step = require('./step');

class UglifyHTML extends Step{
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
