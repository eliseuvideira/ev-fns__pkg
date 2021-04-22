import PrettyError from "pretty-error";

export const prettyError = <T extends Error>(err: T) =>
  new PrettyError()
    .appendStyle({
      "pretty-error": {
        marginLeft: 0,
      },
    })
    .skip(() => true)
    .render(err);
