import { prettyError } from "./prettyError";

export const withPrettyError = (fn: (...args: any[]) => void) => (
  ...args: any[]
) => {
  try {
    fn(...args);
  } catch (err) {
    console.log(prettyError(err));
  }
};
