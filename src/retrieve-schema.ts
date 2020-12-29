import gql from "graphql-tag";
import got from "got";
import * as dotenv from "dotenv";
import { print } from "graphql/language/printer";
import { Schema } from "./generated/graphql";

dotenv.config();

export const retrieveSchemas = async (): Promise<Schema[]> => {
  const RETRIEVE_SCHEMA_QUERY = gql`
    query GetAllSchemas {
      getAllSchemas {
        serviceName
        serviceUrl
        typeDefs
      }
    }
  `;

  const config = Object.fromEntries(
    ["REGISTRY_URL"].map((configName) => {
      const configVal = process.env[configName];
      if (!configVal) {
        console.error(`Please add '${configName}' to your .env file`);
        process.exit(1);
      }
      return [configName, configVal];
    })
  );

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { body }: any = await got.post(config.REGISTRY_URL, {
      json: {
        query: print(RETRIEVE_SCHEMA_QUERY),
        variables: {},
      },
      responseType: "json",
    });

    if (body.errors) {
      throw new Error(body.errors);
    }

    if (!body.data.getAllSchemas) {
      throw new Error("not able to retrieve schema from registry");
    }

    return body.data.getAllSchemas;
  } catch (error) {
    console.error(
      "something went wrong when retrieving graphql schema from registry",
      error
    );
    throw new Error(
      `something went wrong when retrieving graphql schema from registry ${error}`
    );
  }
};
