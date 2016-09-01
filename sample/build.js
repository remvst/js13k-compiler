'use strict';

const compiler = require('../src/compiler');

compiler.run((tasks) => {
    function buildJS(mangle, uglify){
        const sequence = [
            tasks.loadFiles([__dirname + "/src/js/main.js"]),
            tasks.concat(),
            tasks.constants({
                'MY_AWESOME_CONSTANT': 3.14
            }),
            tasks.macros(['matrix'])
        ];

        if(mangle){
            sequence.push(tasks.mangle({
                'force': ['data']
            }));
        }

        if(uglify){
            sequence.push(tasks.uglifyJS);
        }

        return tasks.sequence(sequence);
    }

    function buildCSS(uglify){
        const sequence = [
            tasks.loadFiles([__dirname + "/src/style.css"]),
            tasks.concat()
        ];

        if(uglify){
            sequence.push(tasks.uglifyCSS);
        }

        return tasks.sequence(sequence);
    }

    function buildHTML(uglify){
        const sequence = [
            tasks.loadFiles([__dirname + "/src/index.html"]),
            tasks.concat()
        ];

        if(uglify){
            sequence.push(tasks.uglifyHTML());
        }

        return tasks.sequence(sequence);
    }

    function buildAll(settings){
        return tasks.parallel({
            'js': buildJS(settings.mangle, settings.uglify),
            'css': buildCSS(settings.uglify),
            'html': buildHTML(settings.uglify)
        });
    }

    function main(){
        return tasks.sequence([
            buildAll({
                'uglify': true,
                'mangle': true
            }),
            tasks.combine(),
            tasks.zip('index.html'),
            tasks.output(__dirname + '/game.zip')
        ]);
    }

    return main();
});
