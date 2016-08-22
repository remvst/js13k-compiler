'use strict';

const uglifyJS = require('uglify-js');
const packer = require('packer');
const colors = require('colors/safe');

module.exports = (source, config) => {
    console.log(colors.green('Uglifying...'));

    const uglified = uglifyJS.minify(source, {
        fromString: true,
        mangle: false,
        mangleProperties: false,
        compress: {
            dead_code: true,
            global_defs: {
                DEBUG: false
            }
        }
    });

    if(!config.OUTPUT.PACK){
        return uglified.code;
    }

    console.log(colors.green('Packing...'));

    const packed = packer.pack(uglified.code, true, true);

    return packed;
};
