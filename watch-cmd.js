'use strict';

const fsp = require('fs-promise');
const colors = require('colors/safe');
const express = require('express');
const http = require('http');
const reload = require('reload');

const build = require('./build');

fsp.readFile(process.argv.length === 3 ? process.argv[2] : './config.json').catch(err => {
    console.error(err);
    process.exit(1);
}).then(data => {
    const config = JSON.parse(data.toString());

    const app = express();
    app.set('port', 1234);

    const server = http.createServer(app);

    const reloader = reload(server, app);


    server.listen(app.get('port'), () => {
        console.log(colors.underline('Reload server is running on port ' + app.get('port') + '\n'));

        build(config).then(() => {
            const filesToWatch = [
                config.INPUT.HTML,
                config.INPUT.CSS
            ].concat(config.INPUT.JS);

            function fileModifiedHandler(file){
                return () => {
                    console.log(file + ' modified\n');

                    build(config).catch(err => {
                        console.error(err);
                    }).then(() => {
                        reloader.reload();

                        console.log(colors.underline('\nWaiting for file changes...'));
                    });
                };
            }

            console.log(colors.underline('\nWaiting for file changes...'));

            return Promise.all(filesToWatch.map(file => {
                return fsp.watchFile(file, fileModifiedHandler(file));
            }));
        });
    });
}).catch(err => {
    console.error(err);
});
