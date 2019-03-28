#! /usr/local/bin/node

var commandLineArgs = require('command-line-args');
var camelize = require('camelize');
var fs = require('fs');
var path = require('path');
var appRoot = require('app-root-path');
var currentValue, environmentProperty, environmentBase, tsString, booleanValue;

var optionDefinitions = [
  { name: 'out', alias: 'o', type: String },
  { name: 'in', alias: 'i', type: String },
];

var options = commandLineArgs(optionDefinitions);
var environmentPath = options['in'] || path.join(appRoot.toString(), 'environment.json');;
var tsEnvironmentPath = options['out'] || path.join(appRoot.toString(), 'src', 'environments', 'base.ts')

if (fs.existsSync(environmentPath)) {
  console.log('Reading base environment: ' + environmentPath);
  environmentBase = JSON.parse(fs.readFileSync(environmentPath, 'utf-8').toString());
} else {
  environmentBase = {};
}

require('dotenv').config();

Object.keys(process.env).forEach(function (key) {
  if (key.startsWith('NG_')) {
    currentValue = process.env[key];
    booleanValue = currentValue.toLowerCase();
    environmentProperty = camelize(key.substr(3).toLowerCase());
    if (booleanValue === 'true' || booleanValue === 'false') {
      environmentBase[environmentProperty] = booleanValue === 'true';
    } else {
      environmentBase[environmentProperty] = currentValue;
    }
  }
});

var envJson = JSON.stringify(environmentBase, null, '  ').replace(/\"/g,"'");
tsString = "export const sharedEnvironment = " + envJson + "\n\nexport default sharedEnvironment;";

console.log('Writing variables from process.env: ' + tsEnvironmentPath);

fs.writeFileSync(tsEnvironmentPath, tsString);

console.log('Finished');
