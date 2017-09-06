// J. Rasmussen 2017
// Main generator for node apps
var Promise = require('bluebird');
const prompt = require('prompt');
const fs = require('fs-extra');
const path = require('path');
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
    "main": "./app/app.js",
    "bin": "./app/app.js",
    "scripts": {
        "start": "node app.js",
        "test": "ava",
        "test:watch": "ava --watch",
        "format": "prettier --single-quote --tab-width 4 --print-width 80 --write '{,!(node_modules)/**/}*.js'"
    },
    "dependencies": {
        "bluebird": "^3.5.0",
        "fs-extra": "^4.0.1"
    },
    "devDependencies": {
        "ava": "^0.22.0",
        "rewire": "^2.5.2",
        "sinon": "^3.2.1"
    }
};
let directory = process.cwd();

module.exports = Promise.resolve()
    .then(console.log('\n\tWelcome to the Generator!\n'))
    .then(() => {
        prompt.message = '';
        prompt.start();
    })
    .then(getInfo)
    .catch(console.log);
function getInfo() {
        return prompt.get(schema, (err, result) => {
            createDirs(directory);
            writeJSON(result, directory);
        });
}
function createDirs(input) {
    fs.ensureDirSync(input + '/test/');
    fs.ensureDirSync(input + '/app/');
    fs.outputFileSync(input + '/app/app.js', '// J. Rasmussen 2017');
    fs.outputFileSync(input + '/test/app.test.js', '// J. Rasmussen 2017');
    fs.outputFileSync(input + '/README.md', 'init');
    return;
}
function writeJSON(input, dir) {
    let tempObj = {};
    if(input.electron === 'yes' ||
       input.electron === 'y') {
        config.dependencies['electron'] = "^1.6.11";
    }
    for (let e in input) {
        if (e !== 'path' && e !== 'electron') {
            tempObj[e] = input[e];
        }
    }
    for (let e in config) {
        tempObj[e] = config[e]; 
    }
    fs.writeJsonSync(dir + '/package.json', tempObj);
    return;
}