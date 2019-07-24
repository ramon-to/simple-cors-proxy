#! /usr/bin/env node
const program = require('commander');
const proxy = require('./proxy');
const pjson = require('../package.json');

program.version(pjson.version, '-v, --version');

program
    .option('-t, --target <target>', 'target host')
    .option('-p, --port <port>', 'server port', parseFloat, 8080)
    .option('-ip, --ip <ip>', 'server ip', 'localhost');

program.parse(process.argv);

const {
    target,
    port,
    ip,
} = program.opts();

if (!target) {
    console.log('--target option is required');
    process.exit(0);
}

proxy(port, ip, target);