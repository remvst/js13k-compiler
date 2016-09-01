'use strict';

const Mustache = require('mustache');

const Task = require('./task');

const INJECT_JS_TAG = 'JS_INJECTION_SITE';
const INJECT_CSS_TAG = 'CSS_INJECTION_SITE';

class UglifyHTML extends Task{
    constructor(){
        super();
    }

    execute(input){
        const view = {};

        view[INJECT_JS_TAG] = input.js;
        view[INJECT_CSS_TAG] = input.css;

        const rendered = Mustache.render(input.html, view);

        return Promise.resolve(rendered);
    }
}

module.exports = UglifyHTML;
