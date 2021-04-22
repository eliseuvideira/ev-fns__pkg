import yargs from "yargs";
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
  .demandCommand()
  .help()
  .version()
  .strict().argv;
