'use strict';

const Task = require('./task');

class Macro extends Task{
    constructor(macro, settings){
        super();
        this.macro = macro;
        this.settings = settings;
    }

    execute(input){
        super.execute(input);

        const macro = this.settings || require('../macros/' + this.macro);

        const undoName = 'revert' + this.macro.substr(0, 1).toUpperCase() + this.macro.substr(1);
        const undoCode = macro.revert ? macro.revert.toString().replace(/function/, 'function ' + undoName) + '\n\n' : '';

        input = undoCode + input;

        let characterDiff = undoCode.length;

        while(true){
            const regex = new RegExp(this.macro + '\\(', 'g');
            const match = regex.exec(input);

            if(!match){
                break;
            }

            const matchStart = match.index;

            let lvl = 1;
            let i = matchStart + (this.macro + '(').length + 1;
            while(lvl > 0 && i < input.length){
                if(input.charAt(i) === '('){
                    lvl++;
                }else if(input.charAt(i) === ')'){
                    lvl--;
                }

                i++;
            }

            const matchEnd = i;

            const contentStart = matchStart + (this.macro + '(').length;
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

        return Promise.resolve(input);
    }
}

module.exports = Macro;
