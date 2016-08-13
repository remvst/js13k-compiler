'use strict';

module.exports = (paths) => {
    let lines = [];

    lines.push('window.addEventListener(\'DOMContentLoaded\', function(){');

    lines.push('    ' + JSON.stringify(paths) + '.forEach(function(path){');
    lines.push('        var script = document.createElement(\'script\');');
    lines.push('        script.src = path;');
    lines.push('        document.body.appendChild(script);');
    lines.push('    });');

    lines.push('}, false);');

    return lines.join('\n');
};
