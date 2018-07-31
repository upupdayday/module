requirejs.config({
    baseUrl: '../app',
    paths: {
        /*1*/
        // lib: '../lib'
        /*2*/
        // jq: '../lib/jquery'
        /*3*/
        jquery: '../lib/jquery'

    }
});

requirejs(['index']);