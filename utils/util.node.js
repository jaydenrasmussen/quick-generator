'use strict';
const fs = require('fs-extra');
const execa = require('execa');
const pm = require('../utils/util.pm');
const def = require('../utils/util.default');
module.exports = {
    electron,
    node,
    micro,
    polka,
    express,
    micro
};
async function pkg(project) {
    let packageJson = {
        name: project,
        author: '',
        version: '1.0.0',
        license: 'ISC',
        scripts: {
            start: 'node app/app',
            format:
                'prettier --single-quote --tab-width 4 --print-width 80 --write "{,!(node_modules)/**/}*.js"'
        }
    };
    await fs.outputJson(
        `${process.cwd()}/${project}/package.json`,
        packageJson
    );
}
async function electron(project) {
    await node(project);
    let yarnExists = await pm.yarn.exists();
    if (yarnExists) {
        await pm.yarn.add(project, 'electron');
    } else {
        await pm.npm.add(project, 'electron');
    }
}
async function node(project) {
    await mainDir(project);
    await appDir(project);
    await Promise.all([
        appJs(project),
        def(project),
        pkg(project),
        testDir(project)
    ]);
}
async function micro(project) {
    await node(project);
    await Promise.all([routesDir(project), controllersDir(project)]);
    let yarnExists = await pm.yarn.exists();
    if (yarnExists) {
        await pm.yarn.add(project, 'micro');
    } else {
        await pm.npm.add(project, 'micro');
    }
}
async function polka(project) {
    await node(project);
    await Promise.all([routesDir(project), controllersDir(project)]);
    let yarnExists = await pm.yarn.exists();
    if (yarnExists) {
        await pm.yarn.add(project, 'polka');
    } else {
        await pm.npm.add(project, 'polka');
    }
}
async function express(project) {
    await node(project);
    await Promise.all([routesDir(project), controllersDir(project)]);
    let yarnExists = await pm.yarn.exists();
    if (yarnExists) {
        await pm.yarn.add(project, 'express');
    } else {
        await pm.npm.add(project, 'express');
    }
}
async function routesDir(project) {
    await fs.ensureDir(`${process.cwd()}/${project}/routes`);
}
async function controllersDir(project) {
    await fs.ensureDir(`${process.cwd()}/${project}/controllers`);
}
async function appDir(project) {
    await fs.ensureDir(`${process.cwd()}/${project}/app`);
}
async function testDir(project) {
    await fs.ensureDir(`${process.cwd()}/${project}/tests`);
}
async function mainDir(project) {
    await fs.ensureDir(`${process.cwd()}/${project}`);
}
async function appJs(project) {
    await fs.outputFile(
        `${process.cwd()}/${project}/app/app.js`,
        `'use strict';`
    );
}
