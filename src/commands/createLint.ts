import { copyFileSync, existsSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import path from "path";
import { withDir } from "../functions/withDir";

const validateDir = (dir: string) => {
  const pkgPath = path.join(dir, "package.json");

  if (!existsSync(pkgPath)) {
    throw new Error(`directory ${dir} has no package.json file`);
  }

  const pkg = require(pkgPath);

  if (pkg["lint-staged"]) {
    throw new Error(`package ${pkgPath} already has lint-staged`);
  }
};

const appendPkg = (dir: string) => {
  const pkgPath = path.join(dir, "package.json");

  const pkg = require(pkgPath);

  pkg["lint-staged"] = {
    "*.{js,ts}": ["eslint", "prettier --check"],
  };

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
};

const copyTemplate = (dir: string) => {
  const files = [".eslintrc", ".huskyrc", ".prettierrc"];

  for (const file of files) {
    copyFileSync(
      path.join(__dirname, "..", "..", "templates", "createLint", file),
      path.join(dir, file)
    );
  }
};

const installPkgs = (dir: string) =>
  withDir(dir, () => {
    execSync(
      "yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint husky@4 lint-staged prettier",
      { stdio: "inherit" }
    );
  });

export const createLint = ({ directory }: Record<string, string>) => {
  const dir = path.resolve(directory);

  validateDir(dir);

  appendPkg(dir);

  copyTemplate(dir);

  installPkgs(dir);
};
