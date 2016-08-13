'use strict';

module.exports = {
    'apply': (s) => {
        s = s.replace(new RegExp('function\\(([^\\)]*)\\)\\{', 'g'), '($1)=>{');
        s = s.replace(new RegExp('function ([a-z]+)\\(([^\\)]*)\\)\\{', 'gi'), '$1 = ($2)=>{');

        return s;
    },
    'undo': function(s){
        eval(s.replace(/\(([^\)]*)\)=>\{/g, 'function($1){'));
    }
};
