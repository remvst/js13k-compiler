'use strict';

module.exports = (num) => {
    let alphabet = '$_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let newBase = alphabet.length;
    let digits = Math.floor(Math.log(num) / Math.log(newBase)) + 1;

    if(num === 0 || num === 1){
        digits = 1;
    }

    let res = '';
    for(var i = digits - 1 ; i >= 0 ; i--){

        let multiple = Math.pow(newBase, i);
        let occ = Math.floor(num / multiple);

        res += alphabet.charAt(occ);

        num -= occ * multiple;
    }

    return res;
};
