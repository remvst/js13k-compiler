'use strict';

const taskMap = {
    'loadFiles': require('./load-files'),
    'parallel': require('./parallel'),
    'sequence': require('./sequence'),
    'log': require('./log'),
    'output': require('./output'),
    'macro': require('./macro'),
    'concat': require('./concat'),
    'mangle': require('./mangle'),
    'es6ify': require('./es6ify'),
    'uglifyJS': require('./uglify-js'),
    'uglifyES': require('./uglify-es'),
    'terser': require('./terser'),
    'uglifyCSS': require('./uglify-css'),
    'uglifyHTML': require('./uglify-html'),
    'zip': require('./zip'),
    'advzip': require('./adv-zip'),
    'combine': require('./combine'),
    'constants': require('./constants'),
    'inject': require('./inject'),
    'checkSize': require('./check-size'),
    'label': require('./label'),
    'watch': require('./watch'),
    'block': require('./block'),
    'ect': require('./ect'),
    'longerNames': require('./longer-names'),
    'roadroller': require('./roadroller')
};

function builderFunction(functionName){
    const cls = taskMap[functionName];
    return function(){
        return new cls(...arguments);
    };
}

for(let functionName in taskMap){
    module.exports[functionName] = builderFunction(functionName);
}
