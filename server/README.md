# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Service usage

This template contains a single lambda function triggered by an HTTP request made on the provisioned API Gateway REST API `/word-types` route with `POST` method. The request body must be provided as `application/json`. The body structure is tested by API Gateway against `src/functions/word-types/schema.ts` JSON-Schema definition: it must contain the `text` property.

- requesting any other path than `/word-types` with any other method than `POST` will result in API Gateway returning a `403` HTTP error code
- sending a `POST` request to `/word-types` with a payload **not** containing a string property named `text` will result in API Gateway returning a `400` HTTP error code
- sending a `POST` request to `/word-types` with a payload containing a string property named `text` will result in API Gateway returning a `200` HTTP status code with a message saluting the provided name and the detailed event processed by the lambda

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.

### Locally

In order to run the wordTypes function locally, run the following command:

- `npx sls offline start` if you're using NPM
- `yarn sls offline start` if you're using Yarn

### Remotely

Configure your AWS credentials using the [Serverless credentials guide](https://slss.io/aws-creds-setup).

Copy and replace your `url` - found in Serverless `npx sls deploy` command output - and `text` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://myApiEndpoint/dev/word-types' \
--header 'Content-Type: application/json' \
--data-raw '{
    "text": "water cat table phone eagerly one happy eat the"
}'
```
