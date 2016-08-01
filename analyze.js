'use strict';

const config = require('./config');

module.exports = (source) => {
    const wordList = cleanString(source)
        .split(' ')
        .filter(w => {
            return w.length >= 2 && /^[a-z]/i.test(w);
        })
        .filter(w => {
            return config.JS_KEYWORDS.indexOf(w) === -1;
        })
        .filter(w => {
            return config.JS_API.indexOf(w) === -1;
        })
        .filter(w => {
            return config.SKIP.indexOf(w) === -1;
        });

    const counts = countList(wordList).sort((a, b) => {
        return a.count * a.word.length - b.count * b.word.length;
    }).map(item => {
        return {
            'word': item.word,
            'characters': item.count * item.word.length
        };
    });

    return counts.map(item => {
        return item.word;
    }).reverse();
};

function cleanString(s){
    // Eliminate comments
    s = s.replace(/\/\/.*\n/g, '\n');

    // Eliminate strings
    s = s.replace(/'.*'/g, ' ');
    s = s.replace(/".*"/g, ' ');

    // Eliminate RGB values
    s = s.replace(/#[0-9a-f]{6}/gi, ' ');
    s = s.replace(/#[0-9a-f]{3}/gi, ' ');

    // Eliminate all the non-word stuff
    s = s.replace(/[^a-z0-9]+/gi, ' ');

    return s;
}

function countList(wordList){
    const map = {};
    const list = [];
    wordList.forEach(w => {
        if(!map[w]){
            map[w] = {
                'word': w,
                'count': 0
            };
            list.push(map[w]);
        }
        map[w].count++;
    });
    return list;
}
