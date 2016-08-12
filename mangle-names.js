'use strict';

const colors = require('colors/safe');

const encodeNumber = require('./encode-number');
const analyze = require('./analyze');

module.exports = (source, config) => {
    // Replacing names that are too common
    console.log(colors.green('Mangling names...'));

    const mangledNames = analyze(source, config);

    const mangleMap = {};
    let mangleIndex = 0;
    mangledNames.forEach((name) => {
        let matches;
        do{
            const mangled = encodeNumber(mangleIndex);
            mangleMap[name] = mangled;

            // Check if the mangled name is already in the original source
            const regex = new RegExp('\\b' + mangled + '\\b', 'g');
            matches = source.match(regex) || [];

            mangleIndex++;
        }while(matches.length > 0);
    });

    for(let word in mangleMap){
        const mangled = mangleMap[word];

        const regex = new RegExp('\\b' + word + '\\b', 'g');

        const lengthBefore = source.length;
        source = source.replace(regex, mangled);
        const lengthAfter = source.length;

        const characterDiff = lengthAfter - lengthBefore;
        const color = characterDiff > 0 ? colors.red : colors.green;

        if(config.VERBOSE){
            console.log('- ' + word + ' -> ' + mangled + ' : ' + color(characterDiff));
        }
    }

    return source;
};
