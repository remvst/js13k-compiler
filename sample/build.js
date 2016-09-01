'use strict';

const compiler = require('../src/compiler');

function main(steps){
    return steps.sequence([
        steps.loadFiles([__dirname + "/src/js/main.js"]),
        steps.concat(),
        steps.macros(['matrix']),
        steps.mangle({
            'force': ['data']
        }),
        steps.es6ify(),
        steps.uglify(),
        steps.pack(),
        steps.log(),
        steps.zip(),
        steps.output(__dirname + "/testbuild.zip")
    ]);
}

compiler.run(main);
