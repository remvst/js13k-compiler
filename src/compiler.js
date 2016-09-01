'use strict';

module.exports.run = function(func){
    const tasks = require('./tasks'); // get the tasks in the global scope

    const rootTask = func(tasks);

    rootTask.execute({}).catch(err => {
        console.error(err);
    });
};
