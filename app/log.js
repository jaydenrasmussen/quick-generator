// Jayden Rasmussen 2017
'use strict';

const m = require('moment');
const c = require('chalk');

module.exports = {
    error,
    info,
    warn,
    success
};
function time() {
    let now = m();
    return now.format('L LTS');
}
function valid(msg) {
    return msg ? msg : '';
}
function error(msg) {
    return console.log(
        c.red('[ERROR]') + '    ' + time() + '    ' + valid(msg)
    );
}
function info(msg) {
    return console.log(
        c.blue('[INFO]') + '     ' + time() + '    ' + valid(msg)
    );
}
function warn(msg) {
    return console.log(
        c.yellow('[WARN]') + '     ' + time() + '    ' + valid(msg)
    );
}
function success(msg) {
    return console.log(
        c.green('[SUCCESS]') + '  ' + time() + '    ' + valid(msg)
    );
}
