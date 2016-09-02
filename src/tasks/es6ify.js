'use strict';

const stripComments = require('strip-comments');

const Task = require('./task');

function undo(s){
    eval(s.replace(/\(([^\)]*)\)=>\{/g, 'function($1){')); // jshint ignore:line
}

class ES6ify extends Task{
    constructor(){
        super();
    }

    execute(input){
        input = stripComments(input);

        // Change function styles
        input = input.replace(new RegExp('function\\(([^\\)]*)\\)\\{', 'g'), '($1)=>{');
        input = input.replace(new RegExp('function ([a-z]+)\\(([^\\)]*)\\)\\{', 'gi'), '$1 = ($2)=>{');

        // Include the eval function
        input = '(' + undo.toString() + ')(' + JSON.stringify(input) + ');';

        return Promise.resolve(input);
    }
}

module.exports = ES6ify;
