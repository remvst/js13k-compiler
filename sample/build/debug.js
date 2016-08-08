function revertMatrix (s){
        return JSON.parse(s).split(ROW_SPLITTER).map(function(r){
            return r.split('');
        });
    }

window.addEventListener('load', function(){
    console.log('Loaded');

    var variableThatWillBeShortened = 123;

    console.log(variableThatWillBeShortened);

    console.log(3.14); // defined in config.json

    var data = revertMatrix("000000001,000000001,000000001,000000000,000000001,111111111");
}, false);
