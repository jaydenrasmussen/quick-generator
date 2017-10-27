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
indent_size = 4
trim_trailing_whitespace = true`;
let licenseVar = `Copyright 2017 ${program.appAuthor}

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
`;
let base = process.cwd() + '/';
let config = {
    name: 'default',
    dependencies: {

    }
};

program
    .version('0.3.0')
    .command('init [options]')
    .option('-n --name [appName]', 'name of the project', addName)
    .option('-a --author [appAuthor]', 'author of the project', addAuthor)
    .option('-v --version [appVersion]', 'version of the project', addVersion)
    .option('-l --license [license]', 'license for the project', addLicense)
    .option('-e --electron', 'init with electron', addElectron)
    .option('-x --express', 'init with express', addExpress)
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
    return (config['dependencies']['electron'] = '^1.7.6');
}
function addExpress(val) {
    return (config['dependencies']['express'] = '4.16.2');
}
function addDefaults() {
    if (!program.appAuthor) {
        config['author'] = 'anonymous';
    }
    if (!program.appVersion) {
        config['version'] = '0.0.1';
    }
    if (!program.license) {
        config['license'] = 'ISC';
    }
    config['main'] = './app/app.js';
    config['bin'] = './app/app.js';
    config['scripts'] = {
        start: 'node ./app/app.js',
        test: 'ava',
        'test:watch': 'ava --watch',
        format: 'prettier --single-quote --tab-width 4 --print-width 80 --write "{,!(node_modules)/**/}*.js"'
    };

    config['dependencies']['bluebird'] = '^3.5.0';
    config['dependencies']['fs-extra'] = '^4.0.1';

    config['devDependencies'] = {
        ava: '^0.22.0',
        rewire: '^2.5.2',
        sinon: '^3.2.1'
    };
}
function createDirs() {
    fs.ensureDirSync(base + 'app/');
    fs.ensureDirSync(base + 'test/');
    if (config.dependencies['express']) {
        fs.ensureDirSync(base + 'routes/');
        fs.ensureDirSync(base + 'controllers/');
        fs.ensureDirSync(base + 'services/');
    }
}
function writeJSON() {
    fs.writeJsonSync(base + 'package.json', config);
    fs.outputFileSync(base + 'app/app.js', '// J. Rasmussen 2017');
    fs.outputFileSync(base + 'test/app.test.js', '// J. Rasmussen 2017');
    fs.outputFileSync(base + 'README.md', '# init');
    fs.outputFileSync(base + 'LICENSE.md', licenseVar);
    fs.outputFileSync(base + '.editorconfig', editorconfig);
    fs.outputFileSync(base + '.gitignore', 'node_modules');
    if (config.dependencies['express']) {
        fs.outputFileSync(base + 'routes/app.route.js', '// J. Ramussen 2017');
        fs.outputFileSync(base + 'controllers/app.controller.js', '// J. Ramussen 2017');
        fs.outputFileSync(base + 'services/app.service.js', '// J. Ramussen 2017');
    }
}
program.parse(process.argv);
