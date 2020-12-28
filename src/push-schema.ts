import { readFileSync } from "fs";
import gql from "graphql-tag";
import got from "got";
import { print } from "graphql/language/printer";

export const pushSchema = async (schemaPath: string) => {
  const PUSH_SCHEMA_QUERY = gql`
    mutation PushSchema($schemaInput: SchemaInput!) {
      pushSchema(schemaInput: $schemaInput)
    }
  `;

  const config = Object.fromEntries(
    ["REGISTRY_URL", "REGISTRY_SERVICE_NAME", "REGISTRY_SERVICE_URL"].map(
      (configName) => {
        const configVal = process.env[configName];
        if (!configVal) {
          console.error(`Please add '${configName}' to your .env file`);
          process.exit(1);
        }
        return [configName, configVal];
      }
    )
  );

  try {
    const rawSchema = readFileSync(schemaPath, "utf-8").trim();

    const variables = {
      schemaInput: {
        serviceName: config.REGISTRY_SERVICE_NAME,
        serviceUrl: config.REGISTRY_SERVICE_URL,
        typeDefs: rawSchema,
      },
    };
    const result: any = await got.post(config.REGISTRY_URL, {
      json: {
        query: print(PUSH_SCHEMA_QUERY),
        variables,
      },
      responseType: "json",
    });

    if (result.pushSchema) {
      console.info("successfully pushed graphql schema to registry");
    }
  } catch (error) {
    console.error(
      "something went wrong when pushing graphql schema to registry",
      error
    );
  }
};
