"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clipboardy_1 = require("clipboardy");
function GeneratePassword() {
    var pw = "";
    var min = 33;
    var max = 126;
    console.log(min);
    for (var i = 0; i < 16; i++) {
        var c = Math.floor(Math.random() * (max - min)) + min;
        pw += String.fromCharCode(c);
        console.log(pw);
    }
    clipboardy_1.default.write(pw);
}
GeneratePassword();
