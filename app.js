// J. Rasmussen 2017
// Main generator for node apps
var Promise = require('bluebird');
const fs = require('fs-extra');
const program = require('commander');

let editorconfig = `root = true
[*]
end_of_line = lf
insert_final_newline = true
[*.js]
charset = utf-8
indent_style = spaces
indent_size = 4`;
let base = process.cwd() + '/';
let config = {};

program
    .version('0.2.0')
    .command('init [options]')
    .option('-n --name [appName]', 'name of the project', addName)
    .option('-a --author [appAuthor]', 'author of the project', addAuthor)
    .option('-v --version [appVersion]', 'version of the project', addVersion)
    .option('-l --license [license]', 'license for the project', addLicense)
    .option('-e --electron', 'init with electron', addElectron)
    .action(() => {
        addDefaults();
        createDirs();
        writeJSON();
        process.exit(0);
    });
function addName(val) {
    return (config['name'] = val);
}
function addAuthor(val) {
    return (config['author'] = val);
}
function addVersion(val) {
    return (config['version'] = val);
}
function addLicense(val) {
    return (config['license'] = val);
}
function addElectron(val) {
    return (config.dependencies['electron'] = '^1.7.6');
}
function addDefaults() {
    if (program.appName) {
        config['name'] = 'default';
    }
    if (!program.appAuthor) {
        config['author'] = 'anonymous';
    }
    if (!program.appVersion) {
        config['version'] = '0.0.1';
    }
    if (!program.license) {
        config['license'] = 'MIT';
    }
    config['main'] = './app/app.js';
    config['bin'] = './app/app.js';
    config['scripts'] = {
        start: 'node ./app/app.js',
        test: 'ava',
        'test:watch': 'ava --watch',
        format:
            'prettier --single-quote --tab-width 4 --print-width 80 --write "{,!(node_modules)/**/}*.js"'
    };
    config['dependencies'] = {
        bluebird: '^3.5.0',
        'fs-extra': '^4.0.1'
    };
    config['devDependencies'] = {
        ava: '^0.22.0',
        rewire: '^2.5.2',
        sinon: '^3.2.1'
    };
}
function createDirs() {
    fs.ensureDirSync(base + 'app/');
    fs.ensureDirSync(base + 'test/');
}
function writeJSON() {
    fs.writeJsonSync(base + 'package.json', config);
    fs.outputFileSync(base + 'app/app.js', '// J. Rasmussen 2017');
    fs.outputFileSync(base + 'test/app.test.js', '// J. Rasmussen 2017');
    fs.outputFileSync(base + 'README.md', '# init');
    fs.outputFileSync(base + '.editorconfig', editorconfig);
    fs.outputFileSync(base + '.gitignore', 'node_modules');
}
program.parse(process.argv);
