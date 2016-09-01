'use strict';

module.exports.run = function(func){
    const steps = require('./tasks'); // get the steps in the global scope

    const rootStep = func(steps);

    rootStep.execute({}).catch(err => {
        console.error(err);
    });
};
