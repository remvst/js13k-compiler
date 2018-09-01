'use strict';

const stripComments = require('strip-comments');
const escapeStringRegexp = require('escape-string-regexp');

const encodeNumber = require('../util/encode-number');
const analyze = require('../util/analyze');
const split = require('../util/split');

const Task = require('./task');

const protectedNames = require('../../data/protected-names');

const protectedMap = {};
protectedNames.dom.concat(protectedNames.keywords).forEach((name) => {
    protectedMap[name] = true;
});

function hasMatch(lines, mangled){
    const regex = new RegExp('\\b' + escapeStringRegexp(mangled) + '\\b', 'g');

    for(var i = 0 ; i < lines.length ; i++){
        const matches = lines[i].match(regex) || [];

        if(matches.length){
            return true;
        }
    }

    return false;
}

function isProtected(mangled) {
    return !!protectedMap[mangled];
}

class Mangle extends Task{
    constructor(config){
        super();
        this.config = config || {};
    }

    execute(input){
        // Replacing names that are too common
        const mangledNames = analyze(input, this.config.force || [], this.config.skip || []);

        // stripping the comments and the strings to avoid detecting inexistent conflicts
        const splitComponents = split.split(input);
        const inputWithoutStrings = splitComponents.map(component => {
            return component.isString ? '""' : component.content; // if it's a string, replace with an empty string
        }).join('');
        const lines = stripComments(inputWithoutStrings).split('\n');

        const mangleMap = {};
        let mangleIndex = 0;
        mangledNames.forEach((name) => {
            while(true){
                const mangled = encodeNumber(mangleIndex++);

                // Check if the mangled name is already in the original input
                if(!hasMatch(lines, mangled) && !isProtected(mangled)){
                    mangleMap[name] = mangled;
                    break;
                }
            }
        });

        const components = split.split(input);
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
        }

        return Promise.resolve(split.join(components));
    }
}

module.exports = Mangle;
