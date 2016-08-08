'use strict';

const fsp = require('fs-promise');
const zip = require('node-zip');
const minifyHTML = require('html-minifier').minify;
const Mustache = require('mustache');

const config = require('./config');
const compile = require('./compile');

const MAX_BYTES = 1024 * 13;
const INJECT_JS_TAG = 'JS_INJECTION_SITE';
const INJECT_CSS_TAG = 'CSS_INJECTION_SITE';

// Read all the files
Promise.all([
    Promise.all(config.INPUT.JS.map(file => fsp.readFile(file))),
    fsp.readFile(config.INPUT.HTML),
    fsp.readFile(config.INPUT.CSS)
]).then(results => {
    const source = results[0].join('\n');
    const html = results[1].toString();
    const css = results[2].toString();

    const sourceWithMacros = applyMacros(source);

    const compiledSource = compile(sourceWithMacros, true);
    const debugSource = compile(sourceWithMacros, false);

    console.log('Compiled source is ' + Math.round(compiledSource.length * 100 / source.length) + '% the size of the original source');

    const debugHTML = inject(html, '</script><script src="debug.js">', css);

    const finalHTML = minifyHTML(inject(html, compiledSource, css), {
        'collapseWhitespace': true,
        'minifyCSS': true,
        'minifyJS': false
    }).replace(INJECT_JS_TAG, compiledSource);

    // Zip it
    console.log('Creating zip file');

    const zipper = new zip();
    zipper.file('index.html', finalHTML);

    const zipData = zipper.generate({
        'base64': false,
        'compression': 'DEFLATE'
    });

    // Create all the files
    return Promise.all([
        fsp.writeFile(config.OUTPUT.ZIP, zipData, 'binary'),
        fsp.writeFile(config.OUTPUT.HTML, finalHTML),
        fsp.writeFile(config.OUTPUT.DEBUG_HTML, debugHTML),
        fsp.writeFile(config.OUTPUT.DEBUG_JS, debugSource)
    ]);
}).then(() => {
    return fsp.stat(config.OUTPUT.ZIP);
}).then((stat) => {
    // Log file size
    const prct = stat.size * 100 / MAX_BYTES;

    console.log('ZIP file size: ' + stat.size + ' bytes (' + Math.round(prct) + '% of max size, ' + (MAX_BYTES - stat.size) + ' bytes remaining)');

    if(stat.size > MAX_BYTES){
        console.warn('Size is greater than allowed');
    }

    console.log('Done.');
}).catch(err => {
    console.error(err);
});


function inject(html, script, style){
    const view = {};

    view[INJECT_JS_TAG] = script;
    view[INJECT_CSS_TAG] = style;

    return Mustache.render(html, view);
}


function applyMacros(source){
    for(let macroId in config.MACROS){
        console.log('Applying macro: ' + macroId);

        const macro = require('./macros/' + config.MACROS[macroId]);

        const undoName = 'revert' + macroId.substr(0, 1).toUpperCase() + macroId.substr(1);
        const undoCode = macro.revert.toString().replace(/function/, 'function ' + undoName);

        source = undoCode + '\n\n' + source;

        let characterDiff = undoCode.length;

        const regex = new RegExp(macroId + '\\(', 'g');

        while(true){
            const match = regex.exec(source);

            if(!match){
                break;
            }
            const matchStart = match.index;
            const matchEnd = source.indexOf(')', matchStart) + 1;

            const contentStart = matchStart + (macroId + '(').length;
            const contentEnd = matchEnd - 1;

            const contentString = source.substring(contentStart, contentEnd);
            const content = JSON.parse(contentString);

            const modifiedContent = macro.apply(content);

            characterDiff += modifiedContent.length - JSON.stringify(content).length;

            const sourceBefore = source.substring(0, matchStart);
            const sourceAfter = source.substring(matchEnd);

            source = sourceBefore + undoName + '(' + modifiedContent + ')' + sourceAfter;
        }

        console.log('Character difference: ' + characterDiff + ' chars');
    }

    return source;
}
