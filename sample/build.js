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
            steps.uglifyJS()
        ]);
    }

    function mainCSS(){
        return steps.sequence([
            steps.loadFiles([__dirname + "/src/style.css"]),
            steps.concat(),
            steps.uglifyCSS()
        ]);
    }

    function mainHTML(){
        return steps.sequence([
            steps.loadFiles([__dirname + "/src/index.html"]),
            steps.concat(),
            steps.uglifyHTML()
        ]);
    }

    function buildAll(){
        return steps.parallel({
            'js': mainJS(),
            'css': mainCSS(),
            'html': mainHTML()
        });
    }

    function main(){
        return steps.sequence([
            buildAll(),
            steps.combine(),
            steps.log()
        ]);
    }

    return main();
});
