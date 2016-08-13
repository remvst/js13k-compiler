'use strict';

const fsp = require('fs-promise');
const zip = require('node-zip');
const minifyHTML = require('html-minifier').minify;
const Mustache = require('mustache');
const colors = require('colors/safe');
const path = require('path');

const compress = require('./compress');
const es6ify = require('./es6ify');
const applyConstants = require('./apply-constants');
const applyMacros = require('./apply-macros');
const scriptInjector = require('./script-injector');

const MAX_BYTES = 1024 * 13;
const INJECT_JS_TAG = 'JS_INJECTION_SITE';
const INJECT_CSS_TAG = 'CSS_INJECTION_SITE';

module.exports = config => {
    const buildStart = Date.now();

    console.log(colors.underline('Building'));

    // Read all the files
    return Promise.all([
        Promise.all(config.INPUT.JS.map(file => fsp.readFile(file))),
        fsp.readFile(config.INPUT.HTML),
        fsp.readFile(config.INPUT.CSS)
    ]).then(results => {
        const source = results[0].join('\n');
        const html = results[1].toString();
        const css = results[2].toString();

        const sourceWithConstants = applyConstants(source, config);
        const sourceWithMacros = applyMacros(sourceWithConstants, config);
        const compiledSource = compress(sourceWithMacros, config);

        const es6source = '(' + es6ify.undo.toString() + ')(' + JSON.stringify(es6ify.apply(compiledSource)) + ');';

        if(config.VERBOSE){
            console.log('ES6 / regular = ' + (es6source.length / compiledSource.length));

            console.log('Compiled source is ' + Math.round(compiledSource.length * 100 / source.length) + '% the size of the original source');
        }

        const debugHTMLDir = path.dirname(config.OUTPUT.DEBUG_HTML);
        const debugJSPathFromHTML = path.relative(debugHTMLDir, config.OUTPUT.DEBUG_JS);

        const debugScript = scriptInjector([
            '/reload/reload.js',
            debugJSPathFromHTML
        ]);

        const debugHTML = inject(html, debugScript, css);

        const finalHTML = minifyHTML(inject(html, config.ES6 ? es6source : compiledSource, css), {
            'collapseWhitespace': true,
            'minifyCSS': true,
            'minifyJS': false
        });

        // Zip it
        console.log(colors.green('Creating zip file...'));

        const zipper = new zip();
        zipper.file('index.html', finalHTML);

        const zipData = zipper.generate({
            'base64': false,
            'compression': 'DEFLATE'
        });

        // Create all the files
        console.log(colors.green('Final output...'));
        return Promise.all([
            fsp.writeFile(config.OUTPUT.ZIP, zipData, 'binary'),
            fsp.writeFile(config.OUTPUT.HTML, finalHTML),
            fsp.writeFile(config.OUTPUT.DEBUG_HTML, debugHTML),
            fsp.writeFile(config.OUTPUT.DEBUG_JS, sourceWithMacros)
        ]);
    }).then(() => {
        return fsp.stat(config.OUTPUT.ZIP);
    }).then((stat) => {
        // Log file size
        const progress = stat.size / MAX_BYTES;

        const meterSize = 50;
        let meter = '[';
        for(var i = 0 ; i < meterSize ; i++){
            meter += (i / meterSize) < progress ? '#' : ' ';
        }
        meter += '] ' + Math.round(progress * 100) + '%';

        console.log(meter);
        console.log('ZIP file size: ' + stat.size + ' bytes (' + (MAX_BYTES - stat.size) + ' bytes remaining)');

        if(stat.size > MAX_BYTES){
            console.warn('Size is greater than allowed');
        }

        const buildEnd = Date.now();
        console.log('Done building in ' + (buildEnd - buildStart) + 'ms');
    });
};

function inject(html, script, style){
    const view = {};

    view[INJECT_JS_TAG] = script;
    view[INJECT_CSS_TAG] = style;

    return Mustache.render(html, view);
}
