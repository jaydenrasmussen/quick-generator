const fs = require('fs-extra');
const execa = require('execa');
const def = require('./def');
const base = `${process.cwd() + '/'}`;

module.exports = {
    main,
    express,
    micro,
    electron
};
async function checkYarn() {
    await execa.shell('yarn').catch(err => false);
    return true;
}
async function main(dir) {
    dir += '/';
    let yarn = await checkYarn();
    if (yarn) {
        return Promise.all([
            fs.ensureFile(`${base + dir}/app/app.js`),
            execa.shell(`cd ${base + dir} && yarn init -y`)
        ]);
    } else {
        return Promise.all([
            fs.ensureFile(`${base + dir}/app/app.js`),
            execa.shell(`cd ${base + dir} && npm init -y`)
        ]);
    }
}
async function express(dir) {
    let yarn = await checkYarn();
    await def(dir);
    await main(dir);
    yarn
        ? await execa.shell(`cd ${base + dir} && yarn add express`)
        : await execa.shell(`cd ${base + dir} && npm i -S express`);
}
async function micro(dir) {
    let yarn = await checkYarn();
    await def(dir);
    await main(dir);
    yarn
        ? await execa.shell(`cd ${base + dir} && yarn add micro micro-router`)
        : await execa.shell(`cd ${base + dir} && npm i -S micro micro-router`);
}
async function electron(dir) {
    let yarn = await checkYarn();
    await def(dir);
    await main(dir);
    yarn
        ? await execa.shell(`cd ${base + dir} && yarn add electron`)
        : await execa.shell(`cd ${base + dir} && npm i -S electron`);
}
