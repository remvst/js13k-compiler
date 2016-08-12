'use strict';

const fs = require('fs');
const fsp = require('fs-promise');

const build = require('./build');

fsp.readFile(process.argv.length === 3 ? process.argv[2] : './config.json').catch(err => {
    console.error(err);
    process.exit(1);
}).then(data => {
    const config = JSON.parse(data.toString());

    return build(config).then(() => {
        const filesToWatch = [
            config.INPUT.HTML,
            config.INPUT.CSS
        ].concat(config.INPUT.JS);

        function fileModifiedHandler(file){
            return () => {
                console.log(file + ' modified');

                build(config).catch(err => {
                    console.error(err);
                });
            };
        }

        console.log('Watching files...');

        return Promise.all(filesToWatch.map(file => {
            return fsp.watchFile(file, fileModifiedHandler(file));
        }));
    });
}).catch(err => {
    console.error(err);
});
