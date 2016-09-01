function _ (s){
        return s.split(',').map(function(r){
            return r.split('').map(function(v){
                return parseInt(v);
            });
        });
    }

window.addEventListener('load', function(){
    console.log('Loaded');

    var $ = 123;

    console.log($);

    console.log(a); // defined in config.json

    var b = _("000000001,000000001,000000001,000000000,000000001,111111111");

    console.log(b);
}, false);
