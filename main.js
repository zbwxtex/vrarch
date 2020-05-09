#!/usr/bin/env node

/**
 * VRArch: Virus file security archive tool
 * Compress: LZMA -> GZIP -> zlib.Deflate -> zlib.BrotliCompress
*/
const chalk = require('chalk');
const process = require('process');
const fs = require('fs');
const zlib = require('zlib');
const lzma = require("lzma");

var input = process.argv[2];

var output;

if(input.endsWith('.varch')) {
	output = input.replace('.varch', '');
	var data = fs.readFileSync(input);
	fs.writeFileSync(output, data);
} else {
	output = input + '.varch';
	var data = fs.readFileSync(input);
	data = Buffer.from(lzma.compress(data, 9));
	data = zlib.gzipSync(data);
	data = zlib.deflateRawSync(data);
	data = zlib.brotliCompressSync(data);
	fs.writeFileSync(output, data);
}

console.log(`Outputed to ${output}`);
console.log(chalk.green.bold('Successful!'));
