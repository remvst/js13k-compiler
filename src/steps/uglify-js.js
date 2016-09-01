'use strict';

const uglifyJS = require('uglify-js');

module.exports = (source) => {
    const uglified = uglifyJS.minify(source, {
        fromString: true,
        mangle: false,
        mangleProperties: false,
        compress: {
            dead_code: true,
            unsafe: true
        }
    });

    return uglified.code;
};
