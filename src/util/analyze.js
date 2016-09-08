'use strict';

const stripComments = require('strip-comments');

const protectedNames = require('../../data/protected-names');
const splitter = require('./split');

module.exports = (source, force, skip, minLength) => {
    minLength = minLength || 2;

    const protectedMap = {};
    protectedNames.dom.concat(protectedNames.keywords).forEach((name) => {
        protectedMap[name] = true;
    });

    const wordList = cleanString(source)
        .split(' ')
        .filter(w => {
            return w.length >= minLength && /^[$_a-z]/i.test(w);
        })
        .filter(w => {
            return !protectedMap[w] || force.indexOf(w) >= 0;
        })
        .filter(w => {
            return skip.indexOf(w) === -1;
        });

    const counts = countList(wordList).sort((a, b) => {
        return a.count - b.count;
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
    s = splitter.join(splitter.split(s));

    // Eliminate comments
    s = stripComments(s);

    // Eliminate strings
    s = s.replace(/'.*'/g, ' ');
    s = s.replace(/".*"/g, ' ');

    // Eliminate RGB values
    s = s.replace(/#[0-9a-f]{6}/gi, ' ');
    s = s.replace(/#[0-9a-f]{3}/gi, ' ');

    // Eliminate all the non-word stuff
    s = s.replace(/[^a-z0-9_$]+/gi, ' ');

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
