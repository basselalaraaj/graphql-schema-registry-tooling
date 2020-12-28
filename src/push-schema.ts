import { readFileSync } from "fs";
import gql from "graphql-tag";
import got from "got";
import { print } from "graphql/language/printer";

export const pushSchema = async (schemaPath: string): Promise<boolean> => {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { body }: any = await got.post(config.REGISTRY_URL, {
      json: {
        query: print(PUSH_SCHEMA_QUERY),
        variables,
      },
      responseType: "json",
    });

    if (body.errors) {
      throw new Error(body.errors);
    }

    if (body.data.pushSchema) {
      console.info("successfully pushed graphql schema to registry");
    }

    return true;
  } catch (error) {
    console.error(
      "something went wrong when pushing graphql schema to registry",
      error
    );
    throw new Error(
      `something went wrong when pushing graphql schema to registry ${error}`
    );
  }
};
