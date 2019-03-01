var fs = require('fs');
var data = require('./usersMockNative');
var json = JSON.stringify(data)

fs.writeFile("test.txt", json, function(err) {
    if (err) {
        console.log(err);
    }
});