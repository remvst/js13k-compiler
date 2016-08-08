'use strict';

const ROW_SPLITTER = ',';

module.exports = {
    'apply': (matrix) => {
        let rows = [];
        for(let row = 0 ; row < matrix.length ; row++){
            let s = '';

            for(let col = 0 ; col < matrix[row].length ; col++){
                s += matrix[row][col];
            }

            rows.push(s);
        }

        return JSON.stringify(rows.join(ROW_SPLITTER)); // commas are shorter than newlines
    },
    'revert': function(s){
        return JSON.parse(s).split(ROW_SPLITTER).map(function(r){
            return r.split('');
        });
    }
};
