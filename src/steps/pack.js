'use strict';

const packer = require('packer');

module.exports = (source) => {
    return packer.pack(source, true, true);
};
