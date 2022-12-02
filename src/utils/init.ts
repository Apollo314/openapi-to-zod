const welcome = require("cli-welcome");
const pkg = require("../../package.json");
const unhandled = require("cli-handle-unhandled");

export default () => {
  unhandled();
  welcome({
    title: `openapi-to-zod`,
    tagLine: `by Apollo314`,
    description: pkg.description,
    version: pkg.version,
    bgColor: "#36BB09",
    color: "#000000",
    bold: true,
    clear: false,
  });
};
