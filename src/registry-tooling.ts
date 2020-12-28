#!/usr/bin/env ts-node
import { program } from "commander";
import * as dotenv from "dotenv";
import { pushSchema } from "./push-schema";

dotenv.config();

program
  .version("0.1.0")
  .description("Tooling for schema graphql registry")
  .command("push <schemaPath>")
  .description("push graphql schema to registry")
  .action(function (schemaPath) {
    pushSchema(schemaPath);
  });

program.parse(process.argv);
