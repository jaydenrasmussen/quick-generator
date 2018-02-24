'use strict';
// should contain logic to create and initialize a repo
const execa = require('execa');
const fs = require('fs-extra');
module.exports = async project => {
    await fs.outputFile(
        `${project}/.gitignore`,
        'node_modules\n.DS_Store\n.editorconfig\nbin'
    );
    await execa
        .shell(
            `cd ${project} && git init && git add . && git commit -m "Initial commit"`
        )
        .catch(err =>
            console.log(
                `There was an error creating the git repo for ${project}`
            )
        );
};
