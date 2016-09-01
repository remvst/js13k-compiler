'use strict';

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

        const undoName = 'revert' + macroId.substr(0, 1).toUpperCase() + macroId.substr(1);
        const undoCode = macro.revert ? macro.revert.toString().replace(/function/, 'function ' + undoName) + '\n\n' : '';

        input = undoCode + input;

        let characterDiff = undoCode.length;

        const regex = new RegExp(macroId + '\\(', 'g');

        while(true){
            const match = regex.exec(input);

            if(!match){
                break;
            }

            const matchStart = match.index;

            let lvl = 1;
            let i = matchStart + (macroId + '(').length + 1;
            while(lvl > 0 && i < input.length){
                if(input.charAt(i) === '('){
                    lvl++;
                }else if(input.charAt(i) === ')'){
                    lvl--;
                }

                i++;
            }

            const matchEnd = i;

            const contentStart = matchStart + (macroId + '(').length;
            const contentEnd = matchEnd - 1;

            const content = input.substring(contentStart, contentEnd);

            const modifiedContent = macro.apply(content);

            characterDiff += modifiedContent.length - JSON.stringify(content).length;

            const sourceBefore = input.substring(0, matchStart);
            const sourceAfter = input.substring(matchEnd);

            if(undoCode){
                input = sourceBefore + undoName + '(' + modifiedContent + ')' + sourceAfter;
            }else{
                input = sourceBefore + modifiedContent + sourceAfter;
            }
        }

        return input;
    }
}

module.exports = Macros;
