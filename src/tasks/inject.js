'use strict';

const Task = require('./task');

class Inject extends Task{
    constructor(paths){
        super();
        this.paths = paths;
    }

    execute(input){
        super.execute(input);

        const lines = [];

        lines.push(JSON.stringify(this.paths) + '.forEach(function(path){');
        lines.push('    var script = document.createElement(\'script\');');
        lines.push('    script.src = path;');
        lines.push('    document.body.appendChild(script);');
        lines.push('});');

        return Promise.resolve(lines.join('\n'));
    }
}

module.exports = Inject;
