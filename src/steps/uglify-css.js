'use strict';

const CleanCSS = require('clean-css');

const Step = require('./step');

class UglifyCSS extends Step{
    constructor(){
        super();
    }

    execute(input){
        return Promise.resolve(new CleanCSS().minify(input).styles);
    }
}

module.exports = UglifyCSS;
