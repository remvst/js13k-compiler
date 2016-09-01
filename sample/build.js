'use strict';

const compiler = require('../src/compiler');

function main(steps){
    return steps.sequence([
        steps.loadFiles([__dirname + "/src/js/main.js"]),
        steps.output(__dirname + "/testbuild.js")
    ]);
}

compiler.run(main);
