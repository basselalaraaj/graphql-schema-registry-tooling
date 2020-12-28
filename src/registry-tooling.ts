#!/usr/bin/env ts-node
import * as dotenv from "dotenv";
import { pushSchema } from "./push-schema";

dotenv.config();

const [command] = process.argv.slice(2);

if (command === "push") {
  const [schemaPath] = process.argv.slice(3);
  pushSchema(schemaPath);
}
