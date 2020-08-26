function g(s){
        return s.split(',').map(function(r){
            return r.split('').map(function(v){
                return parseInt(v);
            });
        });
    }

window.addEventListener('load', function(){
    console.log('Loaded');

    var _ = 123;

    console.log(_);

    console.log(3.14); // defined in config.json

    var $ = g("000000001,000000001,000000001,000000000,000000001,111111111");

    console.log($);
}, false);
