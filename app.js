// J. Rasmussen 2017
// Main generator for node apps
var Promise = require('bluebird');
const prompt = require('prompt');
const fs = require('fs-extra');
let schema = {
    properties: {
        name: {
            description: 'What should we call it?',
            required: true,
            type: 'string'
        },
        author: {
            description: 'Who is the author?',
            required: true,
            type: 'string'
        },
        version: {
            default: '0.0.1',
            description: 'What version is this?',
            type: 'string',
            required: false
        },
        path: {
            default: './',
            description: 'Where should it be installed? (begins at: ' + process.cwd() + ')',
            type: 'string',
            required: true
        },
        license: {
            default: 'MIT',
            description: 'Use another license? (default MIT)',
            type: 'string',
            required: false
        },
        description: {
            default: '',
            required: false,
            description: 'What are you building?',
            type: 'string'
        },
        electron: {
            default: 'no',
            pattern: /^(yes|no|y|n)$/gi,
            description: 'Should I include electron?',
            required: true
        }
    }
}
let config = {
    "main": "app.js",
    "scripts": {
        "start": "node app.js",
        "test": "mocha -R list"
    },
    "dependencies": {
        "async": "^2.5.0",
        "bluebird": "^3.5.0",
        "fs-extra": "^4.0.1"
    },
    "devDependencies": {
        "chai": "^4.1.0",
        "mocha": "^3.5.0"
    }
};
module.exports = Promise.resolve()
    .then(console.log('\n\tWelcome to the Generator!\n'))
    .then(() => {
        prompt.message = '';
        prompt.start();
    })
    .then(getInfo)
    .catch(console.log);
function getInfo() {
        var test;
        prompt.get(schema, (err, result) => {
            createDirs(result);
            writeJSON(result);
        });
}
function createDirs(input) {
    if(!fs.pathExistsSync(input.path)) {
        fs.mkdirsSync(input.path + 'test/');
        fs.mkdirsSync(input.path + 'app/');
    }
    fs.outputFileSync(input.path + 'app.js', '// J. Rasmussen 2017');
    fs.outputFileSync(input.path + 'README.md', 'init');
    return;
}
function writeJSON(input) {
    var tempObj = {};
    if(input.electron === 'yes' ||
       input.electron === 'y') {
        config.dependencies['electron'] = "^1.6.11";
    }
    for (var e in input) {
        if (e !== 'path' && e !== 'electron') {
            tempObj[e] = input[e];
        }
    }
    for (var e in config) {
        tempObj[e] = config[e]; 
    }
    fs.writeJsonSync(input.path + 'package.json', tempObj);
    return;
}