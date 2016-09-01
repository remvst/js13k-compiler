'use strict';

const taskMap = {
    'loadFiles': require('./load-files'),
    'parallel': require('./parallel'),
    'sequence': require('./sequence'),
    'log': require('./log'),
    'output': require('./output'),
    'macros': require('./macros'),
    'concat': require('./concat'),
    'mangle': require('./mangle'),
    'es6ify': require('./es6ify'),
    'uglifyJS': require('./uglify-js'),
    'uglifyCSS': require('./uglify-css'),
    'uglifyHTML': require('./uglify-html'),
    'pack': require('./pack'),
    'zip': require('./zip'),
    'combine': require('./combine'),
    'constants': require('./constants')
};

function builderFunction(functionName){
    const cls = taskMap[functionName];
    return function(arg){
        return new cls(arg);
    };
}

for(let functionName in taskMap){
    module.exports[functionName] = builderFunction(functionName);
}
