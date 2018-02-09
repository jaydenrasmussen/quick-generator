'use strict';
const test = require('ava');
const stdout = require('test-console').stdout;
const m = require('moment');
const log = require('../utils/util.log');

test('Error matches expected output', t => {
	let res = stdout.inspectSync(() => {
		log.error('Hello World!');
		console.log(`\u001b[31m[ERROR]\u001b[39m    ${m().format('L LTS')}  Hello World!`);
	});
	let actual = res[0];
	let expected = res[1];
	t.is(actual, expected);
});
test('Info matches expected output', t => {
	let res = stdout.inspectSync(() => {
		log.info('Hello World!');
		console.log(`\u001b[34m[INFO]\u001b[39m     ${m().format('L LTS')}  Hello World!`);
	});
	let actual = res[0];
	let expected = res[1];
	t.is(actual, expected);
});
test('Warn matches expected output', t => {
	let res = stdout.inspectSync(() => {
		log.warn('Hello World!');
		console.log(`\u001b[33m[WARN]\u001b[39m     ${m().format('L LTS')}  Hello World!`);
	});
	let actual = res[0];
	let expected = res[1];
	t.is(actual, expected);
});
test('Success matches expected output', t => {
	let res = stdout.inspectSync(() => {
		log.success('Hello World!');
		console.log(`\u001b[32m[SUCCESS]\u001b[39m  ${m().format('L LTS')}  Hello World!`);
	});
	let actual = res[0];
	let expected = res[1];
	t.is(actual, expected);
});
