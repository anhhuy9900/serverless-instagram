# Serverless - AWS Node.js Typescript - Instagram

This project used to interactive with [Instagram API](https://developers.facebook.com/docs/instagram-basic-display-api/overview)
- Authenticate login
- Get Access Token
- Get Long Live Access Token
- Refresh Token
- User Info
- Get Media
- Get Media Children
- etc...
### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

### Locally

In order to test the hello function locally, run the following command:

- `sls invoke local -f hello --path src/functions/hello/mock.json`


Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

## Testing

You can use different ways to run tests, and in this project, we're using JEST library to write tests for features
- To run test, please run CLI
```
    npm run test 
```
the CLI will run all file with extension .test

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://ApiEndpoint/dev/test' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Huy"
}'
```

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── instagram
│   │
│   └── libs                    # Lambda shared code
│       └── api-gateway.ts       # API Gateway specific helpers
│       └── handler-resolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```

### Dependencies libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
