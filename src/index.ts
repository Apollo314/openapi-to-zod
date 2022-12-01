#! /usr/bin/env node

import { OpenAPIV3 } from "openapi-types";
import { componentSchemasParser } from "./parser/parser";
import init from "./utils/init";
import cli from "./utils/cli";
import log from "./utils/log";
import path from "path";
// const init = require("./utils/init");
import * as fs from "node:fs/promises";
import { existsSync } from "fs";

// const fs = require("node:fs/promises");
const axios = require("axios");

(async () => {
  cli.input.includes(`help`) && cli.showHelp(0);
  cli.debug && log(cli.flags);

  // const file = await fs.open(cli.flags.output, "w");
  if (
    cli.flags.input.startsWith("http://") ||
    cli.flags.input.startsWith("https://")
  ) {
    const res = await axios.get(
      cli.flags.input,
      JSON.parse(cli.flags.axiosConfig || "{}")
    );
    if (res.status < 300) {
      const data: OpenAPIV3.Document = res.data;

      const zodFileContents = await componentSchemasParser(data || {});
      if (!existsSync(cli.flags.output)) {
        fs.mkdir(cli.flags.output, { recursive: true });
      }
      zodFileContents.forEach(async ([name, fileContent]) => {
        const file = await fs.open(path.join(cli.flags.output, name), "w");
        await file.write(fileContent);
        await file.close();
      });
    }
  }
})();
