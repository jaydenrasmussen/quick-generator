'use strict';
// should contain logic for package managers
// 		npm
// 		yarn
const execa = require('execa');
module.exports = {
    yarn: {
        exists: yarnExists,
        add: yarnAdd
    },
    npm: {
        exists: npmExists,
        add: npmAdd
    }
};
async function yarnExists() {
    let bool = execa.shell('yarn').catch(err => false);
    return bool ? true : false;
}
async function yarnAdd(project, pkg) {
    execa
        .shell(`cd ${project} && yarn add ${pkg}`)
        .catch(err => console.log(err));
}
async function npmExists() {
    let bool = execa.shell('npm').catch(err => false);
    return bool ? true : false;
}
async function npmAdd(project, pkg) {
    execa
        .shell(`cd ${project} && npm i -S ${pkg}`)
        .catch(err => console.log(err));
}
