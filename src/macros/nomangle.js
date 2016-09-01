'use strict';

const split = require('../split');

module.exports = {
    'apply': (s) => {
        return split.START_TAG + s + split.END_TAG;
    }
};
