'use strict';

const protectedNames = require('../data/protected-names');

module.exports = (source, config) => {
    const wordList = cleanString(source)
        .split(' ')
        .filter(w => {
            return w.length >= 2 && /^[a-z]/i.test(w);
        })
        .filter(w => {
            return protectedNames.keywords.indexOf(w) === -1;
        })
        .filter(w => {
            return protectedNames.dom.indexOf(w) === -1;
        })
        .filter(w => {
            return config.SKIP_MANGLING.indexOf(w) === -1;
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
