'use strict';

const analyze = require('../util/analyze');
const split = require('../util/split');

const Task = require('./task');

class LongerNames extends Task{
    constructor(config){
        super();
        this.config = config || {};
    }

    execute(input){
        // Replacing names that are too common
        const names = analyze(input, this.config.force || [], this.config.skip || [], 1);

        const replaceMap = {};
        names.forEach((name) => {
            replaceMap[name] = (this.config.prefix || '____') + name;
        });

        const components = split.split(input);
        const nonStringComponents = components.filter(component => {
            return !component.isString;
        });

        for(let word in replaceMap){
            const mangled = replaceMap[word];

            const regex = new RegExp('\\b' + word + '\\b', 'g');

            for(let i = 0 ; i < nonStringComponents.length ; i++){
                const component = nonStringComponents[i];
                component.content = component.content.replace(regex, mangled);
            }
        }

        return Promise.resolve(split.join(components));
    }
}

module.exports = LongerNames;
