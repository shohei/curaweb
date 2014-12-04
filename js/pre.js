Module['preRun'] = function(){
    FS.createDataFile(
        '/',
        'input',
        Module['input'],
        true,
        true
    );
    FS.createDataFile(
        '/',
        'output',
        [],
        true,
        true
    );
    Module['ret'] = function(){
        return FS.findObject("/output").contents; 
    };
};
