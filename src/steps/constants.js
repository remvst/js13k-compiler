'use strict';

const Step = require('./step');

class Constants extends Step{
    constructor(constants){
        super();
        this.constants = constants;
    }

    execute(input){
        super.execute(input);

        for(let constant in this.constants){
            const value = this.constants[constant];
            const regex = new RegExp('\\b' + constant + '\\b', 'g');

            input = input.replace(regex, value);
        }

        return Promise.resolve(input);
    }
}

module.exports = Constants;
