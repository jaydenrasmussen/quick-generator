'use strict';
// should contain logic to create and initialize a repo
const execa = require('execa');
module.exports = async project => {
    execa
        .shell(
            `cd ${project} && git init && git add . && git commit -m "Initial commit"`
        )
        .catch(err =>
            console.log(
                `There was an error creating the git repo for ${project}`
            )
        );
};
