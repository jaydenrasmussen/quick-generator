// J. Rasmussen 2017
// Option help is defined @ the verify args function
'use strict'

const program = require('commander');
const execa = require('execa');
const nodeCtrl = require('./nodeCtrl');
const goCtrl = require('./goCtrl');
const def = require('./def');
const base = `${process.cwd() + '/'}`;

program.parse(process.argv);

program.args[1]
    ? verifyArgs(program.args)
    : console.log('You must supply a name for the new directory');

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
		case 'init' || 'i' || 'I':
			await defaultAction();
			break;
		case 'm':
		case 'M':
		case 'micro' || 'm' || 'M':
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
			console.log('Invalid option. available options are: init, node, electron, micro, and go');
			break;
	}
	return;
}
async function defaultAction() {
    await def(program.args[1]);
    await gitCommands(program.args[1]);
}
async function nodeApp() {
    await def(program.args[1]);
    await nodeCtrl.main(program.args[1]);
    await gitCommands(program.args[1]);
}
async function expApp() {
    await nodeCtrl.express(program.args[1]);
    await gitCommands(program.args[1]);
}
async function elecApp() {
    await nodeCtrl.electron(program.args[1]);
    await gitCommands(program.args[1]);
}
async function microApp() {
    await def(program.args[1]);
    await nodeCtrl.micro(program.args[1]);
    await gitCommands(program.args[1]);
}
async function goApp() {
    await def(program.args[1]);
    await goCtrl(program.args[1]);
    await gitCommands(program.args[1]);
}
async function gitCommands(dir) {
    await execa.shell(
        'cd ' +
            base +
            '/' +
            dir +
            ' && git init ' +
            '&& git add . ' +
            '&& git commit -m "initial commit"'
    );
    return console.log('Command executed successfully!');
}
