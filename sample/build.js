'use strict';

const compiler = require('../src/compiler');

compiler.run((tasks) => {
    function buildJS(mangle, uglify){
        const sequence = [
            tasks.label('Building JS'),
            tasks.loadFiles([__dirname + "/src/js/main.js"]),
            tasks.concat(),
            tasks.constants({
                'MY_AWESOME_CONSTANT': 3.14
            }),
            tasks.macro('matrix')
        ];

        if(mangle){
            sequence.push(tasks.mangle({
                'force': ['data']
            }));
        }

        if(uglify){
            sequence.push(tasks.uglifyJS());
        }

        return tasks.sequence(sequence);
    }

    function buildCSS(uglify){
        const sequence = [
            tasks.label('Building CSS'),
            tasks.loadFiles([__dirname + "/src/style.css"]),
            tasks.concat()
        ];

        if(uglify){
            sequence.push(tasks.uglifyCSS());
        }

        return tasks.sequence(sequence);
    }

    function buildHTML(uglify){
        const sequence = [
            tasks.label('Building HTML'),
            tasks.loadFiles([__dirname + "/src/index.html"]),
            tasks.concat()
        ];

        if(uglify){
            sequence.push(tasks.uglifyHTML());
        }

        return tasks.sequence(sequence);
    }

    function buildMain(){
        return tasks.sequence([
            tasks.label('Building main files'),
            tasks.parallel({
                'js': buildJS(true, true),
                'css': buildCSS(true),
                'html': buildHTML(true)
            }),
            tasks.combine(),
            tasks.output(__dirname + '/build/game.html'),
            tasks.zip('index.html'),
            tasks.output(__dirname + '/build/game.zip'),
            tasks.ect(__dirname + '/build/game.zip'),
            tasks.checkSize(__dirname + '/build/game.zip'),
        ]);
    }

    function buildDebug(mangle, suffix){
        return tasks.sequence([
            tasks.label('Building debug files'),
            tasks.parallel({
                // Debug JS in a separate file
                'debug_js': tasks.sequence([
                    buildJS(mangle, false),
                    tasks.output(__dirname + '/build/debug' + suffix + '.js')
                ]),

                // Injecting the debug file
                'js': tasks.inject(['debug.js']),

                'css': buildCSS(false),
                'html': buildHTML(false)
            }),
            tasks.combine(),
            tasks.output(__dirname + '/build/debug' + suffix + '.html')
        ]);
    }

    function main(){
        return tasks.sequence([
            buildMain(),
            buildDebug(false, ''),
            buildDebug(true, '_mangled')
        ]);
    }

    return main();
});
