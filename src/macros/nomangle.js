'use strict';

const split = require('../util/split');

module.exports = {
    'apply': (s) => {
        return split.START_TAG + s + split.END_TAG;
    }
};
