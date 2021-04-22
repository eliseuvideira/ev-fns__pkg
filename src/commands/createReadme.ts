import { copyFileSync, existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const validate = (dir: string) => {
  const pkgPath = path.join(dir, "package.json");

  if (!existsSync(pkgPath)) {
    throw new Error(`directory ${dir} has no package.json file`);
  }

  const readmePath = path.join(dir, "README.md");

  if (existsSync(readmePath)) {
    throw new Error(`directory ${dir} already has a README.md file`);
  }
};

const copyTemplate = (dir: string) => {
  const templatePath = path.join(
    __dirname,
    "..",
    "..",
    "templates",
    "createReadme",
    "README.md"
  );
  const readmePath = path.join(dir, "README.md");
  copyFileSync(templatePath, readmePath);
};

const replaceVariables = (dir: string) => {
  const pkgPath = path.join(dir, "package.json");

  const { name, description } = require(pkgPath);

  const readmePath = path.join(dir, "README.md");

  const content = readFileSync(readmePath).toString("utf8");

  writeFileSync(
    readmePath,
    content
      .replace(/\{\{project-name\}\}/g, name || "project-name")
      .replace(
        /\{\{project-description\}\}/g,
        description || name || "project-description"
      )
  );
};

export const createReadme = ({ directory }: Record<string, string>) => {
  const dir = path.resolve(directory);

  validate(dir);

  copyTemplate(dir);

  replaceVariables(dir);
};
