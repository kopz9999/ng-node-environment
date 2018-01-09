#! /usr/local/bin/node

require('dotenv').config();
var camelize = require('camelize');
var fs = require('fs');
var path = require('path');
var appRoot = require('app-root-path');
var environmentPath = path.join(appRoot.toString(), 'environment.json');
var tsEnvironmentPath = path.join(appRoot.toString(), 'src', 'environments', 'base.ts');
var currentValue, environmentProperty, environmentBase, tsString, booleanValue;

console.log('Reading base environment: ' + environmentPath);

if (fs.existsSync(environmentPath)) {
  environmentBase = JSON.parse(fs.readFileSync(environmentPath, 'utf-8').toString());
} else {
  environmentBase = {};
}

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

tsString = "export const sharedEnvironment = " + JSON.stringify(environmentBase, null, '  ') + "\n\nexport default sharedEnvironment;";

console.log('Writing variables from process.env: ' + tsEnvironmentPath);

fs.writeFileSync(tsEnvironmentPath, tsString);

console.log('Finished');
