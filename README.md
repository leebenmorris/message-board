# Message Board Backend

## The task

Time limit: 1 hour

Please build a production ready Node.JS application that works like a simple message board. This app should expose a REST interface that allows an anonymous user to submit messages and to retrieve a list of the submitted messages. Please follow sound engineering practices and due to the limited time available, please document any trade-offs that you had to make whilst building this app.  
<br/>

## How to run

**NOTE:**

> To install the dependencies npm v8 or above should be used as the `package-lock.json` is currently at version 2.

> To run, particularly the tests, at least Node 14.8 is required as top-level await has been used in the tests.

> There is an `engines` property in the `package.json` to try to ensure these two requirements are met, and `engine-strict` has been set to `true` in the `.npmrc` to try to enforce this.

<br/>

Install the dependencies by running:

```
npm install
```

To start the server on the default port of 9999, run:

```
npm start
```

To pick a different port run with (on Mac and Linux at least):

```
PORT=<some port number> npm start
```

The two available endpoints are:

-   `POST /message/new` to post a new JSON message in the format

    ```json
    {
        "message": <string: some text>,
        "added": <number: javascript timestamp (milliseconds since the UNIX epoch)>
    }
    ```

    Note that due to time constraints this message is not currently validated, so as it stands any JSON message can be sent. Only JSON message bodies are decoded (using the built-in `express.json()` middleware) and the header `Content-Type` is set to `application/json` for this to work.

-   `GET messages/all` to retrieve all posted messages as a JSON array.

## How to test

Simply run:

```
npm test
```

This fires off some simple Jest based tests. These are what I would call 'component' level tests. They use [supertest](https://github.com/ladjs/supertest) to start an instance of the app with an ephemeral port. This is why the application has been split into [app.js](./src/app.js) and [index.js](./src/index.js).

I feel that the app is simple enough right now to not need lower level 'unit' type tests.

## Linting

ESLint is used in this project to check for basic code issues.

If you use VS Code, and have the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) installed, then lint-on-save has been enabled through the project [VS Code settings](./.vscode/settings.json).

To run the linting manually:

```
npm run lint
```

And to try and fix 'fixable' issues:

```
npm run lint -- --fix
```

## Formatting

Prettier is used in this project to format the code in a standard way using a [configuration file](./.prettierrc).

If you use VS Code, and have the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) installed, then format-on-save has been enabled through the project [VS Code settings](./.vscode/settings.json).

To format code manually:

```
npm run format
```

The Prettier ESLint plugin is also used. This should turn off all ESLint formatting rules that may conflict with Prettier formatting rules. To check if there are any conflicting rules please run:

```
npm run format:check-rules
```

## Trade-offs and caveats

Due to the limited time available, there are some things that have not been thoroughly implemented - the focus was on TDD developed endpoints that met the basic operational specification of the application - basically working on the principle of 'make it work, make it right, make it fast'.

Here is a list with some of the omissions and issues:

-   There is no custom 404 handler for unknown routes.
-   There is no custom error handler, so if an error occurs in the Express app, Express' default error handler will be used.
-   There is no validation of the incoming messages, so currently any JSON message can be sent to the `message/new` endpoint. I have used [Hapi Joi](https://www.npmjs.com/package/joi) before as it allows for the creation of easily human-readable schemas. Probably the most common way of writing JSON schemas is to actually use [JSON schema](https://json-schema.org/), and probably the most commonly used library for working with these is [AJV](https://www.npmjs.com/package/ajv).
-   There is no logging in the app of any kind, except a simple `console.log` when the server starts.
-   Currently, messages are only saved to memory so only last for the lifetime of the application. The message saving has been written as a separate module - which can and has been mocked for testing purposes - with a simple interface with the intention that the saving mechanism can change, but the interface the rest of the app uses would not. In a real application a simple JSON document store like DynamoDB or Mongo would work well for this.
-   I have not used TypeScript in this application. Unfortunately, my team at DAZN has not used TypeScript. I am currently doing a course on it, but did not feel confident enough just yet to do the tech test with it, especially considering the time constraints.
-   I have used ESM modules for this project (I have set `type` to `module` in the `package.json`). Some NPM packages are now only available as ESM packages. ESM modules also run by default in `strict` mode. The issue with this comes with Jest which only has [experimental support for ESM](https://jestjs.io/docs/ecmascript-modules) (and has done for several years!). To get this to work, Jest needs the `experimental-vm-modules` option enabled in Node, so the underlying command for `npm test` is actually `NODE_OPTIONS=--experimental-vm-modules jest ./tests`. Module mocking is also not feature complete in Jest for ESM, and needs to make use of `jest.unstable_mockModule` to work. It's possible that the module mocking issues could be worked around by not using module mocking at all, but by using Dependency Injection instead. The most popular package for this seems to be [Inversify](https://www.npmjs.com/package/inversify). I have also in the past, for simple needs, used 'poor person's DI' - essentially making use of a factory function or class that has default dependencies on instantiation that can be overridden in tests.
