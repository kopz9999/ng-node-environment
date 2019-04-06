# NgNodeEnvironment
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

## Synopsis

Load process.env variables into Angular 2-4
Simple command line tool to write environment variables into Angular 2-4.
Supports **dotenv**

## Installation

```shell
npm install --save ng-node-environment
```

I recommend to put this entry on postinstall script. 
Examples:

```json
{
  "scripts": {
    "postinstall": "node ./node_modules/ng-node-environment/index.js"
  }
}
```

or (in case you have node on /usr/local/bin/node)

```json
{
  "scripts": {
    "postinstall": "node-env-to-ng"
  }
}
```

## Code Example

All variables that will go into Angular 2-4 must have the prefix **NG_**.
Example:

```shell
NG_SECRET=SECRET
NG_API_TOKEN=SECRET_TOKEN
```

Then
```
node ./node_modules/ng-node-environment/index.js
```

or (assuming you used postinstall configuration)

```
npm run postinstall
```

This will create a file named base.ts in the following way:

```typescript
// src/environments/base.ts
export default {
  "secret": "SECRET",
  "apiToken": "SECRET_TOKEN"
}
```

Then merge this config into your environment(s):

```typescript
import sharedEnvironment from './base';

export const environment = {
  ...sharedEnvironment,
  production: false,
};
```

In case you got troubles due to constants on `app.module.ts`, you can take the exported constant variable:

> NOTE: the brackets on `{sharedEnvironment}` are required to avoid aot issues.

```typescript
import { sharedEnvironment } from './base';

export const environment = {
  ...sharedEnvironment,
  production: false,
};
```

And ignore **base.ts** on **.gitignore**

```text
# Environment variables
src/environments/base.ts
.env
```

## Local environments

### DotEnv

A local `.env` file can be provided to load environment variables from file

### Multiple environments with JSON

**NgNodeEnvironment** supports multiple environments for local development.
By default, a file named `environment.json` in the root folder of the app will be taken.

This default behaviour can be changed through the `--in` option. 
The following will read the file `./envs/default.json` and will write it into 
`./src/environments/base.ts`.

```
$ node ./node_modules/ng-node-environment/index.js --in="./envs/default.json"
```

The out file `base.ts` can be overridden with the `--out` option. 
The following will read the file `./envs/staging.json` and will write it into 
`./src/environments/staging.out.ts`.

```
$ node ./node_modules/ng-node-environment/index.js --in="./envs/staging.json" --out="./src/environments/staging.out.ts"
```

Multiple environments on `package.json`

```json
{
    "ng-node-environment": "node ./node_modules/ng-node-environment/index.js",
    "staging-env": "npm run ng-node-environment -- --in=\"./envs/staging.json\" --out=\"./src/environments/staging.out.ts\"",
    "prod-env": "npm run ng-node-environment -- --in=\"./envs/prod.json\" --out=\"./src/environments/prod.out.ts\""
}
```

## Testing

If there's any modification to be added to this package, please test with a sample running:

```bash
$ node index.js --in=./test_configs/test-config.json --out=./test_configs/test-config.out.ts
```

Just to make sure it is still working!

## Motivation

Well, I don't like to have environment variables on version control because
I want to be able to configure the application without deploying the app all 
over again.

## License

MIT

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/Ferrzo"><img src="https://avatars1.githubusercontent.com/u/4921788?v=4" width="100px;" alt="Ferrzo"/><br /><sub><b>Ferrzo</b></sub></a><br /><a href="https://github.com/kopz9999/ng-node-environment/commits?author=Ferrzo" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!