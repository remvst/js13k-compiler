'use strict';

module.exports = {
    'apply': (s) => {
        const str = s.substr(1, s.length - 2);

        return str.split('').map(char => {
            return JSON.stringify(char);
        }).join('+');
    }
};