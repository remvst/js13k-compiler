window.addEventListener('load', function(){
    console.log('Loaded');

    var variableThatWillBeShortened = 123;

    console.log(variableThatWillBeShortened);

    console.log(MY_AWESOME_CONSTANT); // defined in config.json

    var data = matrix([
        [0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]);

    console.log(data);
}, false);
