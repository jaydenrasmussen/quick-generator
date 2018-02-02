'use strict';

const c = require('chalk');
const m = require('moment');

module.exports = {
    info,
    warn,
    error,
    success
};
function valid(string) {
    return string && typeof string === 'string' ? string : '';
}
function info(string) {
    return console.log(
        `${c.blue('[INFO]')}     ${m().format('L LTS')}  ${valid(string)}`
    );
}
function warn(string) {
    return console.log(
        `${c.yellow('[WARN]')}     ${m().format('L LTS')}  ${valid(string)}`
    );
}
function error(string) {
    return console.log(
        `${c.red('[ERROR]')}    ${m().format('L LTS')}  ${valid(string)}`
    );
}
function success(string) {
    return console.log(
        `${c.green('[SUCCESS]')}  ${m().format('L LTS')}  ${valid(string)}`
    );
}
