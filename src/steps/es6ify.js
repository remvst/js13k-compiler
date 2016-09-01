'use strict';

function undo(s){
    eval(s.replace(/\(([^\)]*)\)=>\{/g, 'function($1){')); // jshint ignore:line
}

module.exports = (source) => {
    // Change function styles
    source = source.replace(new RegExp('function\\(([^\\)]*)\\)\\{', 'g'), '($1)=>{');
    source = source.replace(new RegExp('function ([a-z]+)\\(([^\\)]*)\\)\\{', 'gi'), '$1 = ($2)=>{');

    // Include the eval function
    source = '(' + undo.toString() + ')(' + JSON.stringify(source) + ');';

    return source;
};
