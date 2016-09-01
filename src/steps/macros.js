'use strict';

const fsp = require('fs-promise');

const Step = require('./step');

class Macros extends Step{
    constructor(macros){
        super();
        this.macros = macros;
    }

    execute(input){
        super.execute(input);

        this.macros.forEach(macroId => {
            input = this.applyMacro(macroId, input);
        });

        return Promise.resolve(input);
    }

    applyMacro(macroId, input){
        const macro = require('../macros/' + macroId);
    }
}

module.exports = Macros;


'use strict';

const colors = require('colors/safe');

module.exports = (source, config) => {
    for(let macroId in config.MACROS){
        const macro = require('../macros/' + config.MACROS[macroId]);

        const undoName = 'revert' + macroId.substr(0, 1).toUpperCase() + macroId.substr(1);
        const undoCode = macro.revert ? macro.revert.toString().replace(/function/, 'function ' + undoName) + '\n\n' : '';

        source = undoCode + source;

        let characterDiff = undoCode.length;

        const regex = new RegExp(macroId + '\\(', 'g');

        while(true){
            const match = regex.exec(source);

            if(!match){
                break;
            }

            const matchStart = match.index;

            let lvl = 1;
            let i = matchStart + (macroId + '(').length + 1;
            while(lvl > 0 && i < source.length){
                if(source.charAt(i) === '('){
                    lvl++;
                }else if(source.charAt(i) === ')'){
                    lvl--;
                }

                i++;
            }

            const matchEnd = i;

            const contentStart = matchStart + (macroId + '(').length;
            const contentEnd = matchEnd - 1;

            const content = source.substring(contentStart, contentEnd);

            const modifiedContent = macro.apply(content, config);

            characterDiff += modifiedContent.length - JSON.stringify(content).length;

            const sourceBefore = source.substring(0, matchStart);
            const sourceAfter = source.substring(matchEnd);

            if(undoCode){
                source = sourceBefore + undoName + '(' + modifiedContent + ')' + sourceAfter;
            }else{
                source = sourceBefore + modifiedContent + sourceAfter;
            }
        }

        const color = characterDiff > 0 ? colors.red : colors.green;

        if(config.VERBOSE){
            console.log('- ' + macroId + ': ' + color(characterDiff + ' chars'));
        }
    }

    return source;
};
