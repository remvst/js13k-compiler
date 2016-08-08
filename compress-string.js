'use strict';

module.exports = (str) => {
    let compressed = '';

    let i = 0;
    while(i < str.length){
        let sameCharCount = 0;
        let j = i;
        while(j < str.length && str.charAt(j) === str.charAt(i)){
            sameCharCount++;
        }

        compressed += sameCharCount + str.charAt(i);
    }

    return compressed;
};
