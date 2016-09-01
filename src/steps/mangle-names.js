'use strict';

const colors = require('colors/safe');
const stripComments = require('strip-comments');

const encodeNumber = require('./encode-number');
const analyze = require('./analyze');
const split = require('./split');

function hasMatch(lines, mangled){
    const regex = new RegExp('\\b' + mangled + '\\b', 'g');

    for(var i = 0 ; i < lines.length ; i++){
        const matches = lines[i].match(regex) || [];

        if(matches.length){
            return true;
        }
    }

    return false;
}

module.exports = (source, config) => {
    // Replacing names that are too common
    const mangledNames = analyze(source, config);
    const lines = stripComments(source).split('\n'); // stripping the comments to avoid detecting inexistent conflicts

    const mangleMap = {};
    let mangleIndex = 0;
    mangledNames.forEach((name) => {
        while(true){
            const mangled = encodeNumber(mangleIndex++);

            // Check if the mangled name is already in the original source
            if(!hasMatch(lines, mangled)){
                mangleMap[name] = mangled;
                break;
            }
        }
    });

    const components = split.split(source);
    const nonStringComponents = components.filter((component) => {
        return !component.isString;
    });

    for(let word in mangleMap){
        const mangled = mangleMap[word];

        const regex = new RegExp('\\b' + word + '\\b', 'g');

        let characterDiff = 0;
        for(let i = 0 ; i < nonStringComponents.length ; i++){
            const component = nonStringComponents[i];
            const lengthBefore = component.content.length;
            component.content = component.content.replace(regex, mangled);
            const lengthAfter = component.content.length;
            characterDiff += lengthAfter - lengthBefore;
        }

        const color = characterDiff > 0 ? colors.red : colors.green;

        if(config.VERBOSE){
            console.log('- ' + word + ' -> ' + mangled + ' : ' + color(characterDiff));
        }
    }

    return split.join(components);
};
