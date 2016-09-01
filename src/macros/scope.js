'use strict';

const mangleNames = require('../src/mangle-names');

module.exports = {
    'apply': (s, config) => {
        return mangleNames(s, config);
    }
};
