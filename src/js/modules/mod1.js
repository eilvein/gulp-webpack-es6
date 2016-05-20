'use strict';

var cxDialog = require('dialog');
var mod2 = require('./mod2');
var opt = {
    title: "你好",
    background: "#000",
    info: "It works!"
}


console.log(mod2(2,3));

$('button').on('click', function(event){
    event.preventDefault();

    $.cxDialog(opt);
})
