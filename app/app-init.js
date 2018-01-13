const program = require('commander');
const log = require('./log');
const def = require('./def');
const nodeCtrl = require('./nodeCtrl');
const goCtrl = require('./goCtrl');

program.parse(process.argv);

program.args[1]
    ? verifyArgs(program.args)
    : log.error('You must supply a name for the new directory');

async function verifyArgs(args) {
    switch (args[0]) {
        case 'e':
        case 'E':
        case 'electron':
            await elecApp();
            break;
        case 'x':
        case 'X':
        case 'express':
            await expApp();
            break;
        case 'i':
        case 'I':
        case 'init':
            await def(program.args[1]);
            break;
        case 'm':
        case 'M':
        case 'micro':
            await microApp();
            break;
        case 'n':
        case 'N':
        case 'node':
            await nodeApp();
            break;
        case 'g':
        case 'G':
        case 'go' || 'g' || 'G':
            await goApp();
            break;
        default:
            console.log(
                'Invalid option. available options are: init, node, electron, micro, and go'
            );
            break;
    }
    return;
}
async function nodeApp() {
    await def(program.args[1]);
    await nodeCtrl.main(program.args[1]);
    return log.info('Command executed successfully!');
}
async function goApp() {
    await def(program.args[1]);
    await goCtrl(program.args[1]);
    return log.info('Command executed successfully!');
}
async function expApp() {
    await nodeCtrl.express(program.args[1]);
    return log.info('Command executed successfully!');
}
async function elecApp() {
    await nodeCtrl.electron(program.args[1]);
    return log.info('Command executed successfully!');
}
async function microApp() {
    await def(program.args[1]);
    await nodeCtrl.micro(program.args[1]);
    return log.info('Command executed successfully!');
}
