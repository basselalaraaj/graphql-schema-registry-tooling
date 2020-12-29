# graphql-schema-registry-tooling
[![npm](https://img.shields.io/npm/v/graphql-schema-registry-tooling.svg)](https://www.npmjs.com/package/graphql-schema-registry-tooling)

This package offers tooling for the [graphql-schema-registry](https://github.com/basselalaraaj/graphql-schema-registry)

## Getting started

##### Yarn
```shell
yarn add graphql-schema-registry-tooling
```

##### NPM
```shell
npm install graphql-schema-registry-tooling
```

### Pushing graphql schema to registry

Add config to your .env file
```shell
REGISTRY_URL=http://graphql-registry
REGISTRY_SERVICE_NAME=cart
REGISTRY_SERVICE_URL=http://cart
```

Add command to your package.json
```shell
graphql-schema-registry push src/schema.graphql
```

For more commands and options run
```shell
graphql-schema-registry help
```

### Retrieving graphql schema from registry

Add the module import to your .ts file
```shell
import { retrieveSchemas } from "graphql-schema-registry-tooling";
```

Add command to your package.json
```shell
const serviceSchemas = await retrieveSchemas()
```