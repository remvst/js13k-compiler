'use strict';

module.exports = {
    'START_TAG': '/*nomangle*/',
    'END_TAG': '/*/nomangle*/',
    'split': (s, start) => {
        start = start || 0;

        const minIndex = s.indexOf(module.exports.START_TAG, start);

        if(minIndex === -1){
            return [{
                'content': s.substring(start),
                'isString': false
            }];
        }

        const indexAfter = s.indexOf(module.exports.END_TAG, minIndex + 1);

        if(indexAfter === -1){
            throw new Error('Unmatched "' + module.exports.END_TAG + '"');
        }

        const contentBeforeString = s.substring(start, minIndex);
        const stringComponent = s.substring(minIndex, indexAfter + module.exports.END_TAG.length);

        const res = [{
            'content': contentBeforeString,
            'isString': false
        }, {
            'content': stringComponent,
            'isString': true
        }];

        const resAfter = module.exports.split(s, indexAfter + module.exports.END_TAG.length);

        return res.concat(resAfter);
    },
    'join': (components) => {
        return components.map((component) => {
            return component.content;
        }).join('');
    }
};
