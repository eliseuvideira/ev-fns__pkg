#!/usr/bin/env node

import figlet from "figlet";
import clear from "clear";
import yargs from "yargs";
import { createReadme } from "./commands/createReadme";
import { createTest } from "./commands/createTest";
import { withPrettyError } from "./functions/withPrettyError";
import { createLint } from "./commands/createLint";

clear();

console.log(figlet.textSync("@ev-fns/pkg", { horizontalLayout: "full" }));

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
  .command(
    "create-lint [-d directory]",
    "adds eslint, prettier hooks to project",
    {
      directory: {
        alias: "d",
        description: "Project directory",
        default: ".",
        demandOption: true,
      },
    },
    withPrettyError(createLint)
  )
  .demandCommand()
  .help()
  .version()
  .strict().argv;
