import { execSync } from "child_process";
import { copyFileSync, existsSync, writeFileSync } from "fs";
import path from "path";
import { withDir } from "../functions/withDir";

interface CreateTestProps {
  directory: string;
}

const validateDir = (dir: string) => {
  const pkgPath = path.join(dir, "package.json");

  if (!existsSync(pkgPath)) {
    throw new Error(`directory ${dir} has no package.json file`);
  }

  const pkg = require(pkgPath);

  if (pkg.scripts) {
    if (pkg.scripts.coverage) {
      throw new Error(`package ${dir} already has coverage script`);
    }
    if (pkg.scripts.test) {
      throw new Error(`package ${dir} already has test script`);
    }
    if (pkg.scripts.watch) {
      throw new Error(`package ${dir} already has watch script`);
    }
  }

  const jestFilePath = path.join(dir, "jest.config.js");
  if (existsSync(jestFilePath)) {
    throw new Error(`jest.config.js already configured for directory ${dir}`);
  }
};

const appendPkg = (directory: string) => {
  const pkgPath = path.join(path.resolve(directory), "package.json");

  const pkg = require(pkgPath);

  pkg.scripts = {
    ...(pkg.scripts || {}),
    coverage: "jest --coverage",
    test: "jest",
    watch: "jest --watch",
  };

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
};

const copyTemplate = (directory: string) => {
  copyFileSync(
    path.join(
      __dirname,
      "..",
      "..",
      "templates",
      "createTest",
      "jest.config.js"
    ),
    path.join(directory, "jest.config.js")
  );
};

const installPkgs = (dir: string) =>
  withDir(dir, () => {
    execSync("yarn add -D jest @types/jest ts-jest", { stdio: "inherit" });
  });

export const createTest = ({ directory }: CreateTestProps) => {
  const dir = path.resolve(directory);

  validateDir(dir);

  appendPkg(dir);

  copyTemplate(dir);

  installPkgs(dir);
};
