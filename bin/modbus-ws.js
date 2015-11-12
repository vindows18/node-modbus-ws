#!/usr/bin/env node

/**
 * Copyright (c) 2015, Yaacov Zamir <kobi.zamir@gmail.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any 
 * purpose with or without fee is hereby granted, provided that the above 
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES 
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF 
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR 
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES 
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN 
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF 
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF  THIS SOFTWARE.
 */

var program = require('commander');

var app = require('../app');
var server = require('../server');

var version = app.locals.appInfo.version;
var numberRegex = /^[0-9]*$/;

// get user cli arguments
program
    .version(version)
    .option('-s, --serial <port>', 'Use serial port, set port. [false]', false)
    .option('-b, --baudrate <boud>', 'Set serial port baudrate. [9600]', numberRegex, 9600)
    .option('-i, --ip <ip>', 'Use tcp/ip, set slave url or ip address. [false]', false)
    .option('-P, --tcpport <number>', 'Server port number [3000]', numberRegex, 3000)
    .on('--help', function(){
        console.log('  Examples:');
        console.log('');
        console.log('    modbus-ws --ip 192.168.1.24');
        console.log('       create a bridge to a modbus slave using tcp/ip.');
        console.log('    modbus-ws --serial /dev/ttyUSB0');
        console.log('       create a bridge to a modbus slave using a serial port.');
        console.log('    modbus-ws');
        console.log('       when serial and tcp/ip are not used, default to test.');
        console.log('       create a bridge to a modbus simulated slave.');
        console.log('');
    })
    .parse(process.argv);

// copy the cli arguments into the server's app object
app.locals.serial = program.serial;
app.locals.baudrate = program.baudrate;
app.locals.ip = program.ip;
app.locals.tcpport = program.tcpport;

// start the server
server.start();