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

And ignore **base.ts** on **.gitignore**

```text
# Environment variables
src/environments/base.ts
.env
```

## Motivation

Well, I don't like to have environment variables on version control because
I want to be able to configure the application without deploying the app all 
over again.

## License

MIT
