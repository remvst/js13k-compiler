'use strict';

module.exports = {
    'START_TAG': '/*nomangle*/',
    'END_TAG': '/*/nomangle*/',
    'split': (s, start) => {
        start = start || 0;

        const res = [];
        s.split(module.exports.START_TAG).forEach(function(component, i){
            var spl = component.split(module.exports.END_TAG);
            if(i > 0){
                res.push({
                    'content': spl[0],
                    'isString': true
                });
                res.push({
                    'content': spl[1],
                    'isString': false
                });
            }else{
                res.push({
                    'content': spl[0],
                    'isString': false
                });
            }
        });

        return res;
    },
    'join': (components) => {
        return components.map((component) => {
            if(component.isString){
                return module.exports.START_TAG + component.content + module.exports.END_TAG;
            }else{
                return component.content;
            }
        }).join('');
    }
};
