'use strict';

const colors = require('colors/safe');

const encodeNumber = require('./encode-number');
const analyze = require('./analyze');
const split = require('./split');

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

    const components = split.split(source);
    const nonStringComponents = components.filter((component) => {
        return !component.isString;
    });

    for(let word in mangleMap){
        const mangled = mangleMap[word];

        const regex = new RegExp('\\b' + word + '\\b', 'g');

        let characterDiff = 0;
        nonStringComponents.forEach((component) => {
            const lengthBefore = component.content.length;
            component.content = component.content.replace(regex, mangled);
            const lengthAfter = component.content.length;
            characterDiff += lengthAfter - lengthBefore;
        });

        const color = characterDiff > 0 ? colors.red : colors.green;

        if(config.VERBOSE){
            console.log('- ' + word + ' -> ' + mangled + ' : ' + color(characterDiff));
        }
    }

    return split.join(components);
};
