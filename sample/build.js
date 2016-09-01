'use strict';

const compiler = require('../src/compiler');

compiler.run((steps) => {
    function mainJS(){
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
            steps.log()
        ]);
    }

    function mainCSS(){
        
    }

    return mainJS();
});
