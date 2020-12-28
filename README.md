# graphql-schema-registry-tooling

## Usage :rocket:

#### Yarn
```shell
yarn add graphql-schema-registry-tooling
```

#### NPM
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