'use strict';

module.exports = {
    'apply': (s) => {
        const matrix = JSON.parse(s);

        let rows = [];
        for(let row = 0 ; row < matrix.length ; row++){
            let s = '';

            for(let col = 0 ; col < matrix[row].length ; col++){
                s += matrix[row][col];
            }

            rows.push(s);
        }

        return JSON.stringify(rows.join(',')); // commas are shorter than newlines
    },
    'revert': function(s){
        return s.split(',').map(function(r){
            return r.split('').map(function(v){
                return parseInt(v);
            });
        });
    }
};
