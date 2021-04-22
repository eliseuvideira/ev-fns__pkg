export const withDir = (dir: string, fn: () => void) => {
  const old = process.cwd();
  process.chdir(dir);
  try {
    fn();
  } finally {
    process.chdir(old);
  }
};
