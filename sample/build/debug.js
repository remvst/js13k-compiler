function revertMatrix(s){
        return s.split(',').map(function(r){
            return r.split('').map(function(v){
                return parseInt(v);
            });
        });
    }

window.addEventListener('load', function(){
    console.log('Loaded');

    var variableThatWillBeShortened = 123;

    console.log(variableThatWillBeShortened);

    console.log(3.14); // defined in config.json

    var data = revertMatrix("000000001,000000001,000000001,000000000,000000001,111111111");

    console.log(data);
}, false);
