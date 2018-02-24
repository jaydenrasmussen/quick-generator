'use strict';
const util = require('../utils');
const log = require('lumberr')();
module.exports = async cli => {
    if (!cli.input[0]) {
        return util.log.error('You must specify a command');
    }
    if (!cli.input[1]) {
        return util.log.error('You must supply a name for the project');
    }
    let command = cli.input[0].toLowerCase();
    let project = cli.input[1];
    switch (command) {
        case 'e':
        case 'electron':
            await util.node
                .electron(project)
                .then(() => log.success(`Successfully created ${project}`));
            break;
        case 'g':
        case 'go':
            await util
                .go(project)
                .then(() => log.success(`Successfully created ${project}`));
            break;
        case 'i':
        case 'init':
            await util
                .default(project)
                .then(() => log.success(`Successfully created ${project}`));
            break;
        case 'n':
        case 'node':
            await util.node
                .node(project)
                .then(() => log.success(`Successfully created ${project}`));
            break;
        case 'm':
        case 'micro':
            await util.node
                .micro(project)
                .then(() => log.success(`Successfully created ${project}`));
            break;
        case 'p':
        case 'polka':
            await util.node
                .polka(project)
                .then(() => log.success(`Successfully created ${project}`));
            break;
        case 'x':
        case 'express':
            await util.node
                .express(project)
                .then(() => log.success(`Successfully created ${project}`));
            break;
        case 'm':
        case 'micro':
            await util.node
                .micro(project)
                .then(() => log.success(`Successfully created ${project}`));
            break;
        default:
            log.error(`${command} is not a valid command`);
            return console.log(cli.help);
    }
    if ((cli.flags.repo || cli.flags.r) && cli.input[0] && cli.input[1]) {
        await util.repo(project);
    }
};
