'use strict';

const colors = require('colors/safe');

module.exports = (source, config) => {
    // Replacing constants
    console.log(colors.green('Replacing constants...'));

    for(let constant in config.CONSTANTS){
        const value = config.CONSTANTS[constant];
        const regex = new RegExp('\\b' + constant + '\\b', 'g');

        const lengthBefore = source.length;
        source = source.replace(regex, value);
        const lengthAfter = source.length;

        const characterDiff = lengthAfter - lengthBefore;
        const color = characterDiff > 0 ? colors.red : colors.green;

        if(config.VERBOSE){
            console.log('- ' + constant + ' -> ' + value + ' : ' + color(characterDiff));
        }
    }

    return source;
};
