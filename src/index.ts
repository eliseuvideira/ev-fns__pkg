#!/usr/bin/env node

import yargs from "yargs";
import { createReadme } from "./commands/createReadme";
import { createTest } from "./commands/createTest";
import { withPrettyError } from "./functions/withPrettyError";

yargs
  .command(
    "create-test [-d directory]",
    "adds testing to project",
    {
      directory: {
        alias: "d",
        description: "Project directory",
        default: ".",
        demandOption: true,
      },
    },
    withPrettyError(createTest)
  )
  .command(
    "create-readme [-d directory]",
    "adds readme to project",
    {
      directory: {
        alias: "d",
        description: "Project directory",
        default: ".",
        demandOption: true,
      },
    },
    withPrettyError(createReadme)
  )
  .demandCommand()
  .help()
  .version()
  .strict().argv;
