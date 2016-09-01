'use strict';

const Step = require('./step');

function undo(s){
    eval(s.replace(/\(([^\)]*)\)=>\{/g, 'function($1){')); // jshint ignore:line
}

class ES6ify extends Step{
    constructor(){
        super();
    }

    execute(input){
        super.execute(input);

        // Change function styles
        input = input.replace(new RegExp('function\\(([^\\)]*)\\)\\{', 'g'), '($1)=>{');
        input = input.replace(new RegExp('function ([a-z]+)\\(([^\\)]*)\\)\\{', 'gi'), '$1 = ($2)=>{');

        // Include the eval function
        input = '(' + undo.toString() + ')(' + JSON.stringify(input) + ');';

        return Promise.resolve(input);
    }
}

module.exports = ES6ify;
