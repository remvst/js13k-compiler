'use strict';

module.exports = (input, config) => {
    const stepName = config.id;

    const stepFunction = require('./steps/' + stepName);

    return Promise.resolve(stepFunction(input, config));
};
