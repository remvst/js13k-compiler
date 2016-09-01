'use strict';

const colors = require('colors/safe');
const stripComments = require('strip-comments');

const encodeNumber = require('../encode-number');
const analyze = require('../analyze');
const split = require('../split');

const Step = require('./step');

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

class Mangle extends Step{
    constructor(config){
        super();
        this.config = config || {};
    }

    execute(input){
        super.execute(input);

        // Replacing names that are too common
        const mangledNames = analyze(input, this.config.force || [], this.config.skip || []);
        const lines = stripComments(input).split('\n'); // stripping the comments to avoid detecting inexistent conflicts

        const mangleMap = {};
        let mangleIndex = 0;
        mangledNames.forEach((name) => {
            while(true){
                const mangled = encodeNumber(mangleIndex++);

                // Check if the mangled name is already in the original input
                if(!hasMatch(lines, mangled)){
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

        return split.join(components);
    }
}

module.exports = Mangle;
